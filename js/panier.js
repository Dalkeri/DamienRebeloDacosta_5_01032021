let cartArray = document.getElementById("table");
let buttonConfirmCart = document.getElementById("confirmCart");
let formContainer = document.getElementById("formContainer");
formContainer.style.display = "none";

let errorRes = document.getElementById("errorRes");
errorRes.style.display = "none";

let buttonConfirmOrder = document.getElementById("order");

let totalPrice;
let totalPriceDisplay = document.getElementById("totalPrice");

let validationContainer = document.getElementById("validationContainer");
let tableContainer = document.getElementById("tableContainer");
let title = document.getElementById("title");

drawCart();

function drawCart(){
    cartArray.innerHTML = '';
    
    if (cart.length > 0){
        totalPrice = 0;

        let headerTable = document.createElement("thead");
        let nameHead = document.createElement("th");
        let colorHead = document.createElement("th");
        let numberHead = document.createElement("th");
        let priceUHead = document.createElement("th");
        let priceTHead = document.createElement("th");
        let deleteItem = document.createElement("th");

        nameHead.classList.add("center-align");
        colorHead.classList.add("center-align");
        numberHead.classList.add("center-align");
        priceUHead.classList.add("center-align");
        priceTHead.classList.add("center-align");
        deleteItem.classList.add("center-align");

        nameHead.textContent = "Nom";
        colorHead.textContent = "Couleur";
        numberHead.textContent = "Quantitée";
        priceUHead.textContent = "Prix unitaire";
        priceTHead.textContent = "Prix total";
        deleteItem.textContent = "Suppression";
        
        headerTable.appendChild(nameHead);
        headerTable.appendChild(colorHead);
        headerTable.appendChild(numberHead);
        headerTable.appendChild(priceUHead);
        headerTable.appendChild(priceTHead);
        headerTable.appendChild(deleteItem);

        cartArray.appendChild(headerTable);

        let body = document.createElement("tbody");
        for(let i = 0; i < cart.length; i++){
            body.appendChild(drawLine(cart[i], i));
            totalPrice += cart[i].price * cart[i].number;
        }

        cartArray.appendChild(body);
        totalPriceDisplay.textContent = handleCents(totalPrice) +"€";
    }
    else{
        let empty = document.getElementById("empty");
        validationContainer.style.display = "none";

        empty.style.display = "block";
    }
}

function drawLine(item, i){
    let index = i;
    let line = document.createElement("tr");

    let nameCell = document.createElement("td");
    let colorCell = document.createElement("td");
    let numberCell = document.createElement("td");
    let priceUCell = document.createElement("td");
    let priceTCell = document.createElement("td");
    let supprCell = document.createElement("td");

    let numberLess = document.createElement("button");
    let number = document.createElement("p");
    let numberMore = document.createElement("button");
    let supprItem = document.createElement("i");
        
    nameCell.textContent = item.name;
    colorCell.textContent = item.color;

    numberLess.textContent = "-";
    number.textContent = item.number;
    numberMore.textContent = "+";
    numberLess.classList.add("quantityButton");
    number.classList.add("quantity");
    numberMore.classList.add("quantityButton");

    priceUCell.textContent = handleCents(item.price) + "€";
    priceTCell.textContent = handleCents(item.price * item.number) + "€";

    supprItem.classList.add("fas");
    supprItem.classList.add("fa-trash-alt");

    numberCell.appendChild(numberLess);
    numberCell.appendChild(number);
    numberCell.appendChild(numberMore);
    supprCell.appendChild(supprItem);

    line.appendChild(nameCell);
    line.appendChild(colorCell);
    line.appendChild(numberCell);
    line.appendChild(priceUCell);
    line.appendChild(priceTCell);
    line.appendChild(supprCell);
    
    numberLess.addEventListener('click', () =>{
        console.log("clic", item.number);
        if(item.number > 1){
            cart[i].number --;
            localStorage.setItem("OrinocoCartStored", JSON.stringify(cart));
            drawCart();
            updateNavBar();
        }
    }); 
        
    numberMore.addEventListener('click', () =>{
        cart[i].number ++;
        localStorage.setItem("OrinocoCartStored", JSON.stringify(cart));
        drawCart();
        updateNavBar();
    }); 

    supprItem.addEventListener('click', () =>{
        cart.splice(index, 1);
        localStorage.setItem("OrinocoCartStored", JSON.stringify(cart));
        drawCart();
        updateNavBar();
    })
    return line;
}

function getDatas(){
    let products = [];
    for(let i = 0; i < cart.length; i++){
        for(let j = 0; j < cart[i].number; j++){
            products.push(cart[i].id);
        }
    }

    let firstName = document.getElementById("form__firstName").value;
    let lastName = document.getElementById("form__lastName").value;
    let address = document.getElementById("form__address").value;
    let city = document.getElementById("form__city").value;
    let email = document.getElementById("form__email").value;
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    }
    //si le tableau de produits est nul, on lance l'erreur et on fais pas le sendOrder (on ve lance pas une commande sans produits)
    if(products.length == 0){
        handleError();
        return null;
    }
    sendOrder({contact, products});
}

function sendOrder(data){
    fetch( serverAddress + "order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => { 
        // console.log("res", res);
        if(!res.ok){
            throw new Error("Error while retrieving response from server");
        }
        else{
            return res.json();
        }
    })
    .then(res => {
        localStorage.setItem("OrinocoOrderConfirmation", JSON.stringify(res));
        localStorage.setItem('OrinocoCartStored', JSON.stringify([]));
        window.location.href = "confirmation.html";
    })
    .catch(e => {
        handleError();
        console.log(e);
    });
}

function handleError(){
    errorRes.style.display = "block";
    formContainer.style.display = "none";
    validationContainer.style.display = "none";
    tableContainer.style.display = "none";
    title.style.display = "none";
}

buttonConfirmCart.addEventListener("click", () => {
    //console.log("validation du panier");
    formContainer.style.display = "block";
});

formContainer.addEventListener("submit", evt => {
    evt.preventDefault();
    getDatas();
});
