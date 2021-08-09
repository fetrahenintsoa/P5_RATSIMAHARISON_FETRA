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
            document.querySelector("#selected-camera").innerHTML = `<div class="col-xxl-10 m-xxl-auto">
            <div class="card bg-light text-center mb-4">
            <img src=${imageUrl} class="card-img-top" alt="Photo ">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text fw-bold">${price} €</p>
                    <div class="dropdown mb-3 col-2 m-auto">
                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Vernis
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="option">
                        ${structureLenses}
                        </ul>
                    </div>
                        <a href="panier.html" class="btn btn-primary" id="add-btn"><i class="fas fa-shopping-basket"></i>&nbsp;&nbsp;Ajouter au panier</a>
                </div>
            </div>
           </div>`;
             const ajoutPanier = document.querySelector("#add-btn"); /* sélection du bouton pour ajouter au panier */
             ajoutPanier.addEventListener("click", (event) => { /* ajout d'un événement au clic */
                 event.preventDefault();
                 let resumeProduct = { /* création d'un objet contenant les infos à envoyer au panier */
                     produit: imageUrl,
                     nom: name,
                     id: id,
                     prix: price
                    }
let saveProduct = JSON.parse(localStorage.getItem("product")); /* Déclaration de la variable pour enregistrer dans le local storage et conversion des données au format json du local storage au format JavaScript */
const confirmation = () => { /* message de confirmation d'envoi au panier */
if (window.confirm(`${name} a bien été ajouté à votre panier. Cliquez sur OK pour le consulter, sinon cliquez sur annuler pour revenir à la page d'accueil`)) {
window.location.href = "panier.html";
} else {
window.location.href = "index.html";
}
}
    /* Fonction pour ajouter le produit au local storage */
      const ajoutProduit = () => {
saveProduct.push(resumeProduct);
localStorage.setItem("product", JSON.stringify(saveProduct));
}
if (saveProduct) { /* au cas où il y a des produits enregistrés dans le local storage */
ajoutProduit();
confirmation();
} else { /* si il n'y a pas de produits enregistrés dans le local storage */
saveProduct = [];
ajoutProduit();
confirmation();
}


.catch((erreur) => console.log(erreur));
} else {
console.log("OK");
        })
   
