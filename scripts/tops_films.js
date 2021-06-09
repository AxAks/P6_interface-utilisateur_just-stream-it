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




/* exemple querySelector + createElement
showCharacters = characters => {
    const charactersDiv = document.querySelector(‘#rick-and-morty-characters’);
    characters.forEach(character => {
        const characterElement = document.createElement(‘p’);
        characterElement.innerText = `Character Name: ${character.name}`;
        charactersDiv.append(characterElement);
    });}

=> premiere ebauche d'utilisation / tests avec Top action en premier
showFilms = films => {
    const filmsDiv = document.querySelector(‘#films’);
    films.forEach(film_infos => {
        const filmElement = document.createElement(‘p’);
        filmElement.innerText = `Film Title: ${film.original_title}`;
        filmsDiv.append(filmElement);
    });}
*/


// Chargement  au démarrage, à simplifier ?
document.addEventListener('DOMContentLoaded', async () => {
    let top_of_all_urls = await fetchTopTenFilmsURLs(BEST_OF_ALL);
    let films_infos = await fetchFilmInfosforTopTen(top_of_all_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_OF_ALL_${index}_POSTER`).src = film_infos.image_url;
        document.querySelector(`#BEST_OF_ALL_${index}_TITLE`).innerHTML = film_infos.original_title;
        //document.createElement  (pour refacto)
        document.querySelector(`#BEST_OF_ALL_${index}_DESCR`).innerHTML = film_infos.description;
        document.querySelector(`#BEST_OF_ALL_${index}_GENRES`).innerHTML = film_infos.genres;
        document.querySelector(`#BEST_OF_ALL_${index}_DURATION`).innerHTML = film_infos.duration;
        document.querySelector(`#BEST_OF_ALL_${index}_RELEASEDATE`).innerHTML = film_infos.date_published;
        document.querySelector(`#BEST_OF_ALL_${index}_RATED`).innerHTML = film_infos.rated;
        document.querySelector(`#BEST_OF_ALL_${index}_IMDBSCORE`).innerHTML = film_infos.imdb_score;
        document.querySelector(`#BEST_OF_ALL_${index}_DIRECTORS`).innerHTML = film_infos.directors;
        document.querySelector(`#BEST_OF_ALL_${index}_ACTORS`).innerHTML = film_infos.actors;
        document.querySelector(`#BEST_OF_ALL_${index}_COUNTRIES`).innerHTML = film_infos.countries;
        document.querySelector(`#BEST_OF_ALL_${index}_BOXOFFICE`).innerHTML = film_infos.worldwide_gross_income;
        document.querySelector(`#BEST_OF_ALL_${index}_LONGDESCR`).innerHTML = film_infos.long_description;
    });
});

/*
showTopActionFilms = TopActionfilms => {
    const TopActionFilmsDiv = document.querySelector("#TopActionfilms");
    films_infos.forEach(film_infos => {
        const filmInfos = document.createElement("p");
            filmInfos.innerText = `Film Title: ${films_infos.original_title}`;
            filmInfos.innerText = `Film Description: ${films_infos.description}`;
            filmInfos.innerText = `Film Genres: ${films_infos.genres}`;
            filmInfos.innerText = `Film Duration: ${films_infos.duration}`;
            filmInfos.innerText = `Film Release Date: ${films_infos.date_published}`;
            filmInfos.innerText = `Film Rated: ${films_infos.rated}`;
            filmInfos.innerText = `Film Score on IMDB: ${films_infos.imdb_score}`;
            filmInfos.innerText = `Film Director(s): ${films_infos.directors}`;
            filmInfos.innerText = `Film Actors: ${films_infos.actors}`;
            filmInfos.innerText = `Film Countries: ${films_infos.countries}`;
            filmInfos.innerText = `Film Box-Office: ${films_infos.worldwide_gross_income}`;
            filmInfos.innerText = `Film Description (long): ${films_infos.long_description}`;
        
        const filmPoster = document.createElement("img");
            filmPoster.src = films_infos.image_url;

        TopActionFilmsDiv.append(filmInfos);
        TopActionFilmsDiv.push({
            filmInfos: filmInfos,
            poster: filmPoster.src
         });

    const TopActionFilmsDiv = document.querySelector(`TopActionfilms`);
    films_infos.forEach(film_infos => {
        const filmInfos = document.createElement("p");
            filmInfos.innerText = `Film Title: ${films_infos.original_title}\n`
            /*
            Film Description: ${films_infos.description}\n
            Film Genres: ${films_infos.genres}\n
            Film Duration: ${films_infos.duration}\n
            Film Release Date: ${films_infos.date_published}\n
            Film Rated: ${films_infos.rated}\n
            Film Score on IMDB: ${films_infos.imdb_score}\n
            Film Director(s): ${films_infos.directors}\n
            Film Actors: ${films_infos.actors}\n
            Film Countries: ${films_infos.countries}\n
            Film Box-Office: ${films_infos.worldwide_gross_income}\n
            Film Description (long): ${films_infos.long_description}`;
            
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            filmInfos.innerText = ``;
            //const filmPoster = document.createElement("img");
        //    filmPoster.src = films_infos.image_url;

        TopActionFilmsDiv.append(filmInfos);
        
        //TopActionFilmsDiv.push({
        //    filmInfos: filmInfos,
        //    poster: filmPoster.src
        //});
*/


