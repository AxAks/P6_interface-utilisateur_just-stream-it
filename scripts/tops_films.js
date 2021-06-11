// CONSTANTS
const MAIN = "http://localhost:8000/api/v1/titles/"
const BEST_OF_ALL = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&sort_by=-imdb_scores&sort_by=-votes"
const BEST_ACTION = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&genre=action&sort_by=-imdb_score&sort_by=-votes"
const BEST_DRAMA = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&genre=drama&sort_by=-imdb_score&sort_by=-votes"
const BEST_FAMILY = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&genre=family&sort_by=-imdb_score&sort_by=-votes"


// à garder !!
async function fetchFilmsBasicInfos(page_url) {
    let response =  await fetch(page_url);
    let data =  await response.json();
    return data.results.map(x => { 
        return {id: x.id, image_url: x.image_url};
    });
}

// exemple à suivre !!handleTopFilm
async function handleTopFilm(){
    const films = await fetchFilmsBasicInfos(BEST_OF_ALL);
    const topfilm = document.querySelector(".topfilm");
    topfilm.innerHTML = `<img src="${films[0].image_url}" onclick="showFilmInfos(${films[0].id})">`;
};

async function handleTopFilms(){
    const films = await fetchFilmsBasicInfos(BEST_OF_ALL);
    films.shift();
    films.splice(7, 3);
    const carrousel = document.querySelector(".bestfilms > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showFilmInfos(${film_infos.id})">`;
    });
}

async function handleTopAction(){
    const films = await fetchFilmsBasicInfos(BEST_ACTION);
    films.splice(7, 3)
    const carrousel = document.querySelector(".bestaction > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showFilmInfos(${film_infos.id})">`;
    });
}

async function handleTopFamily(){
    const films = await fetchFilmsBasicInfos(BEST_FAMILY);
    films.splice(7, 3)
    const carrousel = document.querySelector(".bestfamily > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showFilmInfos(${film_infos.id})">`;
    });
}

async function handleTopDrama() {
    const films = await fetchFilmsBasicInfos(BEST_DRAMA);
    films.splice(7, 3)
    const carrousel = document.querySelector(".bestdrama > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showFilmInfos(${film_infos.id})">`;
    });
}

/// à ecrire !! 
async function showFilmInfos(film_id)  {
    alert(film_id);
};

// Chargement  au démarrage, à simplifier ?
document.addEventListener('DOMContentLoaded', async () => {
    handleTopFilm();
    handleTopFilms();
    handleTopAction();
    handleTopFamily();
    handleTopDrama();
})

