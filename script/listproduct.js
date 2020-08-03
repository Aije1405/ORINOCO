//Import de l'url de l'API
import { API_URL } from "../modules/env.mjs"
//Appel à l'API et affichage des produits
window.onload = function () {
    fetch(API_URL)
        .then(response => response.json())
        .then(response => {
            let element = document.getElementById("list");

            for (let i = 0; i < response.length; i++) {
                element.innerHTML +=
                    "<div class='row justify-content-center'>" +
                    "<div class='col-12 col-lg-6'>" +
                    "<div class='card my-5'>" +
                    "<img class='rounded mx-auto my-4 d-block' width='200' height='200' alt='vintage chair' src='" + 
                    response[i].imageUrl + "'>" +
                    "<div class='card-body text-center'>" +
                    "<h2 class='card-title'>" + response[i].name + "</h2>" +
                    "<p class='card-text'>" + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(response[i].price) + "</p>" +
                    "<a href='pages/product.html?id=" + response[i]._id +
                    "' class='btn btn-dark'>Voir le détail du produit</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
        })
        .catch(err => console.error(err));
}

