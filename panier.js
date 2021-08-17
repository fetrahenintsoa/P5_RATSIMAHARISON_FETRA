/* Déclaration de la variable pour enregistrer dans le local storage et conversion des données au format json du local storage au format JavaScript */
let saveProduct = JSON.parse(localStorage.getItem("product"));
/* Affichage des produits du panier */
const affichageProduits = document.querySelector("#affichage-produits");
let structurePanier = [];
for(j = 0; j < saveProduct.length; j++) {
    structurePanier += `<tr>
                            <td class="col-2"><img src="${saveProduct[j].produit}" alt="" class="img-fluid"></td>
                            <td class="fw-bold text-center">${saveProduct[j].nom}</td>
                            <td class="text-center">${saveProduct[j].id}</td>
                            <td class="text-center">${saveProduct[j].prix} €</td>
                            <td class="text-center"><button type="button" class="btn btn-secondary" id="suppBtn"><i class="far fa-trash-alt"></i></button></td>
                        </tr>`;
}
affichageProduits.innerHTML = structurePanier;

/* Sélection des boutons supprimer un article */
let boutonSupprimer = document.querySelectorAll("#suppBtn");
for(let k = 0; k < boutonSupprimer.length; k++) {
    boutonSupprimer[k].addEventListener("click", (event) => {
        event.preventDefault();
        /* Sélection de l'id du produit à supprimer */
        let idSelection = saveProduct[k].reference;
        /* Utilisation de la méthode filter pour sélectionner les éléments à garder et supprimer l'élément cliqué */
        saveProduct = saveProduct.filter( element => element.reference !== idSelection);
        /* Envoi de la nouvelle variable au local storage */
        localStorage.setItem("product", JSON.stringify(saveProduct));
        /* Rechargement de la page */
        window.location.href = "panier.html";
    })
}

/* VIDER ENTIÈREMENT LE PANIER */
/* Sélection du bouton */
const boutonSupprimerTotal = document.querySelector("#trash");
/* Suppression de la clé product du local storage */
boutonSupprimerTotal.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("product");
    /* Alerte confirmation */
    alert("Voulez-vous vraiment vider votre panier ?");
    /* Rechargement de la page */
    window.location.href = "panier.html";
})

/* CALCUL ET AFFICHAGE DU MONTANT TOTAL */
/* Céation d'une variable pour récupérer les prix des produits du panier */
let totalPrice = [];
/* Récupération des prix dans le panier */
for(let l = 0; l < saveProduct.length; l++) {
    let prixPanier = saveProduct[l].prix;
    totalPrice.push(prixPanier);
}
/* Utilisation de la méthode reduce pour additionner les prix */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const montantTotal = totalPrice.reduce(reducer,0);
/* Affichage du montant total */
const affichageMontant = document.querySelector("#affichage-montant").innerHTML = montantTotal + " €";
/* Envoi du montant total au local storage */
localStorage.setItem("montantTotal", JSON.stringify(montantTotal));
/* VALIDATION DU FORMULAIRE ET ENVOI DES DONNÉES */
/* Utilisation de l'API de validation */
/* Récupération du formulaire en ajoutant un événement au clic du bouton du formulaire */
document.querySelector("#form button").addEventListener("click", function(event) {
    event.preventDefault();
/* Vérification si l'ensemble des champs sont remplis */
let valid = true;
/* Boucle de vérification de l'ensemble des inputs */
for(let input of document.querySelectorAll("#form input, #form textarea")) {
    valid &= valid && input.reportValidity();
    if(!valid){
        break; /* Arrête de vérifier le formulaire si un champ n'est pas valide */
    }
}
if(valid) {
    /* Récupération des données du formulaire dans un objet */
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#mail").value
    };
    /* Récupération de l'id des cameras sélectionnés */
    const products = [];
    for(let m = 0; m < saveProduct.length; m++) {
        let reference = saveProduct[m].id;
        products.push(reference);
    }
    /* Envoi des objets au local storage */
    /*localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("products", JSON.stringify(products));*/
    /* Création d'un objet à envoyer au serveur regroupant les produits et le formulaire */
    const toSend = {
        products,
        contact,
    };
    /* Envoi au serveur */
    const promiseSend = fetch("http://localhost:3000/api/camrera/order", {
        method: "POST",
        body: JSON.stringify(toSend),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    });
    promiseSend
    .then(response => {
        return response.json();
    })
    .then(response2 => {
        console.log("réponse2");
        console.log(response2);
        /* Récupération de l'orderId de la réponse du serveur et envoie au local storage */
        localStorage.setItem("responseId", response2.orderId);
        /* Redirection vers la page de confirmation */
        window.location = "confirmation.html";
    })
    .catch(error => console.log(error))

      /* Voir le résultat dans la console */
    /*alert("Votre commande a bien été envoyée");*/
}
});