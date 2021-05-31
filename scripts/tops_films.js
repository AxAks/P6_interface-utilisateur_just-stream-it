// recuperation des urls des films les mieux notés sur 2 pages (10 films)
async function fetchTopTenFilmsURLs(page_url){
    let allURLs = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
        let response = await fetch(page_url);
        console.log("Statut page 1: " + response.status + " " + response.statusText);
        page_nb++;
        let data = await response.json();
        data.results.forEach(film => allURLs.push(film.url));
        page_url = await data.next;
    };
    return allURLs;
};

// recuperation des infos de 10 meilleurs films
async function fetchTopTenFilmInfos(page_url){
    let topTenFilmsURLs = await fetchTopTenFilmsURLs(page_url);
    topSevenFilmsInfos = [];
    i = 0;
    while(topSevenFilmsInfos.length < 10) {
        response = await fetch (topTenFilmsURLs[i]);
        filmInfos = await response.json();
        topSevenFilmsInfos.push(filmInfos);
        i++;
    };
    for (filmInfos of topSevenFilmsInfos) {  //toutes les infos à recupérer !!   
        console.log(filmInfos.id, filmInfos.title, filmInfos.original_title, filmInfos.image_url, filmInfos.genres, filmInfos.date_published,
        filmInfos.rated, filmInfos.imdb_score, filmInfos.directors, filmInfos.actors, filmInfos.duration,
        filmInfos.countries, filmInfos.worldwide_gross_income, filmInfos.description, filmInfos.long_description
        )
    };
    return topTenFilmsInfos
};

// recuperation des infos du meilleur film
async function fetchFilmInfosbyIndex(page_url, index){
    let TopTenFilmURLs = await fetchTopTenFilmsURLs(page_url);
    let TopFilmUrl = await TopTenFilmURLs[index];
    let response = await fetch(TopFilmUrl);
    let filmInfos = await response.json();
    console.log(
        filmInfos.id, filmInfos.title, filmInfos.original_title, filmInfos.image_url, filmInfos.genres, filmInfos.date_published,
        filmInfos.rated, filmInfos.imdb_score, filmInfos.directors, filmInfos.actors, filmInfos.duration,
        filmInfos.countries, filmInfos.worldwide_gross_income, filmInfos.description, filmInfos.long_description
        )
    return filmInfos
};

// affiche l'image pour un film, à faire en boucle pour les Top7
async function displayFilmImage(page_url, index) {
    let filmInfos = await fetchFilmInfosbyIndex(page_url, index)
    let filmPosterURL = await filmInfos.image_url;
    let response = await fetch(filmPosterURL);
    let FilmPosterBlob = await response.blob();
    let urlCreator = window.URL || window.webkitURL;
    let FilmPosterUrl = urlCreator.createObjectURL(FilmPosterBlob);
    document.querySelector(`#FilmPoster_${index}`).src = FilmPosterUrl; // sortir l'id !
    // return filmPosterUrl //vraiment besoin d'une valeur de retour ?
};

async function displayFilmImagesForTopTen(page_url) {
    let topTenInfosList = await fetchTopTenFilmInfos(page_url);
    console.log("HelloYall", topSevenInfosList);
    let topTenPosterURLList = [];
    let FilmPosterURL = filmInfos.image_url;
    for (FilmPosterURL of topTenInfosList) {
        topTenPosterURLList.push(FilmPosterURL);
        console.log("HelloYall2", FilmPosterURL, topTenPosterURLList);
    };
    console.log("HelloYall3", topTenPosterURLList);
}