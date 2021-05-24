// Recupération de plusieurs(4) pages 
async function fetchTitlesOnAlllPages(){
    let allData = [];  
    page_url = MAIN_ENDPOINT //on peut changer le filtre ici
    
    while(page_url != null) {  //on parcourt toutes les pages  (trop bourrin et trop long !)  
        let response = await fetch(page_url);
        let data = await response.json();
        data.results.forEach(e => allData.push(e));
        page_url = await data.next;  // ca fonctionne mais plutot utiliser ca !! 
    }
    console.table(allData)
    return allData;
}
