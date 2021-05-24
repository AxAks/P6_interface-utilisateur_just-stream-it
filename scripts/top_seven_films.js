// Recupération de plusieurs pages 
async function fetchTopTenFilms(page_url){
    let allData = []; 
    let page_nb = 1;
    let expected_pages = 2; // on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb <= expected_pages) {
        page_url = SORTED_BY_IMDB_SCORE_ENDPOINT //on peut changer le filtre ici
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
async function fetchTopSevenFilmInfos(url){
    let pagesFilms = await fetchTopTenFilms(); // on recupere les films les mieux notés sur 4 pages (20 films)
    let firstSevenfilms = [];
    i = 0
    while (firstSevenfilms.length < 7) {
        firstSevenfilms.push(pagesFilms[i]); // récupération des 7 premiers films seulement
        i++; 
    };
    console.table(firstSevenfilms);
    return firstSevenfilms;
}
