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

// recuperation des urls des 7 meilleurs films
async function fetchTopSevenFilmsURLs(page_url){
    let pagesFilmsURLs = await fetchTopTenFilmsURLs(page_url); 
    let firstSevenFilmsURLs = [];
    i = 0;
    while (firstSevenFilmsURLs.length < 7) {
        firstSevenFilmsURLs.push(pagesFilmsURLs[i]);
        i++; 
    };
    return firstSevenFilmsURLs;
}

// recuperation des infos de 7 meilleurs films
async function fetchTopSevenFilmInfos(page_url){
    let topSevenFilmsURLs = await fetchTopSevenFilmsURLs(page_url);
    topSevenFilmsInfos = [];
    i = 0;
    while(topSevenFilmsInfos.length < 7) {
        response = await fetch (topSevenFilmsURLs[i]);
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
    return topSevenFilmsInfos
};

// recuperation des infos du meilleur film
async function fetchTopFilmInfos(page_url){
    let TopTenFilmURLs = await fetchTopTenFilmsURLs(page_url);
    let TopFilmUrl = TopTenFilmURLs[0];
    let response = await fetch(TopFilmUrl);
    let filmInfos = await response.json();
    console.log(
        filmInfos.id, filmInfos.title, filmInfos.original_title, filmInfos.image_url, filmInfos.genres, filmInfos.date_published,
        filmInfos.rated, filmInfos.imdb_score, filmInfos.directors, filmInfos.actors, filmInfos.duration,
        filmInfos.countries, filmInfos.worldwide_gross_income, filmInfos.description, filmInfos.long_description
        )
    return filmInfos
};


async function displayFilmImage(page_url) {
    let filmInfos = await fetchTopFilmInfos(page_url)
    let filmPosterURL = await filmInfos.image_url;
    console.log("hello", filmPosterURL);
    let response = await fetch(filmPosterURL);
    console.log("hello2", response);
    let FilmPosterBlob = await response.blob();
    console.log("hello3", FilmPosterBlob);

    let reader = new FileReader();
    let FilmPosterAsDataURL = reader.readAsDataURL(FilmPosterBlob);
    console.log("hello4", FilmPosterAsDataURL); // undefined !!!
    FilmPoster = await FilmPosterAsDataURL.result;
    console.log("hello5", FilmPoster);
    return FilmPoster
}

/*
var reader = new FileReader();
reader.readAsDataURL(blob); 
reader.onloadend = function() {
   base64data = reader.result;     
}


    const blobToImage = (FilmsPosterBlob) => {
        return new Promise(resolve => {
            const url = URL.createObjectURL(FilmsPosterBlob)
            let img = new Image()
            img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
            }
          img.src = url
        })
    }
*/
    //document.getElementById("filmPoster").innerHTML;

    
//    let objectURL = URL.createObjectURL(filmPoster);
  //  let myImage = document.getElementById("my-img");
    //myImage.src = objectURL;
