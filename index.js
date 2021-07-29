/* Format d'un article camera */
class Camera{
    constructor(jsonCamera){
        jsonCamera && Object.assign (this, jsonCamera);
    }
}
/* Appel de l'API, affichage de l'ensemble des articles */
fetch("http://localhost:3000/api/cameras/")
 .then( data => data.json())
 .then(jsonListCamera => {
    for(let jsonCamera of jsonListCamera) {
        let camera = new Camera(jsonCamera);
      
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
});