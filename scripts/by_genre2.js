// Recupération de plusieurs(2) pages 
async function fetchAllGenres(page_url){
    let allData = []; 
    let page_nb = 1;
    let max_pages = 6; // on s'arrete à 2 pages ici mais pas clair on peut changer le nombre de pages ici (5 resultats par page)

    while(page_nb < max_pages) {
        page_url = `http://localhost:8000/api/v1/genres/?page=${page_nb}` //on peut changer le filtre ici
        let response = await fetch(page_url);
        page_nb++
        let data = await response.json();
        data.results.forEach(e => allData.push(e));
        //page_url = await data.next;  // ca fonctionne mais plutot utiliser ca !! 
    }
    console.table(allData)
    return allData;
}