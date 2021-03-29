const serverAddress = "http://localhost:3000/api/teddies/";
let cart = (JSON.parse(localStorage.getItem("cartStored")) || [] );
let badge = document.getElementById("navbarBadge");
// console.log(cart.length);
// console.log(badge);


if( cart.length === 0){
    badge.style.display = "none";
}
else{
    let count = 0;
    for(let i = 0; i < cart.length; i++){
        count += cart[i].number;
    }
    badge.innerHTML = count;
}

function handleCents(price){
    let priceString = price.toString();
    return priceString.slice(0, priceString.length-2)+","+priceString.slice(priceString.length-2);
}

