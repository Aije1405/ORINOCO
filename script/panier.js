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




/*
<tr>
<td><img src="" alt=""></td>
<td>Nom</td>
 <td>190 euros</td>
 </tr>*/

//FONCTION POUR CREER LE PANIER ?
//<ul> dans le HTML, puis
/*function ajoutPanier(photo, name, prix){
    const nouvelArticlePanier = document.createElement("li");
    nouvelArticlePanier.innerHTML = `<img>${photo}</img><h3>${name}</h3><p>${prix}</p>`;
    document.querySelector("ul").appendChild(nouvelArticlePanier);
}

ajoutPanier("tbc", "bench", "190 euros");*/

//ouverture et envoi requête GET
/*
const requ = new XMLHttpRequest();
const method = "GET";
const url = "http://localhost:3000/api/furniture/";

requ.open(method, url);

requ.onreadystatechange = function(event){  //récupérer la réponse readyStateChange
    if(this.readyState === XMLHttpRequest.DONE){ //est-ce que ma requête est terminée ?
        if(this.status === 200){  //est-ce que ma requête s'est bien passée ?(réponse 200)
            console.log(JSON.parse(this.responseText)) //JSON.parse affiche les données sous forme d'objets
        } else {
            console.log("Statut" + this.status);
        }
    } 
}
requ.send();
*/

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