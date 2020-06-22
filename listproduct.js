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
                console.log(response[i].imageUrl);
                element.innerHTML = 
                "<div class='row'>" +
                    "<div class='col-12 col-lg-4'>" +
                        "<div class='card'>" +
                            "<div class='card-body'>" +
                                "<h2 class='card-title'>"+ response[i].name +"</h2>" +
                                "<p class='card-text'>"+ response[i].price +" Euros</p>" + 
                                "<img width='40' height='30' alt='vintage chair'>" + response[i].image +
                                "<a href='' class='btn btn-dark'>Voir le détail du produit 1</a>" +
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