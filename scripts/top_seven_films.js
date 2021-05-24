// Recupération de plusieurs(4) pages 
async function fetchTopTenFilms(page_url){
    let allData = []; 
    let page_nb = 1;
    let max_pages = 3; // on s'arrete à 2 pages ici mais pas clair on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb < max_pages) {
        page_url = `http://localhost:8000/api/v1/titles/?page=${page_nb}&sort_by=-votes&sort_by=-imdb_score` //on peut changer le filtre ici
        let response = await fetch(page_url);
        page_nb++
        let data = await response.json();
        data.results.forEach(e => allData.push(e));
        //page_url = await data.next;  // ca fonctionne mais plutot utiliser ca !! 
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
