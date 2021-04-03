let orderConfirmation = (JSON.parse(localStorage.getItem("OrinocoOrderConfirmation")) || [] );
let orderId = document.getElementById("orderId");
let OrinocoOrderConfirmationFound = document.getElementById("OrinocoOrderConfirmationFound");
let OrinocoOrderConfirmationNotFound = document.getElementById("OrinocoOrderConfirmationNotFound");
OrinocoOrderConfirmationNotFound.style.display = "none";

orderId.textContent = orderConfirmation.orderId;

//si on va sur la page de confirmation sans localstorage de la réponse du serveur
if(orderConfirmation.length == 0){
    OrinocoOrderConfirmationNotFound.style.display = "block";
    OrinocoOrderConfirmationFound.style.display = "none";
}
