// à factoriser !! sortir page_url !
async function fetchTopTenDrama(page_url=BEST_DRAMA_FILMS_ENDPOIND) {
    let allData = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
         //on peut changer le filtre ici
        let response = await fetch(page_url);
        page_nb++;
        let data = await response.json(); // text(), json(), blob(), formData() and arrayBuffer() selon le type de data
        data.results.forEach(e => allData.push(e));
        page_url = await data.next;
    }
    console.table(allData);
    return allData;
}

async function fetchTopSevenDramaFilmInfos(){
    let pagesFilms = await fetchTopTenDrama(); // on recupere les films les mieux notés sur 2 pages (10 films)
    let firstSevenDramas = [];
    i = 0
    while (firstSevenDramas.length < 7) {
        firstSevenDramas.push(pagesFilms[i]); // récupération des 7 premiers dramas seulement
        i++; 
    };
    console.table(firstSevenDramas);
    return firstSevenDramas;
}