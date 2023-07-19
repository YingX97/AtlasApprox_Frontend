import atlasapprox, { organisms } from "atlasapprox";
import { filterGenes } from "./chatSideEffects";

export const updatePlotState = async (response, plotState, setPlotState) => {
console.log(response);
let intent = response.intent;
let generalIntent = intent.split(".")[0];
let newPlotState = null;
let average, fractions;
let organism = (response.params && response.params.organism) || (plotState && plotState.organism) || "";
let organ = (response.params && response.params.organ) || (plotState && plotState.organ) || "";
//  for some intent, params has features instead of feature
let features = response.params.features || response.params.feature;
let apiCelltypes = await atlasapprox.celltypes(organism, organ);
let celltypes = apiCelltypes.celltypes;

const addGenes = (() => {
    // update parameter for average/fraction plots
    console.log(plotState);
    console.log(features);
    features = plotState.features + "," + features.split(',');
    organism = plotState.organism;
    organ = plotState.organ;
    celltypes = plotState.celltypes;
    // check if add command is applied to average or fraction
    if(!plotState.data.fractions) {
        averageIntent();
    } else {
        fractionsIntent();
    }
});

const removeGenes = (() => {
	// console.log(typeof(features));
	features = plotState.features.split(',').filter(g => !features.includes(g)).join(',');
    organism = plotState.organism;
    organ = plotState.organ;
    celltypes = plotState.celltypes;
    // check if add command is applied to average or fraction
    if(!plotState.data.fractions) {
        averageIntent();
    } else {
        fractionsIntent();
    }
});

const markersIntent = async () => {
    features = response.data.markers.join(",");
    fractionsIntent();
};

const averageIntent = async () => {
    let checkFeatures = features.split(',')
    filterGenes(checkFeatures, organism, organ);
    let apiCelltypes = await atlasapprox.celltypes(organism, organ);
    let celltypes = apiCelltypes.celltypes;
    let apiResponse = await atlasapprox.average(organism, features, organ, celltypes, "gene_expression");
    console.log(apiResponse);
    average = apiResponse.average;
    
    let plotType = "heatmap";
    newPlotState = {
      intent:"average",
      plotType,
      organism,
      organ,
      features,
      data: {
        type: "matrix",
        xaxis: celltypes,
        yaxis: features.split(","),
        average: average,
        fractions: null,
        valueUnit: "counts per ten thousand",
      },
    };
    console.log(newPlotState);
    setPlotState(newPlotState);
};

const fractionsIntent = async () => {
  let apiFraction = await atlasapprox.fraction_detected(organism, features, organ, celltypes, "gene_expression")
  let apiAverage = await atlasapprox.average(organism, features, organ, celltypes, "gene_expression");
  fractions = apiFraction.fraction_detected;
  average = apiAverage.average;
  let plotType = "bubbleHeatmap";

  newPlotState = {
    intent,
    plotType,
    organism,
    organ,
    features,
    data: {
      type: "matrix",
      xaxis: celltypes,
      yaxis: features.split(','),
      average: average,
      fractions: fractions,
      valueUnit: "counts per million",
    },
  };
  setPlotState(newPlotState);
};

const similarCelltypes = async () => {
  let celltype = response.params.celltype;
  let nCelltypes = response.params.number;
  const apiSimilarCelltypes = await atlasapprox.similar_celltypes(organism, organ, celltype, features, nCelltypes, "correlation");
  let similarCelltypes = apiSimilarCelltypes.similar_celltypes;
  let similarOrgans = apiSimilarCelltypes.similar_organs;
  const celltypesOrgan = similarCelltypes.map((c, index) => {
    return c + " (" + similarOrgans[index] + ")";
  });

  let plotType = "barChart";
  newPlotState = {
    intent,
    plotType,
    organism,
    organ,
    celltype,
    features,
    data: {
      type: "matrix",
      celltypesOrgan: celltypesOrgan,
      yaxis: apiSimilarCelltypes.distances,
      average: apiSimilarCelltypes.distances,
      fractions: null,
      valueUnit: "counts per ten thousand",
    },
  };
  setPlotState(newPlotState);
}
const measureIntent = async () => {
    const highestResponse = await atlasapprox.highest_measurement(organism, features, 10);
    const plotType = "barChart";
    let organs = highestResponse.organs;
    let celltypes = highestResponse.celltypes;
    console.log(celltypes);
    const celltypesOrgan = celltypes.map((c, index) => {
      return c + " (" + organs[index] + ")";
    });
    newPlotState = {
      intent,
      plotType,
      organism,
      organs,
      celltypes,
      features,
      data: {
        type: "matrix",
        celltypesOrgan: celltypesOrgan,
        yaxis: highestResponse.average,
        average: highestResponse.average,
        fractions: null,
        valueUnit: "counts per ten thousand",
      },
    };
    console.log(newPlotState);
    setPlotState(newPlotState);
};

const similarGenes = async () => {
  // generate a heatmap by default
  let similarFeatures = response.data.similar_features
  similarFeatures.unshift(features);
  features = similarFeatures.join(",");

  fractionsIntent();

}

const cellxorganIntent = async () => {
    const plotType = "table";
    let apiOrgans = await atlasapprox.organs(organism, "gene_expression");
    let organs = apiOrgans.organs;
    let apiCellxOrgans = await atlasapprox.celltypexorgan(organism, organs, "gene_expression");
    let detected = apiCellxOrgans.detected;
    let celltypes = apiCellxOrgans.celltypes;
    newPlotState = {
        plotType,
        organism,
        organs,
        celltypes,
        detected,
    }
    setPlotState(newPlotState);
};

const organismsIntent = async () => {
  const plotType = "showOrganisms";
  newPlotState = {
      plotType,
  }
  setPlotState(newPlotState);
};

console.log(generalIntent);
switch (generalIntent) {
    case "add": 
        addGenes();
        break;
	case "remove":
		removeGenes();
		break;
    case "markers":
        markersIntent();
        break;
    case "average":
        averageIntent();
        break;
    case "fraction_detected":
        fractionsIntent();
        break;
    case "highest_measurement":
        measureIntent();
        break;
    case "similar_features":
        similarGenes();
        break;
    case "celltypexorgan":
        cellxorganIntent();
        break;
    case "similar_celltypes":
        similarCelltypes();
        break;
    case "organisms":
        organismsIntent();
    default:
		console.log("default case")
      	break;
	}
};

