import {API_URL} from "../modules/env.mjs"

window.onload = function () {
    let panier = JSON.parse(localStorage.getItem("panier")); //appel du panier
    let element = document.getElementById("affichePanier"); //appel affichage du panier
    let totalPanier = 0;
    let form = document.getElementById("formContact");//appel affichage de contact


    //affichage panier et total
    for (let i = 0; i < panier.length; i++) {
        element.innerHTML +=
            `<tr>` +
            `<td><img src='${panier[i].imageUrl}' alt='' width="100" "height="100"></td>` +
            `<td>${panier[i].name}</td>` +
            `<td>${panier[i].price} euros</td>` + `<td><button onclick="" type="button" class="btn btn-outline-danger">Supprimer</button></td>` +
            `</tr>`;
        totalPanier += panier[i].price;
    }

    localStorage.setItem("total", totalPanier);

    element.innerHTML +=
        `<th>TOTAL TTC</th>` + `<th></th>` + `<th>${totalPanier} Euros</th>`;

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

    const checktext = (text,email = false) => {
        const checkChiffres = /[0-9]/;
        const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkCaracteresSpeciaux = /[§!@#$%^&*().?":{}|<>]/;

        if(email){
            checkMail.test(text) ? console.log("Email accepté") : alert("Attention certaines données ne sont pas conformes");
            return 
        }

        if (checkChiffres.test(text) || checkCaracteresSpeciaux.test(text) ) {
            alert("Attention certaines données ne sont pas conformes");
            return
        } 
    }

    document.getElementById("formulaire").addEventListener("submit", (event) => {
        event.preventDefault();

        checktext(nom.value)
        checktext(prenom.value)
        checktext(email.value, true)
        //bloquer la suite de l'éxécution du code si les tests ne passent pas

        //object contact
        let contact = {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        console.log(contact);


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

        // envoi request post 
        fetch(API_URL + "order", options)
            .then(response => response.json()) //récupère la promesse puis la réponse de la promesse
            .then(response => {
                //localStorage.removeItem("panier");
                localStorage.setItem("orderId", response.orderId);
                //window.location.replace("./confirmation.html")
            })
            .catch(err => console.error(err)); //vérifie s'il y a une erreur  
    });
}

//retirer un item du panier
// let removeItem = 0
// removeItem.addEventListener("onclick",(event) =>{
//     panier.splice(0, 1);
//     localStorage.clear();
//     // Mise à jour du nouveau panier avec suppression de l'article
//     localStorage.setItem("panier", JSON.stringify(panier));
//     //Mise à jour de la page pour affichage de la suppression au client
//     window.location.reload();
// });  



