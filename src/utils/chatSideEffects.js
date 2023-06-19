// decide if an NLP response triggers a plot update
const triggersPlot = ((response) => {
    console.log("inside trigger check function");
    console.log("response: ")
    console.log(response);

    if (!response)
        return false;
    if (!response.complete)
        return false;

    const plottableIntents = ["average", "fraction_detected"];
    const generalIntent = response.intent.split(".")[0];
    console.log("general intent:");
    console.log(generalIntent);
    return plottableIntents.includes(generalIntent);
});

export default triggersPlot
