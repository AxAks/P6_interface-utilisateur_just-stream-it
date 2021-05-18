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
    console.log(response.status)
    console.log(response.statusText)
    var data = await response.json() //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
    var results = await data["results"]
    console.log(results)
    var bestMovie = await results[0]
    console.log(bestMovie)
    /*
    console.log(getVal);
    */
}

/*
    .then(data => {
        var keys = Object.keys(data['imdb_score']);
        var firstKey = keys[0];
        var getVal = obj['imdb_score'][firstKey];
        console.log(getVal);
    },) 
}

/*
    .catch(error => {
        // gestion des erreurs
    })
};
*/
