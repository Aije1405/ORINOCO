import { API_URL } from "../modules/env.mjs"

//Générer le détail du produit cliqué par l'utilisateur
function generateProduct(response) {
    let element = document.getElementById("product");
    element.insertAdjacentHTML('afterbegin',
        `<h2 class='card-title'>${response.name}</h2>` + 
        `<img width='100' height='100' alt='furniture' src="${response.imageUrl}">` +
        `<p class='card-text'>${response.description}</p>` +
        `<label><em>Sélectionnez votre finition</em></label>
            <select class="form-control"></select>` +
        `<p class='card-text my-2'>${response.price} Euros</p>`);

    let select = document.getElementsByTagName("select")[0];

    response.varnish.forEach(item => {
        select.innerHTML += `<option value="${item}">${item}</option>`
    });
}

//Appeler l'API et afficher le produit cliqué par l'utilisateur en utilisant son id
window.onload = function () {
    const QUERYSTRING = window.location.search;
    const URLPARAMETERS = new URLSearchParams(QUERYSTRING);
    const ID = URLPARAMETERS.get('id');
    fetch(API_URL + ID)
        .then(response => response.json()) //récupère la promesse puis la réponse de la promesse - conversion JSON
        .then(response => {
            generateProduct(response);
        })
        .catch(err => console.error(err)); //vérifie s'il y a une erreur 
}

//Ajouter le produit au panier
document.getElementById("ajout").addEventListener("click", function generateProduct(response) {
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) { //je vérifie si mon panier existe
        panier = [];
    }
    panier.push({
        id: response._id,
        imageUrl: response.imageUrl,
        name: response.name,
        price: response.price
    });
    localStorage.setItem("panier", JSON.stringify(panier)); //les paramètres ne peuvent être que des strings donc JSON
    alert("Votre article a bien été ajouté au panier");
    console.log(panier)
})


