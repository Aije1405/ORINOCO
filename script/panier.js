window.onload = function () 
{
    const REQUEST = new XMLHttpRequest();
    const METHOD = "GET";
    const URL = "http://localhost:3000/api/furniture/id"

    REQUEST.open(METHOD, URL);

    REQUEST.onreadystatechange = function (event){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        {
            let ajoutPanier = JSON.parse(this.responseText);
            
        }
        REQUEST.send();
    }

    function ajoutPanier(imageUrl, name, price){
        const nouvelArticlePanier = document.createElement("th");
        nouvelArticlePanier.innerHTML = `<img>${imageUrl}</img><h3>${name}<h3/><p>${price}</p>`
        document.querySelector("thead").appendChild(nouvelArticlePanier);
    }

    ajoutPanier
}


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