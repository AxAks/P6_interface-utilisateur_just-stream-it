// je peux factoriser ici aussi si je sors "expected_pages" de l'autre fonction
async function fetchTopFilmURL(page_url=BEST_FILMS_OF_ALL_ENDPOINT){
    let response = await fetch(page_url);
    console.table(response.status, response.statusText);
    let data = await response.json(); //on recupere les 5 films les mieux notés, ca suffit : on ne veut que le 1er !
    let results = await data.results
    let TopFilmTitle = await results[0].title
    let TopFilmURL = await results[0].url
    console.table(TopFilmTitle, TopFilmURL)
    return TopFilmURL
};

async function fetchTopFilmInfos(){
    let TopFilmURL = await fetchTopFilmURL()
    let response = await fetch(TopFilmURL);
    let TopFilmInfos = await response.json();
    console.table(TopFilmInfos);
    console.table(TopFilmInfos.id, TopFilmInfos.title, TopFilmInfos.image_url, TopFilmInfos.genres, TopFilmInfos.date_published) //toutes les infos à recupérer !!
    console.table(TopFilmInfos.rated, TopFilmInfos.imdb_score, TopFilmInfos.directors) //toutes les infos à recupérer !!
    console.table(TopFilmInfos.actors, TopFilmInfos.duration, TopFilmInfos.countries) //toutes les infos à recupérer !!
    console.table(TopFilmInfos.worldwide_gross_income, TopFilmInfos.description); //toutes les infos à recupérer !!
    return TopFilmInfos
}