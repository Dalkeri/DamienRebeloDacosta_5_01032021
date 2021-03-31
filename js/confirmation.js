let orderConfirmation = (JSON.parse(localStorage.getItem("OrinocoOrderConfirmation")) || [] );
let orderId = document.getElementById("orderId");

orderId.textContent = orderConfirmation.orderId;
