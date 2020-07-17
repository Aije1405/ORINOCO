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
        `<td>${panier[i].price} euros</td>` + `<td><button onclick="removeItem" type="button" class="btn btn-outline-danger">Supprimer</button></td>` + 
        `</tr>`;
        totalPanier += panier[i].price;
    }

       
    element.innerHTML +=
        `<th>TOTAL TTC</th>` + `<th></th>` + `<th>${totalPanier} Euros</th>`;

        form.innerHTML = 
        `<h2 class="row my-5">Vos informations</h2>
        <form id="formulaire">
            <div class="row">
                <div class="col">
                    <input id="prenom" type="text" class="form-control" placeholder="Prénom" required>
                </div>
                <div class="col">
                    <input id="nom" type="text" class="form-control" placeholder="Nom" required>
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <input id="adresse" type="text" class="form-control" placeholder="Adresse" required>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input id="codepostal" type="text" class="form-control" placeholder="Code Postal" required>
                </div>
                <div class="col">
                    <input id="ville" type="text" class="form-control" placeholder="Ville" required>
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
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

  
    document.getElementById("formulaire").addEventListener("submit", (event) => {
        event.preventDefault();
    
        let contact = {
            prenom: document.getElementById("prenom").value,
            nom: document.getElementById("nom").value,
            adresse: document.getElementById("adresse").value,
            codepostal: document.getElementById("codepostal").value,
            ville: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        //console.log(contact);

        checkForm = () => {
            //Controle Regex
            let checkChiffres = /[0-9]/;
            let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let checkCaracteresSpeciaux = /[§!@#$%^&*().?":{}|<>]/;
            let checkMessage = "";

            if (
                checkChiffres.test(nom) == true ||
                checkCaracteresSpeciaux.test(nom) == true ||
                nom == ""
              ) {
                checkMessage = "Les caractères spéciaux ou les chiffres ne sont pas autorisés";
              } else {
                console.log("Nom accepté");
              }
              if (checkMessage != "") {
                alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
              }
            }
          

        //parcourir le tableau panier et récupérer les attributs id pour en faire un tableau
        let products = [];
        panier.forEach(item => {
           products.push(item.id)
           //console.log(products);
       });

       let send = {
           contact, products
       };
       JSON.stringify(send);
       console.log(send);
      
        const REQUEST = new XMLHttpRequest();
        REQUEST.open("POST", "http://localhost:3000/api/furniture/order");
        REQUEST.setRequestHeader("content-type", "application/JSON");
        REQUEST.send(JSON.stringify(send));
        

        REQUEST.onreadystatechange = function(event){  //récupérer la réponse readyStateChange
            if(this.readyState === XMLHttpRequest.DONE){ //est-ce que ma requête est terminée ?
                if(this.status === 201){//est-ce que ma requête s'est bien passée ?(réponse 201 le post est-il accepté ?)
                    let json = JSON.parse(REQUEST.responseText); 
                    console.log(JSON.parse(this.responseText)) //JSON.parse affiche les données sous forme d'objets
                } else {
                    console.log(this.responseText);
                }
            } 
        }
        
    });
}

//retirer un item du panier
let removeItem = 0
removeItem.addEventListener("onclick",(event) =>{
    panier.splice(0, 1);
    localStorage.clear();
    // Mise à jour du nouveau panier avec suppression de l'article
    localStorage.setItem("panier", JSON.stringify(panier));
    //Mise à jour de la page pour affichage de la suppression au client
    window.location.reload();
});  


       
