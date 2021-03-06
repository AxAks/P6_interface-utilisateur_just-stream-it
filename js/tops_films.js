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


//TOP FILM 
async function handleTopFilm() {
    const films = await fetchFilmsBasicInfos(BEST_OF_ALL);
    let film_infos = await getInfos(films[0].id);

    let top_film_poster = document.querySelector(".top-film-poster");
    let top_film_infos_section = document.querySelector(".top-film-basic-infos");
    let more_infos_button = document.querySelector(".more-infos-button");

    top_film_poster.innerHTML = `<img src="${film_infos.image_url}">`;
    more_infos_button.innerHTML = `<p onclick="showDetailedInfos(${films[0].id})">More Infos</p>`;
    for (const [key, value] of Object.entries(film_infos.required_infos)) {
        if (key == 'Title' || key == 'Description') {
            top_film_infos_section.innerHTML += `<p><em>*</em> ${value} <em>*</em></p>`;
        };
    };
};

//Tops Categories
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


// Get infos for one film
async function getInfos(film_id) {
    let response = await fetch(`http://localhost:8000/api/v1/titles/${film_id}`);
    let detailed_infos = await response.json();
    let image_url = detailed_infos.image_url
    let required_infos = {
        'Title': detailed_infos.original_title,
        'Genres': detailed_infos.genres,
        'Release Date': detailed_infos.date_published,
        'Rated': detailed_infos.rated,
        'IMDB Score': detailed_infos.imdb_score,
        'Directors': detailed_infos.directors,
        'Actors': detailed_infos.actors,
        'Duration': detailed_infos.duration,
        'Countries': detailed_infos.countries,
        'Box Office': `$ ${detailed_infos.worldwide_gross_income}`,
        'Description': detailed_infos.description,
        'Long Description': detailed_infos.long_description
    };
    return { image_url, required_infos }

};

// Display detailled infos for one film in a modal
async function showDetailedInfos(film_id) {
    film_infos = await getInfos(film_id);

    let modal = document.getElementById("my-modal");
    let content = document.getElementById("my-modal-content");
    content.innerHTML = '';

    modal.style.display = "block";

    content.innerHTML = `<img src="${film_infos.image_url}">`
    for (const [key, value] of Object.entries(film_infos.required_infos)) {
        if (key != 'Description') {
            if (key == 'Duration') {
                content.innerHTML += `<p><em>${key}</em>: ${value} min</p>`;
            } else {
                content.innerHTML += `<p><em>${key}</em>: ${value}</p>`;
            };
        };
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
}


// Carrousel
async function handleCarrousel(category, direction) {
    let films = [];
    let new_films = [];
    let carrousel = null;

    // Display carrousel
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

    // Browse carrousel left or right
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

// Launch functions when DOM is ready
document.addEventListener('DOMContentLoaded', async() => {
    handleTopFilm();
    handleTopAll();
    handleTopAction();
    handleTopFamily();
    handleTopDrama();
})