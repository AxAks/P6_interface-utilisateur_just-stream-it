// CONSTANTS
const MAIN = "http://localhost:8000/api/v1/titles/"
const BEST_OF_ALL = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&sort_by=-imdb_scores&sort_by=-votes"
const BEST_ACTION = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&genre=action&sort_by=-imdb_score&sort_by=-votes"
const BEST_DRAMA = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&genre=drama&sort_by=-imdb_score&sort_by=-votes"
const BEST_FAMILY = "http://localhost:8000/api/v1/titles/?page=1&page_size=10&genre=family&sort_by=-imdb_score&sort_by=-votes"

let topAllFilms;
let topActionFilms;
let topFamilyFilms;
let topDramaFilms;

// à garder !!
async function fetchFilmsBasicInfos(page_url) {
    let response =  await fetch(page_url);
    let data =  await response.json();
    return data.results.map(x => { 
        return {id: x.id, image_url: x.image_url};
    });
}

// exemple à suivre !! mais gestion affichage des infos differente..
async function handleTopFilm(){
    const films = await fetchFilmsBasicInfos(BEST_OF_ALL);
    const topfilm = document.querySelector(".topfilm");
    topfilm.innerHTML = `<img src="${films[0].image_url}">`;

    let top_film_infos_section = document.querySelector(".topfilmBasicInfos");
    let  required_infos = await getInfos(films[0].id);
    for (const [key, value] of Object.entries(required_infos)) {   // comment on fait avec un for each + dict(object)?
        top_film_infos_section.innerHTML += `<p>${key}: ${value}</p>`;
    };
};

/*
// à finir !!!
async function showTopFilmInfos(film_id) {
    top_film_infos_section = document.querySelector(".topfilmBasicInfos");
    required_infos = await getInfos(film_id);
    top_film_infos_section.innerHTML = required_infos;
}
*/

async function handleTopAll(){
    topAllFilms = await fetchFilmsBasicInfos(BEST_OF_ALL);
    topAllFilms.shift();
    topAllFilms.splice(7, 3);
    handleCarrousel('bestfilms', '');
};

async function handleTopAction(){
    topActionFilms = await fetchFilmsBasicInfos(BEST_ACTION);
    topActionFilms.splice(7, 3)
    handleCarrousel('bestaction', '');
};

async function handleTopFamily(){
    topFamilyFilms = await fetchFilmsBasicInfos(BEST_FAMILY);
    topFamilyFilms.splice(7, 3)
    handleCarrousel('bestfamily', '');
};

async function handleTopDrama() {
    topDramaFilms = await fetchFilmsBasicInfos(BEST_DRAMA);
    topDramaFilms.splice(7, 3)
    handleCarrousel('bestdrama', '');
};




// à améliorer
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

// à améliorer
async function getInfos(film_id){
    let response = await fetch(`http://localhost:8000/api/v1/titles/${film_id}`);
    let detailed_infos =  await response.json();
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
        'Long Description': detailed_infos.long_description
    };
    return required_infos;

}


async function handleCarrousel (category, up_or_down) {
    let films;
    let new_films;
    let carrousel;

    //mettre dans une fonction à part
    if(category == 'bestfilms') {
        films = topAllFilms;
        carrousel = document.querySelector(".bestfilms > .carrousel");
    }
    else if(category == 'bestaction') {
        films = topActionFilms;
        carrousel = document.querySelector(".bestaction > .carrousel");
    }
    else if(category == 'bestfamily') {
        films = topFamilyFilms;
        carrousel = document.querySelector(".bestfamily > .carrousel");
    }
    else if(category == 'bestdrama') {
        films = topDramaFilms;
        carrousel = document.querySelector(".bestdrama > .carrousel");
    };

    //mettre dans une fonction à part 
    if(up_or_down == 'up'){
        new_films = films.slice(1);
        new_films.push(films[0]);
    }
    else if(up_or_down == 'down') {
        new_films = films.slice(0, -1);
        new_films.unshift(films[6]);
    }
    else {
        new_films = films;
    };
    carrousel.innerHTML = '';
    new_films.forEach((film_infos, index) => {
        if (index < 4){
           carrousel.innerHTML+=`<img src="${film_infos.image_url}" onclick="showDetailedInfos(${film_infos.id})">`;
        };
    });

    if(category == 'bestfilms') {
        topAllFilms = new_films;
    }
    else if(category == 'bestaction') {
        topActionFilms = new_films;
    }
    else if(category == 'bestfamily') {
        topFamilyFilms = new_films;
    }
    else if(category == 'bestdrama') {
        topDramaFilms = new_films;
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
