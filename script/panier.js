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
        `<td>${panier[i].price} euros</td>` +
        `</tr>`;
        totalPanier += panier[i].price;

        
    }

    element.innerHTML +=
        `<th>TOTAL TTC</th>` + `<th></th>` + `<th>${totalPanier} Euros</th>`;

        form.innerHTML = 
        `<h2 class="row my-5">Vos informations</h2>
        <form>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Prénom">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Nom">
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Adresse">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Code Postal">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Ville">
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <input type="email" class="form-control" placeholder="Adresse électronique">
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <button type="button" class="btn btn-dark btn-lg btn-block">Commander !</button>
                </div>
            </div>
        </form>
    </div>`
}
    
    
    
     
/*
if(panier.length < i){
    document.getElementById("formContact").style.display = "none"
} else {
    
}
*/







//CONDITION AFFICHAGE FORM
/*
function afficheForm (){

    SI (panier < 1) {
        document.getElementById("affichePanier").style.display = "none";
    } else {

    }
}




//ouverture et envoi requête POST
/*
const requ = new XMLHttpRequest();
const method = "POST";
const url = "http://localhost:3000/api/furniture/";

const data = {
    body: "blablabla",
    title: "Titre du poste",
    userId: 16
};

requ.open(method, url);

requ.onreadystatechange = function(event){  //récupérer la réponse readyStateChange
    if(this.readyState === XMLHttpRequest.DONE){ //est-ce que ma requête est terminée ?
        if(this.status === 201){  //est-ce que ma requête s'est bien passée ?(réponse 201 le post est-il accepté ?)
            console.log(JSON.parse(this.responseText)) //JSON.parse affiche les données sous forme d'objets
        } else {
            console.log("Statut" + this.status);
        }
    } 
}
requ.send(data);
*/