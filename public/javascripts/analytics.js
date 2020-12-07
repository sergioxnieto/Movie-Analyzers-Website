const makeGraph = () => {
    const btn1 = document.getElementById('submitAnalytic');

    axios.put('/movies/make-graph', {
        xvalue: btn1.form.analyticsField1.value,
        yvalue: btn1.form.analyticsField2.value
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}


function budget1() {
    document.getElementById("analyticField1").value = "budget";
}
function vote_average1() {
    document.getElementById("analyticField1").value = "vote_average";
}
function popularity1() {
    document.getElementById("analyticField1").value = "popularity";
}
function runtime1() {
    document.getElementById("analyticField1").value = "runtime";
}
function revenue1() {
    document.getElementById("analyticField1").value = "revenue";
}
function production_companies1() {
    document.getElementById("analyticField1").value = "production_companies";
}
function genre1() {
    document.getElementById("analyticField1").value = "genres";
}
function budget2() {
    document.getElementById("analyticField2").value = "budget";
}
function vote_average2() {
    document.getElementById("analyticField2").value = "vote_average";
}
function popularity2() {
    document.getElementById("analyticField2").value = "popularity";
}
function runtime2() {
    document.getElementById("analyticField2").value = "runtime";
}
function revenue2() {
    document.getElementById("analyticField2").value = "revenue";
}
function reload() {
     document.getElementById('frame').src = document.getElementById('frame').src;
}


document.getElementById('submitAnalytic').addEventListener('click', makeGraph, true);