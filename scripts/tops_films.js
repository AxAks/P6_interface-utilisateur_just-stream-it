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
        return {id: x.id, title: x.original_title, image_url: x.image_url};
    });
}

// exemple à suivre !!handleTopFilm
async function handleTopFilm(){
    const films = await fetchFilmsBasicInfos(BEST_OF_ALL);
    const topfilm = document.querySelector(".topfilm");
    topfilm.innerHTML = `<img src="${films[0].image_url}" onclick="showTopFilmInfos(${films[0].id})">`;
};

async function handleTopAll(){
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
        carrousel.innerHTML +=`<img src="${film_infos.image_url}" onclick="showFilmInfos(${film_infos.id})">`;
    });
}

// à améliorier !!!!!!
async function showTopFilmInfos(film_id) {
    let response = await fetch(`http://localhost:8000/api/v1/titles/${film_id}`);
    let detailed_infos =  await response.json();
    const  required_infos = {
        Title: detailed_infos.original_title,
        Directors: detailed_infos.directors,
        Actors: detailed_infos.actors,
        Genres: detailed_infos.genres,
        Countries: detailed_infos.countries,
        ReleaseDate: detailed_infos.date_published,
        Duration: detailed_infos.duration,
        Rated: detailed_infos.rated,
        BoxOffice: detailed_infos.worldwide_gross_income,
        LongDescription: detailed_infos.long_description
    }
    
    let modal = document.getElementById("myModal");         // Get the modal
    let btn = document.getElementById("details");           // Get the button that opens the modal
    let span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
    let content = document.getElementById("myModalContent");
    
    btn.onclick = function() {
        modal.style.display = "block";
        };                                                      // When the user clicks on the button, open the modal
        for (const [key, value] of Object.entries(required_infos)) {   // comment on fait avec un for each + dict(object)?
            content.innerHTML += `<p>${key}: ${value}</p>`;
        }
        span.onclick = function() {
        modal.style.display = "none";
        };
        for (const [key, value] of Object.entries(required_infos)) {   // comment on fait avec un for each + dict(object)?
            content.innerHTML -= `<p>${key}: ${value}</p>`;
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            };
            for (const [key, value] of Object.entries(required_infos)) {   // comment on fait avec un for each + dict(object)?
                content.innerHTML -= `<p>${key}: ${value}</p>`;
            }                                               // When the user clicks anywhere outside of the modal, close it
        };

    };

// Chargement  au démarrage, à simplifier ?
document.addEventListener('DOMContentLoaded', async () => {
    handleTopFilm();
    handleTopAll();
    handleTopAction();
    handleTopFamily();
    handleTopDrama();
})
