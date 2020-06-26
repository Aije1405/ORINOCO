<<<<<<< HEAD
callApi(request, ID);

=======
>>>>>>> Staging
window.onload = function () 
{
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () 
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        {
            let response = JSON.parse(this.responseText);
<<<<<<< HEAD
        }
    }
}

=======
            let element = document.getElementById('panier');
                
            
        }

    }

    const QUERYSTRING = window.location.search;
    
    const URLPARAMETERS = new URLSearchParams(QUERYSTRING);
    const ID = URLPARAMETERS.get('id');

    request.open("GET", "http://localhost:3000/api/furniture/" + ID);
    request.send();


}
>>>>>>> Staging

