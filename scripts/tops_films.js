// CONSTANTS
const MAIN = "http://localhost:8000/api/v1/titles/"
const BEST_OF_ALL = "http://localhost:8000/api/v1/titles/?page=1&page_size=8&sort_by=-imdb_scores&sort_by=-votes"
const BEST_ACTION = "http://localhost:8000/api/v1/titles/?page=1&page_size=7&genre=action&sort_by=-imdb_score&sort_by=-votes"
const BEST_DRAMA = "http://localhost:8000/api/v1/titles/?page=1&page_size=7&genre=drama&sort_by=-imdb_score&sort_by=-votes"
const BEST_FAMILY = "http://localhost:8000/api/v1/titles/?page=1&page_size=7&genre=family&sort_by=-imdb_score&sort_by=-votes"

let topAll;
let topAction;
let topFamily;
let topDrama;


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
    let top_film_infos_section = document.querySelector(".topfilmBasicInfos");
    let film_infos = await getInfos(films[0].id);
    top_film_infos_section.innerHTML = `<img src="${film_infos.image_url}">`
    for (const [key, value] of Object.entries(film_infos.required_infos)) {
        if (key == 'Title' || key == 'Description') {
            top_film_infos_section.innerHTML += `<p>${key}: ${value}</p>`;
        };
    };

    top_film_infos_section.innerHTML += `<button onclick="showDetailedInfos(${films[0].id})"> Plus d'infos</button>`; // pas bien car je ne peux pas manipuler le bouton
};

// Gestion des Top Categories
//essayer de factoriser en handleTops(category) avec variable category et if all : shift() 

async function handleTopAll() {
    topAll = await fetchFilmsBasicInfos(BEST_OF_ALL);
    topAll.shift();
    handleCarrousel('bestfilms', '');
};

async function handleTopAction() {
    topAction = await fetchFilmsBasicInfos(BEST_ACTION);
    handleCarrousel('bestaction', '');
};

async function handleTopFamily() {
    topFamily = await fetchFilmsBasicInfos(BEST_FAMILY);
    handleCarrousel('bestfamily', '');
};

async function handleTopDrama() {
    topDrama = await fetchFilmsBasicInfos(BEST_DRAMA);
    handleCarrousel('bestdrama', '');
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
// à améliorer + bouton close foireux
async function showDetailedInfos(film_id) {
    film_infos = await getInfos(film_id);

    let modal = document.getElementById("myModal"); // Get the modal
    let span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
    let content = document.getElementById("myModalContent");
    content.innerHTML = '';

    modal.style.display = "block"; // When the user clicks on the button, open the modal

    content.innerHTML = `<img src="${film_infos.image_url}">`
    for (const [key, value] of Object.entries(film_infos.required_infos)) {
        if (key != 'Description') {
            content.innerHTML += `<p>${key}: ${value}</p>`;
        };
    };
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
}



// Gestion du Carrousel, à refactoriser
async function handleCarrousel(category, up_or_down) {
    let films;
    let new_films;
    let carrousel;

    //mettre dans une fonction à part
    if (category == 'bestfilms') {
        films = topAll;
        carrousel = document.querySelector(".bestfilms > .carrousel");
    } else if (category == 'bestaction') {
        films = topAction;
        carrousel = document.querySelector(".bestaction > .carrousel");
    } else if (category == 'bestfamily') {
        films = topFamily;
        carrousel = document.querySelector(".bestfamily > .carrousel");
    } else if (category == 'bestdrama') {
        films = topDrama;
        carrousel = document.querySelector(".bestdrama > .carrousel");
    };

    //mettre dans une fonction à part 
    if (up_or_down == 'up') {
        new_films = films.slice(1);
        new_films.push(films[0]);
    } else if (up_or_down == 'down') {
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

    if (category == 'bestfilms') {
        topAll = new_films;
    } else if (category == 'bestaction') {
        topAction = new_films;
    } else if (category == 'bestfamily') {
        topFamily = new_films;
    } else if (category == 'bestdrama') {
        topDrama = new_films;
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