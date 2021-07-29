/* Récupération de la chaîne de requête dans l'url */
const queryString_url_id = window.location.search;
console.log(queryString_url_id);
/* Extraction de l'id */

const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

/* Affichage de  la cam */
const promesse = fetch(`http://localhost:3000/api/cameras/${id}`);
promesse
    .then((response) => {
        const cameraData = response.json(); /*j'enregistre dans une variable les données de la réponse de la promesse transformées en json. Renvoie une nouvelle promesse*/
        cameraData.then((camera) => { /* je récupère le tableau correspondant à mon camera*/
            const id = camera._id;
            const description = camera.description;
            const imageUrl = camera.imageUrl;
            const name = camera.name;
            const price = camera.price / 100 + " €";
            const lenses = camera.lenses;
            let structureLenses = [];
            for (let i = 0; i < lenses.length; i++) {
                structureLenses += `<li><a class="dropdown-item" href="#">${lenses[i]}</a></li>`;
            }
        })
    })
