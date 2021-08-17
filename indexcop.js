/** Représentation du format d'un produit */
class Camera{
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }
}

/** Gère l'affichage et les interactions de la page Accueil */

fetch("http://localhost:3000/api/cameras/") //Appelle l'api de produits
.then( data => data.json())
.then( jsonListCamera => {
    for(let jsonCamera of jsonListCamera) {
        let camera = new Camera(jsonCamera); //Création de la liste des éléments 
        document.querySelector(".camera").innerHTML += `
        <div class="col-lg-4 col-xl-3">
            <a href="produit.html?id=${camera._id}">
              <div class="card shadow-sm scale">
                <img
                src="${camera.imageUrl}"
                class="card-img-top img-fluid"
                />
                <div class="card-body">
                  <h4 class="card-title">${camera.name}</h4>
                  <p class="card-text">${camera.description}</p>
                  <p class="card-text font-weight-bold">${camera.price / 100}.00 €</p>
                </div>
              </div>
            </a>
          </div>`;
    }
} );


/* Appel de l'API, affichage de l'ensemble des articles */
fetch("http://localhost:3000/api/cameras/")
/*fct qui récupère la promesse et les données qui est formater en json*/
 .then( data => data.json())
 /*recup de la nouvelle promesse et des données*/
 .then(jsonListCamera => {
     /* boucle créant de manière dynamique un nouvel objet basé sur le modèle pour chaque article */
    for(let jsonCamera of jsonListCamera) {
        let camera = new Camera(jsonCamera);
      /* sélection de l'emplacement où intégrer l'objet dans la page html et injection du code html */
        document.querySelector(".camera").innerHTML += 
        `<div class="col-lg-4 col-xxl-3">
          <div class="card bg-light text-center mb-4">
            <img src="${camera.imageUrl}" alt="image" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${camera.name}</h5>
                    <p class="card-text lead">${camera.description}</p>
                    <p class="card-text fw-bold">${camera.getFormatedPrice()} €</p>
                    <a href="produit.html?id=${camera._id}" class="btn btn-primary stretched-link">Détails</a>
                </div>
        </div>
     </div>`;
    }
})
