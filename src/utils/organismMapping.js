const organismMapping = {
  "a_queenslandica": {
    biologicalName: "Amphimedon queenslandica",
    commonName: "Sponge",
    dataSource: "[Sebé-Pedrós et al 2018](https://www.nature.com/articles/s41559-018-0575-6)",
    about: "",
    genesFromPaper: "",
  },
  "c_elegans": {
    biologicalName: "Caenorhabditis elegans",
    commonName: "Nematode",
    dataSource: "[Cao et al. 2017](https://www.science.org/doi/10.1126/science.aam8940)",
    about: "",
    genesFromPaper: "",
  },
  "d_melanogaster": {
    biologicalName: "Drosophila melanogaster",
    commonName: "Fruit fly",
    dataSource: "Data source not available",
    about: "",
    genesFromPaper: "",
  },
  "d_rerio": {
    biologicalName: "Danio rerio",
    commonName: "Zebrafish",
    dataSource: "[Wagner et al. 2018](https://www.science.org/doi/10.1126/science.aar4362)",
    about: "Embryonic development is a transformative process where pluripotent cells evolve into varied, specialized entities. Employing single-cell RNA sequencing, eminent research teams, including Wagner, Farrell, and Briggs, have made groundbreaking contributions. Specifically, Wagner's team sequenced the transcriptomes of over 90,000 cells throughout zebrafish development, shedding profound light on cell differentiation. In parallel, Farrell's group elucidated a trajectory towards 25 unique zebrafish cell types, emphasizing the nuances of gene expression evolution. Briggs' study meticulously mapped cellular dynamics in frog embryos. Collectively, this research sets a robust framework for delving deeper into transcriptional landscapes in developmental biology.",
    genesFromPaper: "epcam, si, krt18, krt8, cldnb, elavl3, krt4, tfap2a, LOC100537766, cldnh, six1b, LOC100006216, myt1a, dlb, sox19a, actc1a, pfn1, cxcl12b, pax6b ",
  },
  "h_miamia": {
    biologicalName: "Hofstenia miamia",
    commonName: "Three-banded panther Worm",
    dataSource: "Data source not available",
    about: "",
    genesFromPaper: "",
  },
  "h_sapiens": {
    biologicalName: "Homo sapiens",
    commonName: "Human",
    dataSource: "RNA: [Tabula Sapiens](https://www.science.org/doi/10.1126/science.abl4896), ATAC: [Zhang et al. 2021](https://doi.org/10.1016/j.cell.2021.10.024)",
    about: "",
    genesFromPaper: "",
  },
  "m_leidyi": {
    biologicalName: "Mnemiopsis leidyi",
    commonName: "Comb jelly",
    dataSource: "[Sebé-Pedrós et al 2018](https://www.nature.com/articles/s41559-018-0575-6)",
    about: "",
    genesFromPaper: "",
  },
  "m_musculus": {
    biologicalName: "Mus musculus",
    commonName: "House mouse",
    dataSource: "[Tabula Muris Senis](https://www.nature.com/articles/s41586-020-2496-1)",
    about: "",
    genesFromPaper: "",
  },
  "m_myoxinus": {
    biologicalName: "Microcebus myoxinus",
    commonName: "Mouse lemur",
    dataSource: "[Tabula Microcebus](https://www.biorxiv.org/content/10.1101/2021.12.12.469460v2)",
    about: "",
    genesFromPaper: "",
  },
  "s_lacustris": {
    biologicalName: "Spongilla lacustris",
    commonName: "Freshwater sponge",
    dataSource: "[Musser et al. 2021](https://www.science.org/doi/10.1126/science.abj2949)",
    about: "",
    genesFromPaper: "",
  },
  "s_mansoni": {
    biologicalName: "Schistosoma mansoni",
    commonName: "Blood fluke",
    dataSource: "Data source not available",
    about: "",
    genesFromPaper: "",
  },
  "s_mediterranea": {
    biologicalName: "Schmidtea mediterranea",
    commonName: "Planarian worm",
    dataSource: "[Plass et al 2018](https://www.science.org/doi/10.1126/science.aaq1723#sec-10)",
    about: "",
    genesFromPaper: "",
  },
  "t_adhaerens": {
    biologicalName: "Trichoplax adhaerens",
    commonName: "Placozoan",
    dataSource: "[Sebé-Pedrós et al 2018](https://www.nature.com/articles/s41559-018-0575-6)",
    about: "",
    genesFromPaper: "",
  },
  "x_laevis": {
    biologicalName: "Xenopus laevis",
    commonName: "African clawed frog",
    dataSource: "[Liao et al 2022](https://www.nature.com/articles/s41467-022-31949-2#ref-CR14)",
    about: "",
    genesFromPaper: "",
    organs: {
      "Heart": {
          coords: "574,244,567,253,572,269,558,290,555,316,561,343,572,346,581,349,587,347,594,345,598,341,603,335,607,330,612,317,614,306,614,293,610,283,605,273,616,263,605,255,586,273",
          cellTypes: [
              "mast", "macrophage", "erythrocyte", "B", "T", "glia", "melanocyte", 
              "capillary", "fibroblast", "chondrocyte", "cardiomyocyte", 
              "smooth muscle", "stromal", "delta"
          ],
      },
      "Lung": {
          coords: "1378,639,1330,657,1309,676,1301,705,1283,758,1256,785,1230,859,1203,906,1198,957,1211,1012,1254,1002,1296,978,1352,933,1386,883,1402,808,1410,747,1402,676",
          cellTypes: [],  // Add cell types for Lung or leave as an empty array if unknown
      }
    }
  }
};

export default organismMapping;
