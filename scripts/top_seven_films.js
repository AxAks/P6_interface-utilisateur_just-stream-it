async function fetchTopSevenFilmInfos(url){
    let response = await fetch(SORTED_BY_IMDB_SCORE_ENDPOINT);
    console.table(response.status, response.statusText);
    let data = await response.json(); //on recupere les 5 films les mieux notés, PB : on en veut 7 il faut recupérer les 2 1ers de la page 2
    console.table(data);
    let results = await data.results
    console.table(results)
    return results
};
