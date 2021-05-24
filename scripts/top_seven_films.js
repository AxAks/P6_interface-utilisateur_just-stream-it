// Recupération de plusieurs(4) pages 
async function fetchBestTwentyFilms(page_url){
    let allData = []; 
    let page_nb = 1;
    let max_pages = 5; // on s'arrete à 4 apges ici mais pas clair on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb < max_pages) {
        page_url = `http://localhost:8000/api/v1/titles/?page=${page_nb}&sort_by=-imdb_score` //on peut changer le filtre ici
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
    let allData = await fetchBestTwentyFilms(); // on recupere les films les mieux notés sur 4 pages (20 films)
    let films = [];
    while (films.length < 7){
        for (film of allData) {
            films.push(film); // pb j'ai encore 20 films ici !
        };
    }
        console.table(films);
    return films;
};

var yearStart = 2000;
var yearEnd = 2040;

var arr = [];

while(yearStart < yearEnd+1){
  arr.push(yearStart++);
}