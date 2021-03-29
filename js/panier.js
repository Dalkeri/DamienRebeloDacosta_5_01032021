let cartArray = document.querySelector("table");
// let buttonValidate = document.getElementsByClassName("validation");

let totalPrice;
let totalPriceDisplay = document.getElementById("totalPrice");
// console.log(totalPriceDisplay);

let validation = document.getElementsByClassName("validation");
let form = document.querySelector("form");

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

    if(item != undefined){
        
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
    }
    else{
        priceU.textContent = "TOTAL : ";
        priceT.textContent = totalPrice + "€";
    }

    line.appendChild(nameCell);
    line.appendChild(colorCell);
    line.appendChild(numberCell);
    line.appendChild(priceUCell);
    line.appendChild(priceTCell);
    line.appendChild(supprCell);

    // cartArray.appendChild(line); 
    
    numberLess.addEventListener('click', () =>{
        if(item.number > 1){
            item.number --;
            localStorage.setItem("cartStored", JSON.stringify(cart));
            drawCart();
            // console.log(item);
        }
    }); 
        
    numberMore.addEventListener('click', () =>{
        item.number ++;
        localStorage.setItem("cartStored", JSON.stringify(cart));
        drawCart();
        // console.log(item);
    }); 

    supprItem.addEventListener('click', () =>{
        cart.splice(index, 1);
        localStorage.setItem("cartStored", JSON.stringify(cart));
        drawCart();
        console.log("suppr item");
        console.log(cart);
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
    .then(res => console.log(res)) //noms plus parlant
    .catch(e => console.log(e));
}

// document.querySelector



// hidePage[0].addEventListener("click", () => {
//   console.log("click hidePage");
//   form.style.display = "none";
//   hidePage[0].style.display= "none";
// });

// buttonValidate[0].addEventListener("click", () => {
//     // hidePage[0].style.display = "block";
//     form.style.display = "block";
// });

// form.addEventListener("submit", function (evt) {
//     evt.preventDefault();
//     console.log("coucou");
//     getDatas();
//     // window.location.href = "confirmation.html";
//     // return false; 
// });

// form prevent default