/* JS Fetch , simpler, native, compatible all browsers
* Getting data from OCMovies Titles and handling errors
*/

// CONSTANTS
const MAIN_ENDPOINT = 'http://localhost:8000/api/v1/titles/'
const GENRES_ENDPOINT = 'http://localhost:8000/api/v1/genres/'

// Juste un 1er test pour voir 
async function fetchFirstPage(url){
    // ca ne liste que les 5 resultats de la page 1 !!
    let response = await fetch(MAIN_ENDPOINT);
    console.table(response.status, response.statusText);
    let data = await response.json(); // text(), json(), blob(), formData() and arrayBuffer() selon le type de data
    console.table(data);
};

/*
async function fetchMetaData() {
  let allData = [];
  let morePagesAvailable = true;
  let currentPage = 0;

  while(morePagesAvailable) {
    currentPage++;
    const response = await fetch(`http://api.dhsprogram.com/rest/dhs/data?page=${currentPage}`)
    let { data, total_pages } = await response.json();
    data.forEach(e => allData.unshift(e));
    morePagesAvailable = currentPage < total_pages;
  }

  return allData;
}
*/

// Essai recupération de plusieurs pages 
async function fetchAllPagesSortedTitles(url){
    let allData = [];
    let morePagesAvailable = true;
    let currentPage = 1;

    while(morePagesAvailable) {
        currentPage++;
        const response = await fetch('http://localhost:8000/api/v1/titles/?page=${currentPage}&sort_by=-imdb_score')
        let { data, total_pages } = await response.json();
        // data.forEach(e => allData.unshift(e)); // data is not undefined...?
        morePagesAvailable = currentPage < total_pages;
      }
      console.log(allData)
      return allData;
    } 

/*
    // pour le traitement des infos et la gestion des erreurs  
    .then(data => {
        // gestion des données
    })
    .catch(error => {
        // gestion des erreurs
    })
};(
*/

// recupéré le infos détaillées d'un film via son ID (ici, je recupère que l'ID pour tester)
async function fetchOneFilmbyID(url){
    let response = await fetch('http://localhost:8000/api/v1/titles/11207902')
    console.table("Statut page 1: " + response.status + " " + response.statusText);
    let film_infos = await response.json(); //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.log(film_infos.id, film_infos.title, film_infos.image_url, film_infos.genres, film_infos.date_published) //toutes les infos à recupérer !!
    console.log(film_infos.rated, film_infos.imdb_score, film_infos.directors) //toutes les infos à recupérer !!
    console.log(film_infos.actors, film_infos.duration, film_infos.countries) //toutes les infos à recupérer !!
    console.log(film_infos.worldwide_gross_income, film_infos.description); //toutes les infos à recupérer !!
    return film_infos.id
}

// on doit pouvoir atteindre les pages suivantes 2 etc...
async function fetchTopRatedTitles(url){
    let response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    console.table("Statut page 1: " + response.status + " " + response.statusText)
    let data = await response.json() //json(), blob(), formData() and arrayBuffer() selon le type de data
    console.table(data)
    let results = await data["results"]
    console.table(results)
    let bestMovie = await results[0]
    console.table(bestMovie.actors)
}

// tentative ratée de recupérer une image
async function getImageFromURL(url) {
    let response = await fetch('https://m.media-amazon.com/images/M/MV5BM2EzM2M0Y2UtNjNiMC00YTdiLTg5NDctYmRkZDA5NTRiMjcwXkEyXkFqcGdeQXVyMTc2NzkyNzk@._V1_UX182_CR0,0,182,268_AL_.jpg')
    .then(response => response.json()
    .then(data => {
    console.table(data)
    let ele = document.createElement("span");
    let img = document.createElement("img");
        }));
    alert(data)
/*
Exemple pour récupérer une image via une url avec fetch:

fetch('https://api.github.com/emojis')
.then(response => response.json())
.then(data => {
 console.table(data) // Prints result from `response.json()` in getRequest
  Object.keys(data).forEach((key) => {
    let ele = document.createElement("span");
    let img = document.createElement("img");
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



/*
“Films les mieux notés” :
Cette zone affiche les 7 autres films les mieux notés toutes catégories confondues.
On pourra les faire défiler avec une flèche à gauche et à droite 
comme sur la maquette pour tous les parcourir.
*/

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