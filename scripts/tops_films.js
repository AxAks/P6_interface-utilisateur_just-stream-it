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




document.addEventListener('DOMContentLoaded', async () => {
    let top_of_all_urls = await fetchTopTenFilmsURLs(BEST_OF_ALL);
    let films_infos = await fetchFilmInfosforTopTen(top_of_all_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_OF_ALL_${index}`).src = film_infos.image_url; // is tjrs OK !!
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_action_urls = await fetchTopTenFilmsURLs(BEST_ACTION);
    let films_infos =  await fetchFilmInfosforTopTen(top_action_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_ACTION_${index}`).src = film_infos.image_url; // is null !!
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_family_urls = await fetchTopTenFilmsURLs(BEST_FAMILY);
    let films_infos = await fetchFilmInfosforTopTen(top_family_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_FAMILY_${index}`).src = film_infos.image_url // is null !!
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_drama_urls = await fetchTopTenFilmsURLs(BEST_DRAMA);
    let films_infos = await fetchFilmInfosforTopTen(top_drama_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_DRAMA_${index}`).src = film_infos.image_url // is null !!
    });
});
