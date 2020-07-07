window.onload = function () 
{
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () 
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        {
            let response = JSON.parse(this.responseText);
            let element = document.getElementById("list");

            for (let i = 0; i < response.length; i++)
            {
                element.innerHTML +=
                "<div class='row justify-content-center'>" +
                    "<div class='col-12 col-lg-6'>" +
                        "<div class='card my-5'>" +
                        "<img class='rounded mx-auto d-block' width='200' height='200' alt='vintage chair' src='"+ response[i].imageUrl + "'>" +
                            "<div class='card-body text-center'>" +
                                "<h2 class='card-title'>"+ response[i].name +"</h2>" +
                                "<p class='card-text'>"+ response[i].price +" Euros</p>" + 
                                "<a href='pages/product.html?id="+response[i]._id +
                                "' class='btn btn-dark'>Voir le détail du produit</a>" +
                            "</div>" +
                         "</div>" +
                    "</div>" +
                "</div>";
            }
        }

    }

    request.open("GET", "http://localhost:3000/api/furniture");
    request.send();


}

//const number = 123456.789;
//console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// expected output: "123.456,79 €"