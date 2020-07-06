window.onload = function () 
{
    let panier = JSON.parse(localStorage.getItem("panier"));
    let element = document.getElementById("affichePanier");

    for (let i = 0; i < panier.length; i++){
        element.innerHTML +=
        `<tr>` + 
        `<td><img src='${panier[i].imageUrl}' alt='' width="50" ></td>` + 
        `<td>${panier[i].name}</td>` + 
        `<td>${panier[i].price} euros</td>` +
        `</tr>`;
    }

}

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