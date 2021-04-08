const serverAddress = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
                    ? "http://localhost:3000/api/teddies/"
                    : "https://ab-p5-api.herokuapp.com/api/teddies";
                    // : " https://orinoco-drdc.herokuapp.com/api/teddies/";

let cart = (JSON.parse(localStorage.getItem("OrinocoCartStored")) || [] );
let navbarBadge = document.getElementById("navbarBadge");

updateNavBar();

function handleCents(price){
    if(Number.isNaN(price)) return "00,00";
    let priceString = price.toString();
    return priceString.slice(0, priceString.length-2)+","+priceString.slice(priceString.length-2);
}

function updateNavBar(){
    cart = (JSON.parse(localStorage.getItem("OrinocoCartStored")) || [] );

    if( cart.length === 0){
        navbarBadge.style.display = "none";
    }
    else{
        let count = 0;
        for(let i = 0; i < cart.length; i++){
            count += cart[i].number;
        }
        navbarBadge.innerHTML = count;
        navbarBadge.style.display = "inline-block";
    }
}

