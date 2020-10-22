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