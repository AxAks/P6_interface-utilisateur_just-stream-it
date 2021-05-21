// Recupération de plusieurs(4) pages 
async function fetchTitlesOnSeveralPages(page_url){
    let allData = [];
    //let page_url = `http://localhost:8000/api/v1/titles/` //on peut changer le filtre ici 
    let pages_count = 0
    let max_pages = 4; // on peut changer le nombre de pages ici (5 resultats par page)

    while(pages_count < max_pages) {
        let response = await fetch(MAIN_ENDPOINT);
        pages_count++
        let data = await response.json();
        data.results.forEach(e => allData.unshift(e));
        page_url = await data.next;
    }
    console.log(allData)
    return allData;
}
