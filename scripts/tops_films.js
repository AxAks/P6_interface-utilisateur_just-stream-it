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

// exemple à suivre !!
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
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showDetailedInfos(${film_infos.id})">`;

    });
}

async function handleTopAction(){
    const films = await fetchFilmsBasicInfos(BEST_ACTION);
    films.splice(7, 3)
    const carrousel = document.querySelector(".bestaction > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showDetailedInfos(${film_infos.id})">`;
    });
}

async function handleTopFamily(){
    const films = await fetchFilmsBasicInfos(BEST_FAMILY);
    films.splice(7, 3)
    const carrousel = document.querySelector(".bestfamily > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showDetailedInfos(${film_infos.id})">`;
    });
}

async function handleTopDrama() {
    const films = await fetchFilmsBasicInfos(BEST_DRAMA);
    films.splice(7, 3)
    const carrousel = document.querySelector(".bestdrama > .carrousel");
    films.forEach((film_infos) => {
        carrousel.innerHTML +=`<img src="${film_infos.image_url}" onclick="showDetailedInfos(${film_infos.id})">`;
    });
}


async function showTopFilmInfos(film_id) {
    required_infos = await getInfos(film_id);
    
}

async function showDetailedInfos(film_id) {
    required_infos = await getInfos(film_id);

    let modal = document.getElementById("myModal");         // Get the modal
    let span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
    let content = document.getElementById("myModalContent");
    content.innerHTML = '';
    
    modal.style.display = "block";                                                 // When the user clicks on the button, open the modal
        
    for (const [key, value] of Object.entries(required_infos)) {   // comment on fait avec un for each + dict(object)?
        content.innerHTML += `<p>${key}: ${value}</p>`;
    };
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };                                             // When the user clicks anywhere outside of the modal, close it
    };
}

async function getInfos(film_id){
    let response = await fetch(`http://localhost:8000/api/v1/titles/${film_id}`);
    let detailed_infos =  await response.json();
    let required_infos = {
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
    };
    return required_infos;

}
    
// Chargement  au démarrage, à simplifier ?
document.addEventListener('DOMContentLoaded', async () => {
    handleTopFilm();
    handleTopAll();
    handleTopAction();
    handleTopFamily();
    handleTopDrama();
})
