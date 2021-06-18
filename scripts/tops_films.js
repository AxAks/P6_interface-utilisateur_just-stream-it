// CONSTANTS
const MAIN = "http://localhost:8000/api/v1/titles/"
const BEST_OF_ALL = "http://localhost:8000/api/v1/titles/?page=1&page_size=8&sort_by=-imdb_scores&sort_by=-votes"
const BEST_ACTION = "http://localhost:8000/api/v1/titles/?page=1&page_size=7&genre=action&sort_by=-imdb_score&sort_by=-votes"
const BEST_DRAMA = "http://localhost:8000/api/v1/titles/?page=1&page_size=7&genre=drama&sort_by=-imdb_score&sort_by=-votes"
const BEST_FAMILY = "http://localhost:8000/api/v1/titles/?page=1&page_size=7&genre=family&sort_by=-imdb_score&sort_by=-votes"

let top_all = [];
let top_action = [];
let top_family = [];
let top_drama = [];


async function fetchFilmsBasicInfos(page_url) {
    let response = await fetch(page_url);
    let data = await response.json();
    return data.results.map(x => {
        return { id: x.id, image_url: x.image_url };
    });
}


//Gestion du TOP FILM 
// exemple à suivre !! mais gestion affichage des infos differente..
async function handleTopFilm() {
    const films = await fetchFilmsBasicInfos(BEST_OF_ALL);
    let top_film_infos_section = document.querySelector(".top-film-basic-infos");
    let film_infos = await getInfos(films[0].id);
    top_film_infos_section.innerHTML += `<img src="${film_infos.image_url}">`
    for (const [key, value] of Object.entries(film_infos.required_infos)) {
        if (key == 'Title' || key == 'Description') {
            top_film_infos_section.innerHTML += `<p>${value}</p>`;
        };
    };

    top_film_infos_section.innerHTML += `<button onclick="showDetailedInfos(${films[0].id})"> Plus d'infos</button>`; // pas bien car je ne peux pas manipuler le bouton
};

// Gestion des Top Categories
//essayer de factoriser en handleTops(category) avec variable category et if all : shift() 

async function handleTopAll() {
    top_all = await fetchFilmsBasicInfos(BEST_OF_ALL);
    top_all.shift();
    handleCarrousel('best-films', '');
};

async function handleTopAction() {
    top_action = await fetchFilmsBasicInfos(BEST_ACTION);
    handleCarrousel('best-action', '');
};

async function handleTopFamily() {
    top_family = await fetchFilmsBasicInfos(BEST_FAMILY);
    handleCarrousel('best-family', '');
};

async function handleTopDrama() {
    top_drama = await fetchFilmsBasicInfos(BEST_DRAMA);
    handleCarrousel('best-drama', '');
};


//Récuperation des infos pour un film
// à améliorer
async function getInfos(film_id) {
    let response = await fetch(`http://localhost:8000/api/v1/titles/${film_id}`);
    let detailed_infos = await response.json();
    let image_url = detailed_infos.image_url
    let required_infos = {
        'Title': detailed_infos.original_title,
        'Directors': detailed_infos.directors,
        'Actors': detailed_infos.actors,
        'Genres': detailed_infos.genres,
        'Countries': detailed_infos.countries,
        'Release Date': detailed_infos.date_published,
        'Duration': detailed_infos.duration,
        'Rated': detailed_infos.rated,
        'Box Office': `$ ${detailed_infos.worldwide_gross_income}`,
        'Description': detailed_infos.description,
        'Long Description': detailed_infos.long_description
    };
    return { image_url, required_infos }

};

//Affichage des infos pour un film
async function showDetailedInfos(film_id) {
    film_infos = await getInfos(film_id);

    let modal = document.getElementById("my-modal");
    let content = document.getElementById("my-modal-content");
    content.innerHTML = '';

    modal.style.display = "block";

    content.innerHTML = `<img src="${film_infos.image_url}">`
    for (const [key, value] of Object.entries(film_infos.required_infos)) {
        if (key != 'Description') {
            content.innerHTML += `<p>${key}: ${value}</p>`;
        };
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
}


// Gestion du Carrousel
async function handleCarrousel(category, direction) {
    let films = [];
    let new_films = [];
    let carrousel;

    // placer le carrousel
    if (category == 'best-films') {
        films = top_all;
        carrousel = document.querySelector(".best-films .carrousel");
    } else if (category == 'best-action') {
        films = top_action;
        carrousel = document.querySelector(".best-action .carrousel");
    } else if (category == 'best-family') {
        films = top_family;
        carrousel = document.querySelector(".best-family .carrousel");
    } else if (category == 'best-drama') {
        films = top_drama;
        carrousel = document.querySelector(".best-drama .carrousel");
    };

    // parcourir le carrousel vers la gauche ou la droite
    if (direction == 'to-right') {
        new_films = films.slice(1);
        new_films.push(films[0]);
    } else if (direction == 'to-left') {
        new_films = films.slice(0, -1);
        new_films.unshift(films[6]);
    } else {
        new_films = films;
    };
    carrousel.innerHTML = '';
    new_films.forEach((film_infos, index) => {
        if (index < 4) {
            carrousel.innerHTML += `<img src="${film_infos.image_url}" onclick="showDetailedInfos(${film_infos.id})">`;
        };
    });

    if (category == 'best-films') {
        top_all = new_films;
    } else if (category == 'best-action') {
        top_action = new_films;
    } else if (category == 'best-family') {
        top_family = new_films;
    } else if (category == 'best-drama') {
        top_drama = new_films;
    };
};


// Chargement  au démarrage
document.addEventListener('DOMContentLoaded', async() => {
    handleTopFilm();
    handleTopAll();
    handleTopAction();
    handleTopFamily();
    handleTopDrama();
})