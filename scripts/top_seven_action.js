// à factoriser !! sortir page_url !
async function fetchTopTenAction(page_url=BEST_ACTION_FILMS_ENDPOIND){
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

// recuperation des infos des 7 meilleurs films d'action
async function fetchTopSevenActionFilmInfos(){
    let pagesFilms = await fetchTopTenDrama(); // on recupere les films les mieux notés sur 2 pages (10 films)
    let firstSevenAction = [];
    i = 0
    while (firstSevenAction.length < 7) {
        firstSevenAction.push(pagesFilms[i]); // récupération des 7 premiers dramas seulement
        i++; 
    };
    console.table(firstSevenAction);
    return firstSevenAction;
}