/* JS Fetch , simpler, native, compatible all browsers
* Getting data from OCMovies Titles and handling errors
*/
async function fetchAllTitles(url){

    let response = await fetch('http://localhost:8000/api/v1/titles/')
    console.log(response.status)
    console.log(response.statusText)
    let data = await response.text()  //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
};
/*
    .then(response => {
        // gestion des données
    })
    .catch(error => {
        // gestion des erreurs
    })
};
*/
