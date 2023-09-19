import React from 'react';
import Plot from 'react-plotly.js';


const OrganCellChart = ({ apiCellOrgan, organName }) => {
  console.log(apiCellOrgan);
  console.log(organName);
    // Find the index of the organ, organ cases are different in species
    const organIndex = apiCellOrgan.organs.findIndex(organ => organ.toLowerCase() === organName.toLowerCase());

    // Filter the celltypes and detected values for non-zero values
    const nonZeroData = apiCellOrgan.celltypes.map((cellType, index) => ({
        name: cellType,
        value: apiCellOrgan.detected[index][organIndex]
    })).filter(item => item.value > 0);

    const data = [{
        type: 'bar',
        y: nonZeroData.map(item => item.name),
        x: nonZeroData.map(item => item.value),
        orientation: 'h',
        marker: {
            color: 'rgb(64, 145, 199)',
            opacity: 0.9,
            line: {
              color: 'rgb(204,204,204)',
              width: 1,
            },
        },
    }];

    let layout = {
        xaxis: {
          automargin: true,
          title: {
            text: 'Number of cells',
            font: {
              size: 16,
            },
            standoff: 20,
          },
          type: "log",
          range: [0, 4],
        },
        title: `<b>Cell Type Distribution in ${apiCellOrgan.organism} <span style='color:#0958d9;'>${organName}</span></b>`,
        yaxis: {
          automargin: true,
        }
      };

    return (
        <Plot 
            data={data}
            layout={layout}
        />
    );
};

export default OrganCellChart;