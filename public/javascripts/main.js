// Ajax Function
const getMovie = () => {
    const inputField = document.getElementById('search').value;
    const submit = document.getElementById('submitMovieQuery');
    const responseField = document.getElementById('responseField');

    axios.get('/movies', {
        params: {
            title: inputField
        }
    })
    .then((response) => {
        console.log(response);

        // Can probably make this it's own function outside of this call
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

        // Add json data
        for (var i = 0; i < response.data.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < headers.length; j++) {
                var tableCell = tr.insertCell(-1);
                if (j === 0) {
                    tableCell.innerHTML = response.data[i].title;
                } else {
                    tableCell.innerHTML = response.data[i].id;
                }
            }
        }

        // Add it to a div
        var divContainer = document.getElementById('responseField');
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

    }, (error) => {
        console.log(error);
    });
}

document.getElementById('submitMovieQuery').addEventListener('click', getMovie, true);