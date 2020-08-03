//Import de l'url de l'API
import {API_URL} from "../modules/env.mjs"; 

let panier = JSON.parse(localStorage.getItem("panier")); //Récupérer le panier créé à la page précédente
//Générer le panier et le formulaire (seulement s'il y a un panier)
function generateCart(cart) {
    let element = document.getElementById("affichePanier"); //appel affichage du panier
	let totalPanier = 0;
	//affichage panier et total
	if(cart && cart.length > 0){
	
		for (let i = 0; i < cart.length; i++) {
			element.innerHTML +=
				`<tr>` +
				`<td><img src='${cart[i].imageUrl}' alt='' width="100" height="100"></td>` +
				`<td>${cart[i].name}</td>` +
				`<td>${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart[i].price)}</td>` + `<td><button class="btn btn-outline-danger" id="btn-${i}">Supprimer</button> </td>` +
				`</tr>`;
			totalPanier += cart[i].price;				
        }
        totalPanier = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPanier)
		element.innerHTML += `<th>TOTAL TTC</th>` + `<th></th>` + `<th>${totalPanier}</th>`;
		//local storage pour l'affichage du total du panier sur la page de confirmation
		localStorage.setItem("total", totalPanier);  
		generateForm();
	}  
}
window.onload = generateCart(panier);

//Retirer un produit du panier
function clickOnDelete(i) {
	panier.splice(i,1)
	localStorage.setItem("panier", JSON.stringify(panier)) //Mise à jour du panier 
	document.location.reload(true); //Rechargement de la page
}

window.addEventListener("load", function(event) {
    for(let i=0; i<panier.length; i++){
        document.getElementById("btn-" + i).addEventListener('click', ()=> {clickOnDelete(i)})
    }
});

//Critères de vérification des inputs dans le formulaire de contact: email conforme et caractères spéciaux non-autorisés
const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkCaracteresSpeciaux = /[§!@#$%^&*().?":{}|<>]/;
function checktext(text,email){
	if(email && !checkMail.test(text)){
        alert("Votre adresse email est incorrecte")
		return false
    }else if(email && checkMail.test(text)){
        return true
    }
	if (checkCaracteresSpeciaux.test(text) ) {
		alert("Attention certaines données ne sont pas conformes");
		return false;
	}
}

//Création du formulaire de contact 
function generateForm(){
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
					<input id="codepostal" type="number" class="form-control" placeholder="Code Postal" required>
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
		</form>`;
}

//Vérification des inputs du formulaire
document.getElementById("formulaire").addEventListener("submit", (event) => {
    event.preventDefault();
	let ok = true;
    if(checktext(nom.value, false)===false){ok = false}
    if(checktext(prenom.value, false)===false){ok = false}
    if(checktext(email.value, true)===false){ok = false}
    if(checktext(ville.value, false)===false){ok = false}
    if(checktext(adresse.value, false)===false){ok = false}

    //bloquer la suite de l'éxécution du code si les vérifications ne donnent pas de résultats conformes
    if(ok){
        let contact = {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        //envoi de l'object contact si les vérifications donnent des résultats conformes
        sendOrder(contact);
    }
});

function sendOrder(contact){
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
}










