// Information to reach website
const movieAnalyzeUrl = 'localhost:3000/';
const query;

// Select the page elements that will submit the form
const inputField;
const submit;
const responseField;

// Ajax Function
const getMovie = () => {
    const movieQuery;
    const endPoint = `${movieAnalyzeUrl}${query}${movieQuery}`;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // renderFunction
        }
    };

    xhr.open('GET', endPoint);
    xhr.send();
}

$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
          e.preventDefault();
          var param = $(this).attr("href").replace("#","");
          var concept = $(this).text();
          $('.search-panel span#search_concept').text(concept);
          $('.input-group #search_param').val(param);
         });
    });
var a = document.getElementByTagName('a').item(0);
$(a).on('keyup', function(evt){
console.log(evt);
if(evt.keycode === 13){

alert('search?');
} 
}); 