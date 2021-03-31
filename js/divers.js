const serverAddress = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
                        ? "http://localhost:3000/api/teddies/"
                        : " https://orinoco-drdc.herokuapp.com/api/teddies/";

let cart = (JSON.parse(localStorage.getItem("OrinocoCartStored")) || [] );
// let badge = document.getElementById("navbarBadge");
let navbarBadge = document.querySelector("#navbarBadge");

updateNavBar();


function handleCents(price){
    let priceString = price.toString();
    return priceString.slice(0, priceString.length-2)+","+priceString.slice(priceString.length-2);
}

function updateNavBar(){
    cart = JSON.parse(localStorage.getItem("OrinocoCartStored") || [] );
    if( cart.length === 0){
        badge.style.display = "none";
    }
    else{
        let count = 0;
        for(let i = 0; i < cart.length; i++){
            count += cart[i].number;
        }
        navbarBadge.innerHTML = count;
        console.log("new navbar", count);
        console.log("cart navbar", cart);
    }

}

