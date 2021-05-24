// à factoriser !! sortir page_url !
async function fetchTopTenFilms(page_url=BEST_FILMS_OF_ALL_ENDPOINT){
    let allData = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
        //on peut changer le filtre ici
        let response = await fetch(page_url);
        page_nb++
        let data = await response.json(); // text(), json(), blob(), formData() and arrayBuffer() selon le type de data
        data.results.forEach(e => allData.push(e));
        page_url = await data.next;
    }
    console.table(allData)
    return allData;
}

// recuperation des infos des 7 meilleurs films
async function fetchTopSevenFilmInfos(){
    let pagesFilms = await fetchTopTenFilms(); // on recupere les films les mieux notés sur 2 pages (10 films)
    let firstSevenFilms = [];
    i = 0
    while (firstSevenFilms.length < 7) {
        firstSevenFilms.push(pagesFilms[i]); // récupération des 7 premiers films seulement
        i++; 
    };
    console.table(firstSevenFilms);
    return firstSevenFilms;
}
