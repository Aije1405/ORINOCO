window.onload = function () 
{
    let panier = JSON.parse(localStorage.getItem("panier"));
    let element = document.getElementById("affichePanier");
    let totalPanier = 0;
    let form = document.getElementById("formContact");
    


    for (let i = 0; i < panier.length; i++){
        element.innerHTML +=
        `<tr>` + 
        `<td><img src='${panier[i].imageUrl}' alt='' width="100" "height="100"></td>` + 
        `<td>${panier[i].name}</td>` + 
        `<td>${panier[i].price} euros</td>` + `<td></td>` + 
        `</tr>`;
        totalPanier += panier[i].price;
    }

    element.innerHTML +=
        `<th>TOTAL TTC</th>` + `<th></th>` + `<th>${totalPanier} Euros</th>`;

        form.innerHTML = 
        `<h2 class="row my-5">Vos informations</h2>
        <form id="contact">
            <div class="row">
                <div class="col">
                    <input id="prenom" type="text" class="form-control" placeholder="Prénom">
                </div>
                <div class="col">
                    <input id="nom" type="text" class="form-control" placeholder="Nom">
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <input id="adresse" type="text" class="form-control" placeholder="Adresse">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input id="codepostal" type="text" class="form-control" placeholder="Code Postal">
                </div>
                <div class="col">
                    <input id="ville" type="text" class="form-control" placeholder="Ville">
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <input id="email" type="email" class="form-control" placeholder="Adresse électronique">
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <button type="submit" class="btn btn-dark btn-lg btn-block">Commander !</button>
                </div>
            </div>
        </form>
    </div>`;

    document.getElementById("contact").addEventListener("submit", (event) => {
        event.preventDefault();
    

        const User = {
            prenom: document.getElementById("prenom").value,
            nom: document.getElementById("nom").value,
            adresse: document.getElementById("adresse").value,
            codepostal: document.getElementById("codepostal").value,
            ville: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        //console.log(User);

        const REQUEST = new XMLHttpRequest();
        let METHODE = "POST";
        let URL = "http://localhost:3000/api/furniture/order";

        REQUEST.open(METHODE, URL);

        REQUEST.onreadystatechange = function(event){  //récupérer la réponse readyStateChange
            if(this.readyState === XMLHttpRequest.DONE){ //est-ce que ma requête est terminée ?
                if(this.status === 201){  //est-ce que ma requête s'est bien passée ?(réponse 201 le post est-il accepté ?)
                    console.log(JSON.parse(this.responseText)) //JSON.parse affiche les données sous forme d'objets
                } else {
                    console.log("Statut" + this.status);
                }
            } 
        }
        REQUEST.send(User, panier);
    });
    
}





