// à factoriser !! sortir page_url !
async function fetchTopTenFilmsURLs(page_url=BEST_FILMS_OF_ALL_ENDPOINT){ //on peut changer le filtre ici
    let allURLs = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
        let response = await fetch(page_url);
        page_nb++
        let data = await response.json(); // text(), json(), blob(), formData() and arrayBuffer() selon le type de data
        data.results.forEach(film => allURLs.push(film.url));
        page_url = await data.next;
    }
    console.table(allURLs)
    return allURLs;
}

// recuperation des urls des 7 meilleurs films
async function fetchTopSevenFilmsURLs(){
    let pagesFilmsURLs = await fetchTopTenFilmsURLs(); // on recupere les films les mieux notés sur 2 pages (10 films)
    let firstSevenFilmsURLs = [];
    i = 0
    while (firstSevenFilmsURLs.length < 7) {
        firstSevenFilmsURLs.push(pagesFilmsURLs[i]); // récupération des 7 premiers films seulement
        i++; 
    };
    console.table(firstSevenFilmsURLs);
    return firstSevenFilmsURLs;
}

async function fetchTopSevenFilmInfos(){
    let topSevenFilmsURLs = await fetchTopSevenFilmsURLs();
    topSevenFilmsInfos = [];
    i = 0;
    while(topSevenFilmsInfos.length < 7) {
        response = await fetch (topSevenFilmsURLs[i]);
        filmInfos = await response.json();
        topSevenFilmsInfos.push(filmInfos);
        i++;
    };
    console.table(topSevenFilmsInfos);
    return topSevenFilmsInfos;
}