function callApi(request, ID) {
    request.open("GET", "http://localhost:3000/api/furniture/" + ID);
    request.send();
}

window.onload = function () 
{
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () 
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        {
            let response = JSON.parse(this.responseText);
            let element = document.getElementById("product");
                element.innerHTML =
                "<div class='row justify-content-center'>" +
                    "<div class='col-12 col-lg-6'>" +
                        "<div class='card my-5'>" +
                            "<div class='card-body'>" +
                                "<h2 class='card-title'>"+ response.name +"</h2>" +
                                "<p class='card-text'>"+ response.price +" Euros</p>" + 
                                "<img width='40' height='30' alt='vintage chair' src='"+ response.imageUrl + "'>" +
<<<<<<< HEAD
                                "<a href='../pages/panier.html' class='btn btn-dark'>Ajouter au panier</a>" +
=======
                                "<a href='pages/panier.html' class='btn btn-dark'>Ajouter au panier</a>" +
>>>>>>> Staging
                            "</div>" +
                         "</div>" +
                    "</div>" +
                "</div>";
            
        }

    }

    const QUERYSTRING = window.location.search;
    
    const URLPARAMETERS = new URLSearchParams(QUERYSTRING);
    const ID = URLPARAMETERS.get('id');

    callApi(request, ID);
}


