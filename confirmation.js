/* Récupération du montant total de la commande */
const total = localStorage.getItem("montantTotal");
console.log("Total");
console.log(total);
/* Affichage du récapitulatif html */
document.querySelector("#recap").innerHTML = `<div class="col-md-10 col-lg-8 col-xl-6 col-xxl-5">
                                                <div class="card">
                                                    <div class="card-header fw-bold">
                                                    Récapitulatif
                                                    </div>
                                                    <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Identifiant : ${responseId}</li>
                                                    <li class="list-group-item">Montant total : ${total} €</li>
                                                    </ul>
                                                </div>
                                            </div>`;