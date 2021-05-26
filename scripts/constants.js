/* JS Fetch , simpler, native, compatible all browsers
* Getting data from OCMovies Titles and handling errors
*/

// CONSTANTS
const MAIN_ENDPOINT = 'http://localhost:8000/api/v1/titles/'
const BEST_FILMS_OF_ALL_ENDPOINT = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes'
const BEST_ACTION_FILMS_ENDPOIND = 'http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&sort_by=-votes'
const BEST_DRAMA_FILMS_ENDPOIND = 'http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&sort_by=-votes'
const BEST_FAMILY_FILMS_ENDPOIND = 'http://localhost:8000/api/v1/titles/?genre=family&sort_by=-imdb_score&sort_by=-votes'
// plus utilisé tests ! const GENRES_ENDPOINT = 'http://localhost:8000/api/v1/genres/'
// plus utilisé tests ! const TEST_DETAILED_TITLE_ENDPOINT = 'http://localhost:8000/api/v1/titles/11207902'


// consigne !!

/* “Meilleur film”
Cette zone affiche la photo du film qui a la meilleur note Imdb toutes catégories confondues,
ainsi que son titre, un bouton et le résumé du film sous le bouton.
Lorsqu’on clique sur le bouton du film en vedette ou sur l’image d’un des films une fenêtre modale s’ouvre.
Dans cette fenêtre les informations suivantes doivent être présente :

    L’image de la pochette du film
    Le Titre du film
    Le genre complet du film
    Sa date de sortie
    Son Rated
    Son score Imdb
    Son réalisateur
    La liste des acteurs
    Sa durée
    Le pays d’origine
    Le résultat au Box Office
    Le résumé du film
--> j'ai les infos
    */



/*
“Films les mieux notés” :
Cette zone affiche les 7 autres films les mieux notés toutes catégories confondues.
On pourra les faire défiler avec une flèche à gauche et à droite 
comme sur la maquette pour tous les parcourir.
--> j'ai les infos
*/

/*
Nous te laissons choisir les catégories 1, 2 et 3.
 Elles doivent être différentes et être indiqué au dessus de la zone des films 
 à la place de “Catégorie 1”, 2 et 3 dans la maquette.

  “Catégorie 1” :
 Montre les 7 films les mieux notés d’une catégorie donnée. 
--> je peux récupérer les 7 films, je dois choisir la catégorie
 */


/*
“Catégorie 2” :
 Montre les 7 films les mieux notés d’une autre catégorie.
--> je peux récupérer les 7 films, je dois choisir la catégorie
 */

/*
“Catégorie 3” :
Idem sur une autre catégorie !
--> je peux récupérer les 7 films, je dois choisir la catégorie
*/
