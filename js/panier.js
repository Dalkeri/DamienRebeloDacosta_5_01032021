let cartArray = document.querySelector("table");
let buttonConfirmCart = document.querySelector(".confirmCart");
let formContainer = document.querySelector(".formContainer");

let buttonConfirmOrder = document.querySelector(".order");

let totalPrice;
let totalPriceDisplay = document.getElementById("totalPrice");

let validation = document.getElementsByClassName("validation");
// let form = document.querySelector("form");

// console.log(cart);
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

        // headerTable.classList.add("center-align");
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
        // buttonValidate[0].style.display = "block";
        totalPriceDisplay.textContent = handleCents(totalPrice) +"€";
    }
    else{
        let empty = document.getElementById("empty");
        let validationContainer = document.getElementById("validationContainer")
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

    // if(item != undefined){
        
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
    // }
    // else{
    //     priceU.textContent = "TOTAL : ";
    //     priceT.textContent = totalPrice + "€";
    // }

    line.appendChild(nameCell);
    line.appendChild(colorCell);
    line.appendChild(numberCell);
    line.appendChild(priceUCell);
    line.appendChild(priceTCell);
    line.appendChild(supprCell);

    // cartArray.appendChild(line); 
    
    numberLess.addEventListener('click', () =>{
        console.log("clic", item.number);
        if(item.number > 1){
            cart[i].number --;
            // console.log("-", item.number);
            localStorage.setItem("OrinocoCartStored", JSON.stringify(cart));
            drawCart();
            updateNavBar();
        }
    }); 
        
    numberMore.addEventListener('click', () =>{
        // console.log("clic", item.number);

        cart[i].number ++;
        // console.log("+", item.number);
        // console.log("++", cart);
        localStorage.setItem("OrinocoCartStored", JSON.stringify(cart));
        // console.log(cart);
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
        if(!products.includes(cart[i].id)){
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
    sendOrder({contact, products});
}

function sendOrder(data){
    fetch( serverAddress + "order", {
        method: 'POST',
        // mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        localStorage.setItem("OrinocoOrderConfirmation", JSON.stringify(res));
        localStorage.setItem('OrinocoCartStored', JSON.stringify([]));
        window.location.href = "confirmation.html";
    })
    .catch(e => console.log(e));
}

// document.querySelector

buttonConfirmCart.addEventListener("click", () => {
    console.log("validation du panier");
    formContainer.style.display = "block";
});

formContainer.addEventListener("submit", evt => {
    evt.preventDefault();
    console.log("coucou");
    getDatas();
    // return false; 
});

