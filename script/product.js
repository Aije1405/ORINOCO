import {API_URL} from "../modules/env.mjs"

function generateProduct(response){
    let element = document.getElementById("product");

    element.insertAdjacentHTML('afterbegin',
        `<h2 class='card-title'>${response.name}</h2>` + `<img width='100' height='100' alt='furniture' src="${response.imageUrl}">` +
        `<p class='card-text'>${response.description}</p>` +
        `<label><em>Sélectionnez votre finition</em></label>
            <select class="form-control"></select>` +
        `<p class='card-text my-2'>${response.price} Euros</p>`);

    let select = document.getElementsByTagName("select")[0];

    response.varnish.forEach(item => {
        select.innerHTML += `<option value="${item}">${item}</option>`
    });

    document.getElementById("ajout").addEventListener("click", () => {
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
    })
}

window.onload = function () {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            generateProduct(response);
            
        }
    }

    const QUERYSTRING = window.location.search;

    const URLPARAMETERS = new URLSearchParams(QUERYSTRING);
    const ID = URLPARAMETERS.get('id');

    request.open("GET", API_URL + ID);
    request.send();
}
