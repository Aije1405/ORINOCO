window.onload = function () {

  let element = document.getElementById("result");
  let total = localStorage.getItem("total");
  let orderId = localStorage.getItem("orderId")


//Création éléments HTML & affichage de l'orderId et du total du panier
  element.innerHTML =
  `<li class="list-group-item">Votre numéro de commande : ${orderId}</li>
    <li class="list-group-item">Total de votre commande : ${total} euros</li>`

}