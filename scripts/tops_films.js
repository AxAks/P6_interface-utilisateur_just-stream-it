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

async function setPosterSelectors(endpoint_url) {
    if (endpoint_url == BEST_OF_ALL) {
        tag_base = 'BEST_OF_ALL_POSTER'
    }
    else if (endpoint_url == BEST_ACTION) {
        tag_base = 'BEST_ACTION_POSTER'
    }
    else if (endpoint_url == BEST_FAMILY) {
        tag_base = 'BEST_FAMILY_POSTER'
    }
    else if (endpoint_url == BEST_DRAMA) {
        tag_base = 'BEST_DRAMA_POSTER'
    };
 
    let urls = await fetchTopTenFilmsURLs(endpoint_url);
    let films_infos = await fetchFilmInfosforTopTen(urls);
    films_infos.forEach((film_infos, index) => {
        document.querySelector(`#${tag_base}_${index}`).src = film_infos.image_url;
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
    });
};


// Chargement  au démarrage, à simplifier ?
document.addEventListener('DOMContentLoaded', async () => {
    await setPosterSelectors(BEST_OF_ALL);
    await setPosterSelectors(BEST_ACTION);
    await setPosterSelectors(BEST_FAMILY);
    await setPosterSelectors(BEST_DRAMA);
});