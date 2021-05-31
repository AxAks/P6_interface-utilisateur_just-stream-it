// CONSTANTS
const MAIN = "http://localhost:8000/api/v1/titles/"
const BEST_OF_ALL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes"
const BEST_ACTION = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&sort_by=-votes"
const BEST_DRAMA = "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&sort_by=-votes"
const BEST_FAMILY = "http://localhost:8000/api/v1/titles/?genre=family&sort_by=-imdb_score&sort_by=-votes"


// recuperation des urls des films les mieux notés sur 2 pages (10 films)
async function fetchTopTenFilmsURLs(page_url){
    let allURLs = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
        let response = await fetch(page_url);
        console.log("Statut page 1: " + response.status + " " + response.statusText);
        page_nb++;
        let data = await response.json();
        data.results.forEach(film => allURLs.push(film.url));
        page_url = await data.next;
    };
    return allURLs;
};

// recuperation des infos des films en bouclant dans la liste des URL du top10
async function fetchFilmInfosforTopTen(page_url){
    let TopTenFilmURLs = await fetchTopTenFilmsURLs(page_url);
    let TopTenFilmAllInfos = [];
    for (FilmURL of TopTenFilmURLs) {
        response = await fetch(FilmURL);
        FilmAllInfos = await response.json();
        TopTenFilmAllInfos.push(FilmAllInfos);
    };
    console.log(TopTenFilmAllInfos);
    index = 0
    for (TopTenFilm of TopTenFilmAllInfos) {
    document.querySelector(`p${index}`).innerHTML =  
    `"Title: ${await TopTenFilmAllInfos[index].original_title}"<br>
        - Description: ${await TopTenFilmAllInfos[index].description}<br>
        - Genres: ${await TopTenFilmAllInfos[index].genres}<br>
        - Duration: ${await TopTenFilmAllInfos[index].duration} Minutes<br>
        - Date published: ${await TopTenFilmAllInfos[index].date_published}<br>`;
        await sleep(400);
        index++
    }
    return TopTenFilmAllInfos
};

/*
1/  la photo du film
    titre original 
    (un bouton) 
    le résumé du film

1bis/
    la photo du film
    titre original 
    le résumé du film


2/  L’image de la pochette du film
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

//recupérer l'image pour les films d'un TOP 10 
async function getFilmImageforTopTen(page_url) {
    let TopTenFilmInfos = await fetchFilmInfosforTopTen(page_url);
        if (page_url === BEST_OF_ALL)
        page_url_str = "BEST_OF_ALL";
    else if (page_url === BEST_ACTION)
        page_url_str = "BEST_ACTION";
    else if (page_url === BEST_DRAMA)
        page_url_str = "BEST_DRAMA";
    else if (page_url === BEST_FAMILY)
        page_url_str = "BEST_FAMILY";

    index = 0; 
    TopTenPosterURLs = []
    for (FilmInfos of TopTenFilmInfos) {
        let response = await fetch(FilmInfos.image_url);
        let FilmPosterBlob = await response.blob()
        urlCreator = window.URL || window.webkitURL;
        FilmPosterUrl = await urlCreator.createObjectURL(FilmPosterBlob);
        console.log("FilmPosterUrls: ", FilmPosterUrl);
        document.querySelector(`#${page_url_str}_${index}`).src = FilmPosterUrl
        TopTenPosterURLs.push(FilmPosterUrl)
        await sleep(400);
        index++
    };
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
 

















// recuperation des infos d'un film via son index dans la list top10
async function fetchFilmInfosbyIndex(page_url, index){
    let TopTenFilmURLs = await fetchTopTenFilmsURLs(page_url);
    let TopFilmUrl = await TopTenFilmURLs[index];
    let response = await fetch(TopFilmUrl);
    let filmInfos = await response.json();
     /* console.log(
        filmInfos.id, filmInfos.title, filmInfos.original_title, filmInfos.image_url, filmInfos.genres, filmInfos.date_published,
        filmInfos.rated, filmInfos.imdb_score, filmInfos.directors, filmInfos.actors, filmInfos.duration,
        filmInfos.countries, filmInfos.worldwide_gross_income, filmInfos.description, filmInfos.long_description
        )*/
    return filmInfos
};


// affiche l'image pour un film via l'index
async function displayFilmImage(page_url, index) { // id = $constpage_url + $index
    let filmInfos = await fetchFilmInfosbyIndex(page_url, index)

        if (page_url == BEST_OF_ALL)
        page_url_str = "BEST_OF_ALL"
    else if (page_url == BEST_ACTION)
        page_url_str = "BEST_ACTION"
    else if (page_url == BEST_DRAMA)
        page_url_str = "BEST_DRAMA"
    else if (page_url == BEST_FAMILY)
        page_url_str = "BEST_FAMILY"

    let filmPosterURL = await filmInfos.image_url;
    let response = await fetch(filmPosterURL);
    let FilmPosterBlob = await response.blob();
    let urlCreator = window.URL || window.webkitURL;
    let FilmPosterUrl = urlCreator.createObjectURL(FilmPosterBlob);
    document.querySelector(`#${page_url_str}_${index}`).src = FilmPosterUrl;
    
};



// recuperation des infos de 10 meilleurs films
async function fetchTopTenFilmInfos(page_url){
    let topTenFilmsURLs = await fetchTopTenFilmsURLs(page_url);
    topSevenFilmsInfos = [];
    i = 0;
    while(topSevenFilmsInfos.length < 10) {
        response = await fetch (topTenFilmsURLs[i]);
        filmInfos = await response.json();
        topSevenFilmsInfos.push(filmInfos);
        i++;
    };
    for (filmInfos of topSevenFilmsInfos) {  //toutes les infos à recupérer !!   
        console.log(filmInfos.id, filmInfos.title, filmInfos.original_title, filmInfos.image_url, filmInfos.genres, filmInfos.date_published,
        filmInfos.rated, filmInfos.imdb_score, filmInfos.directors, filmInfos.actors, filmInfos.duration,
        filmInfos.countries, filmInfos.worldwide_gross_income, filmInfos.description, filmInfos.long_description
        )
    };
    return topTenFilmsInfos
};
