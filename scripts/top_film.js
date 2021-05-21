const SORTED_BY_IMDB_SCORE_ENDPOINT = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'

async function fetchTopFilmID(url){
    let response = await fetch(SORTED_BY_IMDB_SCORE_ENDPOINT);
    console.table(response.status, response.statusText);
    let data = await response.json(); //on recupere les 5 films les mieux notés, ca suffit : on ne veut que le 1er !
    console.table(data);
    let results = await data.results
    let TopFilmID = await results[0].id
    console.table(TopFilmID)
    return TopFilmID
};


async function fetchTopFilmInfos(film_id){
    let TopFilmID = await fetchTopFilmID()
    console.table(TopFilmID)
    let response = await fetch(`http://localhost:8000/api/v1/titles/${TopFilmID}`);
    let TopFilmInfos = await response.json();
    console.table(TopFilmInfos);
}