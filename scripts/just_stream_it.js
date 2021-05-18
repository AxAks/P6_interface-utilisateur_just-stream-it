/* JS Fetch , simpler, native, compatible all browsers
* Getting data from OCMovies Titles and handling errors
*/
async function fetchAllTitles(url){

    let response = await fetch('http://localhost:8000/api/v1/titles/')
    console.log(response.status)
    console.log(response.statusText)
    let data = await response.json()  // text(), json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
};
/*
    .then(data => {
        // gestion des données
    })
    .catch(error => {
        // gestion des erreurs
    })
};
*/

async function fetchTopRatedTitle(url){

    let response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    console.log("Statut page 1: " + response.status + " " + response.statusText)
    var data = await response.json() //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
    var results = await data["results"]
    console.log(results)
    var bestMovie = await results[0]
    console.log(bestMovie)
}

/*
    .then(data => {
    })
}

    .catch(error => {
        // gestion des erreurs
    })
};
*/

async function fetchTopRatedTitles(url){
    let response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    console.log("Statut page 1: " + response.status + " " + response.statusText)
    var data = await response.json() //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
    var results = await data["results"]
    console.log(results)
    var bestMovie = await results[0,1,2,3,4]
    console.log(bestMovie)
}