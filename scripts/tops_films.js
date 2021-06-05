// CONSTANTS
const MAIN = "http://localhost:8000/api/v1/titles/"
const BEST_OF_ALL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes"
const BEST_ACTION = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&sort_by=-votes"
const BEST_DRAMA = "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&sort_by=-votes"
const BEST_FAMILY = "http://localhost:8000/api/v1/titles/?genre=family&sort_by=-imdb_score&sort_by=-votes"


// recuperation des urls des films les mieux notés sur 2 pages (10 films)
async function fetchTopTenFilmsURLs(page_url){
    let all_urls = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
        let response =  await fetch(page_url);
        console.log(`getting page ${page_nb} for ${page_url}`, response.statusText);
        let data =  await response.json();
        data.results.forEach(film => all_urls.push(film.url));
        page_url =  await data.next;
        page_nb++;
    };
    return all_urls;
};

// recuperation des infos des films en bouclant dans la liste des URL du top10
async function fetchFilmInfosforTopTen(films_urls){
    let top_ten_film_infos = [];
    for (film_url of films_urls) {
            response = await fetch(film_url);
            film_infos = await response.json();
            top_ten_film_infos.push(film_infos);
    };
    return top_ten_film_infos;
};


/*
//recupérer l'image pour les films d'un TOP 10  ( pas utile !!)
async function getFilmImageforTopTen(page_url) {
    let TopTenFilmInfos = await fetchFilmInfosforTopTen(page_url);

    TopTenPosterURLs = []
    for (FilmInfos of TopTenFilmInfos) {
        
        let response = await fetch(FilmInfos.image_url);
        console.log(FilmInfos)
        let FilmPosterBlob = await response.blob()
        console.log(FilmPosterBlob)
        urlCreator = window.URL || window.webkitURL
        FilmPosterUrl = urlCreator.createObjectURL(FilmPosterBlob)
        console.log(FilmPosterUrl)
        TopTenPosterURLs.push(FilmPosterUrl)
    };
    return TopTenPosterURLs
};
*/


document.addEventListener('DOMContentLoaded', async () => {
    let top_of_all_urls = await fetchTopTenFilmsURLs(BEST_OF_ALL);
    let films_infos = await fetchFilmInfosforTopTen(top_of_all_urls);
    films_infos.forEach((FilmInfos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${FilmInfos.original_title}`, response.statusText);
        console.log(FilmInfos);
        document.querySelector(`#BEST_OF_ALL_${index}`).src = FilmInfos.image_url;
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_action_urls = await fetchTopTenFilmsURLs(BEST_ACTION);
    let films_infos =  await fetchFilmInfosforTopTen(top_action_urls);
    films_infos.forEach((FilmInfos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${FilmInfos.original_title}`, response.statusText);
        console.log(FilmInfos);
        document.querySelector(`#BEST_ACTION${index}`).src = FilmInfos.image_url;
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_family_urls = await fetchTopTenFilmsURLs(BEST_FAMILY);
    let films_infos = await fetchFilmInfosforTopTen(top_family_urls);
    films_infos.forEach((FilmInfos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${FilmInfos.original_title}`, response.statusText);
        console.log(FilmInfos);
        document.querySelector(`#BEST_FAMILY${index}`).src = FilmInfos.image_url
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_drama_urls = await fetchTopTenFilmsURLs(BEST_DRAMA);
    let films_infos = await fetchFilmInfosforTopTen(top_drama_urls);
    films_infos.forEach((FilmInfos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${FilmInfos.original_title}`, response.statusText);
        console.log(FilmInfos);
        document.querySelector(`#BEST_DRAMA${index}`).src = FilmInfos.image_url
    });
});













/*
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
*/