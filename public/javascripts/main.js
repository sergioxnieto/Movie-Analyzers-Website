// Ajax Function
const getMovie = () => {
    // Grab the user's entry from search box
    const inputField = document.getElementById('search').value;

    axios.get('/movies/search', {
        params: {
            title: inputField
        }
    })
    .then((response) => {
        console.log(response);
        renderResults(response);
    }, (error) => {
        console.log(error);
    });
}

const loadOriginalDataset = () => {
    axios.get('/movies/load-original-data', {})
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const loadModifiedDataset = () => {
    axios.get('/movies/load-modified-data', {})
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const saveDataset = () => {
    axios.get('/movies/backup-data', {})
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const addNewMovie = () => {
    const btn = document.getElementById('submitNewMovieForm');

    axios.post('/movies/add-movie', {
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

const deleteMovieEntry = () => {
    const btn = document.getElementById('removeMovieEntryBtn');

    axios.delete('/movies/remove-movie', {
        data: {
            movie_id: btn.form.movie_id.value
        }
        
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(response);
    });
}

const editMovieEntry = () => {
    const btn1 = document.getElementById('movieIdToEditSubmit');
    const btn2 = document.getElementById('submitEditMovieForm');

    axios.put('/movies/edit-movie', {
        id_to_edit: btn1.form.id.value,
        title: btn2.form.title.value,
        id: btn2.form.id.value,
        runtime: btn2.form.runtime.value,
        budget: btn2.form.budget.value,
        original_language: btn2.form.original_language.value,
        popularity: btn2.form.popularity.value
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(response);
    });
}

const renderResults = (movieResults) => {
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
document.getElementById('loadButton').addEventListener('click', loadOriginalDataset, true);
document.getElementById('loadModifiedButton').addEventListener('click', loadModifiedDataset, true);
document.getElementById('saveButton').addEventListener('click', saveDataset, true);
document.getElementById('removeMovieEntryBtn').addEventListener('click', deleteMovieEntry, true);
document.getElementById('submitEditMovieForm').addEventListener('click', editMovieEntry, true);
