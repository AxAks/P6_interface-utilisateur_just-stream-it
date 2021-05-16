/* JS Fetch , simpler, native, compatible all browsers
* Getting data from OCMovies Titles and handling errors
*/
function fetchAllTitles(url){
    response = fetch('http://localhost:8000/api/v1/titles')
    .then(response => {
        // gestion des données
    })
    .catch(error => {
        // gestion des erreurs
    })
    console.log(response.status);
    console.log(response.statusText);
};