const SORTED_BY_IMDB_SCORE_ENDPOINT = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'

async function fetchTopFilmID(url){
    let response = await fetch(SORTED_BY_IMDB_SCORE_ENDPOINT);
    console.table(response.status, response.statusText);
    let data = await response.json(); //on recupere les 5 films les mieux notés, ca suffit : on ne veut que le 1er !
    let results = await data.results
    let TopFilmID = await results[0].id
    console.table(TopFilmID)
    return TopFilmID
};


async function fetchTopFilmInfos(film_id){
    let TopFilmID = await fetchTopFilmID()
    let response = await fetch(`http://localhost:8000/api/v1/titles/${TopFilmID}`);
    let TopFilmInfos = await response.json();
    console.table(TopFilmInfos);
    console.log(TopFilmInfos.id, TopFilmInfos.title, TopFilmInfos.image_url, TopFilmInfos.genres, TopFilmInfos.date_published) //toutes les infos à recupérer !!
    console.log(TopFilmInfos.rated, TopFilmInfos.imdb_score, TopFilmInfos.directors) //toutes les infos à recupérer !!
    console.log(TopFilmInfos.actors, TopFilmInfos.duration, TopFilmInfos.countries) //toutes les infos à recupérer !!
    console.log(TopFilmInfos.worldwide_gross_income, TopFilmInfos.description); //toutes les infos à recupérer !!
    return TopFilmInfos
}