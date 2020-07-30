import {API_URL} from "../modules/env.mjs" //import des informations de l'API

let panier = JSON.parse(localStorage.getItem("panier")); //Récupérer le panier créé à la page précédente

window.onload = function () {
    let element = document.getElementById("affichePanier"); //appel affichage du panier
        let totalPanier = 0;

        //affichage panier et total
        for (let i = 0; i < panier.length; i++) {
            element.innerHTML +=
                `<tr>` +
                `<td><img src='${panier[i].imageUrl}' alt='' width="100" "height="100"></td>` +
                `<td>${panier[i].name}</td>` +
                `<td>${panier[i].price} euros</td>` + `<td id="btn-${i}"> </td>` +
                `</tr>`;
                totalPanier += panier[i].price;
        }
        element.innerHTML += `<th>TOTAL TTC</th>` + `<th></th>` + `<th>${totalPanier} Euros</th>`;
        //local storage pour l'affichage du total du panier sur la page de confirmation
        localStorage.setItem("total", totalPanier);    
}

//Création du formulaire de contact si le panier contient au moins un produit
if(panier && panier.length > 0) {
let form = document.getElementById("formContact");
form.innerHTML =
    `<h2 class="row my-5">Vos informations</h2>
    <form id="formulaire">
        <div class="row">
            <div class="col">
            <label for="prenom">Prenom</label>
                <input id="prenom" type="text" class="form-control" placeholder="Prénom" required>
            </div>
            <div class="col">
            <label for="nom">Nom</label>
                <input id="nom" type="text" class="form-control" placeholder="Nom" required>
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
            <label for="adresse">Adresse</label>
                <input id="adresse" type="text" class="form-control" placeholder="Adresse" required>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <label for="codepostal">Code Postal</label>
                <input id="codepostal" type="text" class="form-control" placeholder="Code Postal" required>
            </div>
            <div class="col">
            <label for="ville">Ville</label>
                <input id="ville" type="text" class="form-control" placeholder="Ville" required>
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
            <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Adresse électronique" required>
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <button type="submit" class="btn btn-success btn-lg btn-block">Commander !</button>
            </div>
        </div>
    </form>
</div>`;

//Critères de vérification des inputs dans le formulaire de contact: email conforme et caractères spéciaux non-autorisés
const checktext = (text,email = false) => {
const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkCaracteresSpeciaux = /[§!@#$%^&*().?":{}|<>]/;

    if(email){
        checkMail.test(text) ? console.log("Email accepté") : alert("Attention certaines données dans votre adresse email ne sont pas conformes");
        return 
    }
    if (checkCaracteresSpeciaux.test(text) ) {
        alert("Attention certaines données ne sont pas conformes");
        return
    } 
}

//Vérification des inputs 
document.getElementById("formulaire").addEventListener("submit", (event) => {
    event.preventDefault();

    checktext(nom.value)
    checktext(prenom.value)
    checktext(email.value, true)
    checktext(ville.value)
    checktext(adresse.value)
    checktext(codepostal.value)
    //bloquer la suite de l'éxécution du code si les tests ne passent pas ?

    //création de l'object contact
    let contact = {
        firstName: document.getElementById("prenom").value,
        lastName: document.getElementById("nom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value,
    }

    //parcourir le tableau panier et récupérer les attributs id pour en faire un tableau
    const products = panier.map(item => item.id)
    const send = {
        contact, products
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(send),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // envoi de la requête post en fetch asynchrone - paramètres URL (renvoi une promesse)
    fetch(API_URL + "order", options)
        .then(response => response.json()) //récupère la promesse puis la réponse promise - conversion JSON
        .then(response => {
            localStorage.removeItem("panier");
            localStorage.setItem("orderId", response.orderId); 
            window.location.replace("./confirmation.html")
        })
        .catch(err => console.error(err)); //vérifie s'il y a une erreur  
});

}

//Retirer un produit du panier
window.addEventListener("load", function(event) {
    //création du bouton de suppression
    for(let i=0; i<panier.length; i++){
        let button = document.createElement("button")
        const id = "#btn-" + i
        button.classList.add("btn", "btn-outline-danger")
        button.innerText = "Supprimer"

        button.addEventListener('click', ()=> {
            panier.splice(i,1)
            localStorage.setItem("panier", JSON.stringify(panier)) //Mise à jour du panier 
            document.location.reload(true); //Rechargement de la page
        })
        document.querySelector(id).appendChild(button)
    }
});





