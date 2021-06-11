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
    topfilm.innerHTML = `<img src="${films[0].image_url}" onclick="showFilmInfos(${films[0].id})">`;
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
        carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showFilmInfos(${film_infos.id})">`;
    });
}


async function showFilmInfos() {
    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    };
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
};





/// à ecrire !! 
async function showFilmInfosBlabla(film_id)  {
    alert(film_id);
};

// Chargement  au démarrage, à simplifier ?
document.addEventListener('DOMContentLoaded', async () => {
    handleTopFilm();
    handleTopAll();
    handleTopAction();
    handleTopFamily();
    handleTopDrama();
    showFilmInfos();
})

/*
juste un memo des infos nécessaires à recupérer et afficher sur les fiches films
à supprimer ensuite!
<img id="BEST_OF_ALL_0_POSTER">
<p id="BEST_OF_ALL_0_TITLE"></p>
<p id="BEST_OF_ALL_0_DESCR"></p>
<p id="BEST_OF_ALL_0_GENRES"></p>
<p id="BEST_OF_ALL_0_DURATION"></p>
<p id="BEST_OF_ALL_0_RELEASEDATE"></p>
<p id="BEST_OF_ALL_0_RATED"></p>
<p id="BEST_OF_ALL_0_IMDBSCORE"></p>
<p id="BEST_OF_ALL_0_DIRECTORS"></p>
<p id="BEST_OF_ALL_0_ACTORS"></p>
<p id="BEST_OF_ALL_0_COUNTRIES"></p>
<p id="BEST_OF_ALL_0_BOXOFFICE"></p>
<p id="BEST_OF_ALL_0_LONGDESCR"></p>
*/