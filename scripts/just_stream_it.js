/* JS Fetch , simpler, native, compatible all browsers
* Getting data from OCMovies Titles and handling errors
*/

// Juste un test
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
};(
*/

/* “Meilleur film”
Cette zone affiche la photo du film qui a la meilleur note Imdb toutes catégories confondues,
ainsi que son titre, un bouton et le résumé du film sous le bouton.
Lorsqu’on clique sur le bouton du film en vedette ou sur l’image d’un des films une fenêtre modale s’ouvre.
Dans cette fenêtre les informations suivantes doivent être présente :

    L’image de la pochette du film
    Le Titre du film
    Le genre complet du film
    Sa date de sortie
    Son Rated
    Son score Imdb
    Son réalisateur
    La liste des acteurs
    Sa durée
    Le pays d’origine
    Le résultat au Box Office
    Le résumé du film
*/
async function fetchTopRatedTitle(url){

    let response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    console.log("Statut page 1: " + response.status + " " + response.statusText)
    var data = await response.json() //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
    var results = await data["results"]
    console.log(results)
    var bestMovie = await results[0]
    //"Poster: " + bestMovie.image_url.blob,
    alert("Title: " + bestMovie.title)
    alert("Genres: " + bestMovie.genres)
    alert("Release Date: " + bestMovie.year)
    alert("Rated: " + bestMovie.rated) // voir ce qu'est le rated !!
    alert("IMDB Score: " + bestMovie.imdb_score)
    alert("Director(s): " + bestMovie.directors) // for 
    alert("Actor(s): " + (actor in bestMovie.actors) // for
    //"Duration: " + bestMovie.
    //"Country: " + bestMovie.
    //"Box-Office: " + bestMovie.
    //"Summary: " + bestMovie.
    //
    );}

async function getImageFromURL(url) {
    let response = await fetch('https://m.media-amazon.com/images/M/MV5BM2EzM2M0Y2UtNjNiMC00YTdiLTg5NDctYmRkZDA5NTRiMjcwXkEyXkFqcGdeQXVyMTc2NzkyNzk@._V1_UX182_CR0,0,182,268_AL_.jpg')
    .then(response => response.json()
    .then(data => {
    console.log(data)
    var ele = document.createElement("span");
    var img = document.createElement("img");
        }));
    alert(data)
/*
Exemple pour récupérer une image via une url avec fetch:

fetch('https://api.github.com/emojis')
.then(response => response.json())
.then(data => {
 console.log(data) // Prints result from `response.json()` in getRequest
  Object.keys(data).forEach((key) => {
    var ele = document.createElement("span");
    var img = document.createElement("img");
    img.setAttribute("src", data[key]);
    ele.appendChild(img);
    //append ele to parent div
  });
})
.catch(error => console.error(error))
*/
/*
    .then(data => {
    })
}

    .catch(error => {
        // gestion des erreurs
    })
};
*/

/*
“Films les mieux notés” :
Cette zone affiche les 7 autres films les mieux notés toutes catégories confondues.
On pourra les faire défiler avec une flèche à gauche et à droite 
comme sur la maquette pour tous les parcourir.
*/
async function fetchTopRatedTitles(url){ // on doit pouvoir atteindre les pages suivantes 2 etc...
    let response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    console.log("Statut page 1: " + response.status + " " + response.statusText)
    var data = await response.json() //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(data)
    var results = await data["results"]
    console.log(results)
    var bestMovie = await results[0]
    alert(bestMovie)

}


/*
Nous te laissons choisir les catégories 1, 2 et 3.
 Elles doivent être différentes et être indiqué au dessus de la zone des films 
 à la place de “Catégorie 1”, 2 et 3 dans la maquette.
  “Catégorie 1” :
 Montre les 7 films les mieux notés d’une catégorie donnée. 
*/

/*
“Catégorie 2” :
 Montre les 7 films les mieux notés d’une autre catégorie.
*/

/*
“Catégorie 3” :
Idem sur une autre catégorie !
*/
}