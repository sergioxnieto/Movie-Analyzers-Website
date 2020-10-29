// Ajax Function
const getMovie = () => {
    // Grab the user's entry from search box
    const inputField = document.getElementById('search').value;

    axios.get('/movies', {
        params: {
            title: inputField
        }
    })
    .then((response) => {
        console.log(response);
        generateTable(response);
    }, (error) => {
        console.log(error);
    });
}

const loadDataset = () => {
    axios.get('/load', {})
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const addNewMovie = () => {
    const btn = document.getElementById('submitNewMovieForm');

    axios.post('/test', {
        title: btn.form.title.value,
        id: btn.form.id.value,
        runtime: btn.form.runtime.value,
        budget: btn.form.budget.value,
        original_language: btn.form.original_language.value,
        popularity: btn.form.popularity.value
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const generateTable = (movieResults) => {
    const responseField = document.getElementById('responseField');

    var table = document.createElement("table");
    table.className = "table table-hover table-dark";
    var tr = table.insertRow(-1);
    var headers = ["Search Results:", "Movie ID:"]; 

    // Add headers
    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = headers[i];
        tr.appendChild(th);
    }

    // Add object data
    for (var i = 0; i < movieResults.data.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < headers.length; j++) {
            var tableCell = tr.insertCell(-1);
            if (j === 0) {
                tableCell.innerHTML = movieResults.data[i].title;
            } else {
                tableCell.innerHTML = movieResults.data[i].id;
            }
        }
    }

    // Add it to a premade blank div
    var divContainer = responseField;
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

document.getElementById('submitNewMovieForm').addEventListener('click', addNewMovie, true);
document.getElementById('submitMovieQuery').addEventListener('click', getMovie, true);
document.getElementById('loadButton').addEventListener('click', loadDataset, true);