document.addEventListener('DOMContentLoaded', async () => {
    let top_action_urls = await fetchTopTenFilmsURLs(BEST_ACTION);
    let films_infos =  await fetchFilmInfosforTopTen(top_action_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_ACTION_${index}_POSTER`).src = film_infos.image_url;
        document.querySelector(`#BEST_ACTION_${index}_TITLE`).innerHTML = film_infos.original_title;
        document.querySelector(`#BEST_ACTION_${index}_DESCR`).innerHTML = film_infos.description;
        document.querySelector(`#BEST_ACTION_${index}_GENRES`).innerHTML = film_infos.genres;
        document.querySelector(`#BEST_ACTION_${index}_DURATION`).innerHTML = film_infos.duration;
        document.querySelector(`#BEST_ACTION_${index}_RELEASEDATE`).innerHTML = film_infos.date_published;
        document.querySelector(`#BEST_ACTION_${index}_RATED`).innerHTML = film_infos.rated;
        document.querySelector(`#BEST_ACTION_${index}_IMDBSCORE`).innerHTML = film_infos.imdb_score;
        document.querySelector(`#BEST_ACTION_${index}_DIRECTORS`).innerHTML = film_infos.directors;
        document.querySelector(`#BEST_ACTION_${index}_ACTORS`).innerHTML = film_infos.actors;
        document.querySelector(`#BEST_ACTION_${index}_COUNTRIES`).innerHTML = film_infos.countries;
        document.querySelector(`#BEST_ACTION_${index}_BOXOFFICE`).innerHTML = film_infos.worldwide_gross_income;
        document.querySelector(`#BEST_ACTION_${index}_LONGDESCR`).innerHTML = film_infos.long_description;
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_family_urls = await fetchTopTenFilmsURLs(BEST_FAMILY);
    let films_infos = await fetchFilmInfosforTopTen(top_family_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_FAMILY_${index}_POSTER`).src = film_infos.image_url;
        document.querySelector(`#BEST_FAMILY_${index}_TITLE`).innerHTML = film_infos.original_title;
        document.querySelector(`#BEST_FAMILY_${index}_DESCR`).innerHTML = film_infos.description;
        document.querySelector(`#BEST_FAMILY_${index}_GENRES`).innerHTML = film_infos.genres;
        document.querySelector(`#BEST_FAMILY_${index}_DURATION`).innerHTML = film_infos.duration;
        document.querySelector(`#BEST_FAMILY_${index}_RELEASEDATE`).innerHTML = film_infos.date_published;
        document.querySelector(`#BEST_FAMILY_${index}_RATED`).innerHTML = film_infos.rated;
        document.querySelector(`#BEST_FAMILY_${index}_IMDBSCORE`).innerHTML = film_infos.imdb_score;
        document.querySelector(`#BEST_FAMILY_${index}_DIRECTORS`).innerHTML = film_infos.directors;
        document.querySelector(`#BEST_FAMILY_${index}_ACTORS`).innerHTML = film_infos.actors;
        document.querySelector(`#BEST_FAMILY_${index}_COUNTRIES`).innerHTML = film_infos.countries;
        document.querySelector(`#BEST_FAMILY_${index}_BOXOFFICE`).innerHTML = film_infos.worldwide_gross_income;
        document.querySelector(`#BEST_FAMILY_${index}_LONGDESCR`).innerHTML = film_infos.long_description;
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    let top_drama_urls = await fetchTopTenFilmsURLs(BEST_DRAMA);
    let films_infos = await fetchFilmInfosforTopTen(top_drama_urls);
    films_infos.forEach((film_infos, index) => {
        console.log("index =", index);
        console.log(`getting Infos for Film ${film_infos.original_title}`, response.statusText);
        console.log(film_infos);
        document.querySelector(`#BEST_DRAMA_${index}_POSTER`).src = film_infos.image_url;
        document.querySelector(`#BEST_DRAMA_${index}_TITLE`).innerHTML = film_infos.original_title;
        document.querySelector(`#BEST_DRAMA_${index}_DESCR`).innerHTML = film_infos.description;
        document.querySelector(`#BEST_DRAMA_${index}_GENRES`).innerHTML = film_infos.genres;
        document.querySelector(`#BEST_DRAMA_${index}_DURATION`).innerHTML = film_infos.duration;
        document.querySelector(`#BEST_DRAMA_${index}_RELEASEDATE`).innerHTML = film_infos.date_published;
        document.querySelector(`#BEST_DRAMA_${index}_RATED`).innerHTML = film_infos.rated;
        document.querySelector(`#BEST_DRAMA_${index}_IMDBSCORE`).innerHTML = film_infos.imdb_score;
        document.querySelector(`#BEST_DRAMA_${index}_DIRECTORS`).innerHTML = film_infos.directors;
        document.querySelector(`#BEST_DRAMA_${index}_ACTORS`).innerHTML = film_infos.actors;
        document.querySelector(`#BEST_DRAMA_${index}_COUNTRIES`).innerHTML = film_infos.countries;
        document.querySelector(`#BEST_DRAMA_${index}_BOXOFFICE`).innerHTML = film_infos.worldwide_gross_income;
        document.querySelector(`#BEST_DRAMA_${index}_LONGDESCR`).innerHTML = film_infos.long_description;
    });
});
