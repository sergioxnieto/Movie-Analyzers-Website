// Information to reach website
const movieAnalyzeUrl = 'localhost:3000/';
const query = 'movie?';

// Select the page elements that will submit the form
const inputField = document.getElementById('search').value;
const submit = document.getElementById('submitMovieQuery');
const responseField = document.getElementById('responseField');

// Ajax Function
const getMovie = () => {
    axios.get('/movies', {
        params: {
            title: inputField
        }
    })
    .then((response) => {
        console.log(response);
        responseField.innerHTML = response.data;
    }, (error) => {
        console.log(error);
    });

    // const movieQuery = inputField.value;
    // const endPoint = `${movieAnalyzeUrl}${query}${movieQuery}`;

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === XMLHttpRequest.DONE) {
    //         responseField.innerHTML = xhr.response;
    //     }
    // };

    // xhr.open('GET', '/movie');
    // xhr.send();
}

document.getElementById('submitMovieQuery').addEventListener('click', getMovie, true);

// // Code associated with dropdown menu
// $(document).ready(function(e){
//     $('.search-panel .dropdown-menu').find('a').click(function(e) {
//           e.preventDefault();
//           var param = $(this).attr("href").replace("#","");
//           var concept = $(this).text();
//           $('.search-panel span#search_concept').text(concept);
//           $('.input-group #search_param').val(param);
//          });
//     });
// var a = document.getElementByTagName('a').item(0);
// $(a).on('keyup', function(evt){
// console.log(evt);
// if(evt.keycode === 13){

// alert('search?');
// } 
// }); 