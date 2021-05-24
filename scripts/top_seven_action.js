// à factoriser !! sortir page_url !
async function fetchTopTenActionURLs(page_url=BEST_ACTION_FILMS_ENDPOIND){ //on peut changer le filtre ici
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

// recuperation des infos des 7 meilleurs films d'action
async function fetchTopSevenActionFilmInfos(){
    let pagesFilmsURLs = await fetchTopTenActionURLs(); // on recupere les films les mieux notés sur 2 pages (10 films)
    let firstSevenActionURLs = [];
    i = 0
    while (firstSevenActionURLs.length < 7) {
        firstSevenActionURLs.push(pagesFilmsURLs[i]); // récupération des 7 premiers dramas seulement
        i++; 
    };
    console.table(firstSevenActionURLs);
    return firstSevenActionURLs;
}