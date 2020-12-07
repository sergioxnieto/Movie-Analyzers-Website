// Ajax Function
const getMovie = () => {
    // Grab the user's entry from search box
    const inputField = document.getElementById('search').value;
    const fieldToSearch = document.getElementById('category_search').value;


    axios.get('/movies/search', {
        params: {
            title: inputField,
            category: fieldToSearch
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
        popularity: btn.form.popularity.value,
		vote_average: btn.form.vote_average.value,
		production_companies: btn.form.production_companies.value,
		genres: btn.form.genres.value
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const deleteMovieEntry = (id) => {
    axios.delete('/movies/remove-movie', {
        data: {
            movie_id: id
        }
        
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const editMovieEntry = () => {
    const btn2 = document.getElementById('submitEditMovieForm');

    axios.put('/movies/edit-movie', {
        title: btn2.form.title.value,
        id: btn2.form.id.value,
        runtime: btn2.form.runtime.value,
        budget: btn2.form.budget.value,
        popularity: btn2.form.popularity.value,
		vote_average: btn2.form.vote_average.value,
		production_companies: btn2.form.production_companies.value,
		genres: btn2.form.genres.value
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

const renderResults = (movieResults) => {
    const pencilGlyph = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg>`;
    const deleteGlyph = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
  </svg>`;

    const responseField = document.getElementById('responseField');

    var table = document.createElement("table");
    table.id = "resultsTable";
    table.className = "table table-hover table-dark";
    var tr = table.insertRow(-1);
    var headers = ["Title:", "Movie ID:", "Edit", "Delete"]; 

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
            } else if (j === 1) {
                tableCell.innerHTML = movieResults.data[i].id;
            } else if (j === 2) {
                tableCell.innerHTML = `<button type="button" class="btn btn-info" onclick="editRow(this)">${pencilGlyph}</button>`
            } else {
                tableCell.innerHTML = `<button type="button" class="btn btn-danger" onclick="removeRow(this)">${deleteGlyph}</button>`
            }
        }
    }

    // Add it to a premade blank div
    var divContainer = responseField;
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function editRow(oButton) {
    var movie_Id = oButton.parentNode.previousSibling.innerHTML;
    var movie_Title = oButton.parentNode.previousSibling.previousSibling.innerHTML;
    $('#editDataModalCenter').modal('show');
    
    $('#editDataModalCenter').on('shown.bs.modal', () => {
        $('#editMovieTitle').val(movie_Title);
        $('#editMovieId').val(movie_Id);
    });
}

// Temporary suggestion to remove a row entry
// Ideal popup a confirmation window, then send result to server and get rid of row, plus deletion completion message
function removeRow(oButton) {
    var myTable = document.getElementById('resultsTable');
    var movieID = oButton.parentNode.previousSibling.previousSibling.innerHTML;
    deleteMovieEntry(movieID);
    myTable.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr
}


document.getElementById('submitNewMovieForm').addEventListener('click', addNewMovie, true);
document.getElementById('submitMovieQuery').addEventListener('click', getMovie, true);
document.getElementById('loadButton').addEventListener('click', loadOriginalDataset, true);
document.getElementById('loadModifiedButton').addEventListener('click', loadModifiedDataset, true);
document.getElementById('saveButton').addEventListener('click', saveDataset, true);
document.getElementById('submitEditMovieForm').addEventListener('click', editMovieEntry, true);
