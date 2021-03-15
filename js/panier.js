
let cartItem = (JSON.parse(localStorage.getItem("cartStored")) || [] );

let cartArray = document.getElementsByClassName("cartArray");
let buttonValidate = document.getElementsByClassName("validation");
let totalPrice;

let hidePage = document.getElementsByClassName("hidePage");
let validation = document.getElementsByClassName("validation");
let form = document.querySelector("form");

// console.log(cartItem);
drawCart();


function drawCart(){
    cartArray[0].innerHTML = '';

    if (cartItem.length > 0){
        totalPrice = 0;

        let headerTable = document.createElement("tr");
        let imgHead = document.createElement("th");
        let nameHead = document.createElement("th");
        let colorHead = document.createElement("th");
        let numberHead = document.createElement("th");
        let priceUHead = document.createElement("th");
        let priceTHead = document.createElement("th");
        let deleteItem = document.createElement("th");
        
        imgHead.textContent = "Photo";
        nameHead.textContent = "Nom";
        colorHead.textContent = "Couleur";
        numberHead.textContent = "Quantitée";
        priceUHead.textContent = "Prix unitaire";
        priceTHead.textContent = "Prix total";
        deleteItem.textContent = "Suppression";
        
        headerTable.appendChild(imgHead);
        headerTable.appendChild(nameHead);
        headerTable.appendChild(colorHead);
        headerTable.appendChild(numberHead);
        headerTable.appendChild(priceUHead);
        headerTable.appendChild(priceTHead);
        headerTable.appendChild(deleteItem);

        cartArray[0].appendChild(headerTable);

        for(let i = 0; i <= cartItem.length; i++){
            drawLine(cartItem[i], i);
        }

        buttonValidate[0].style.display = "block";
    }
    else{
        let empty = document.getElementById("empty");
        empty.style.display = "block";
    }
}

function drawLine(item, i){
    let index = i;
    let line = document.createElement("tr");

    let imgCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let colorCell = document.createElement("td");
    let numberCell = document.createElement("td");
    let priceUCell = document.createElement("td");
    let priceTCell = document.createElement("td");
    let supprCell = document.createElement("td");

    let img = document.createElement("img");
    let name = document.createElement("p");
    let color = document.createElement("p");
    let numberLess = document.createElement("button");
    let number = document.createElement("p");
    let numberMore = document.createElement("button");
    let priceU = document.createElement("p");
    let priceT = document.createElement("p");
    let supprItem = document.createElement("i");

    if(item != undefined){
        img.src = item.img;
        img.style.width = "200px";

        name.textContent = item.name;
        color.textContent = item.color;

        numberLess.textContent = "-";
        number.textContent = item.number;
        numberMore.textContent = "+";
        numberLess.classList.add("quantityButton");
        number.classList.add("quantity");
        numberMore.classList.add("quantityButton");

        priceU.textContent = item.price/100 + "€";
        priceT.textContent = item.price/100 * item.number;

        totalPrice += item.price/100 * item.number;

        supprItem.classList.add("fas");
        supprItem.classList.add("fa-trash-alt");

        imgCell.appendChild(img);
        nameCell.appendChild(name);
        colorCell.appendChild(color);
        numberCell.appendChild(numberLess);
        numberCell.appendChild(number);
        numberCell.appendChild(numberMore);
        supprCell.appendChild(supprItem);
    }
    else{
        priceU.textContent = "TOTAL : ";
        priceT.textContent = totalPrice;
    }

    priceUCell.appendChild(priceU);
    priceTCell.appendChild(priceT);

    line.appendChild(imgCell);
    line.appendChild(nameCell);
    line.appendChild(colorCell);
    line.appendChild(numberCell);
    line.appendChild(priceUCell);
    line.appendChild(priceTCell);
    line.appendChild(supprCell);

    cartArray[0].appendChild(line); 
        
    numberLess.addEventListener('click', () =>{
        if(item.number > 1){
            item.number --;
            localStorage.setItem("cartStored", JSON.stringify(cartItem));
            drawCart();
            // console.log(item);
        }
    }); 
        
    numberMore.addEventListener('click', () =>{
        item.number ++;
        localStorage.setItem("cartStored", JSON.stringify(cartItem));
        drawCart();
        // console.log(item);
    }); 

    supprItem.addEventListener('click', () =>{
        cartItem.splice(index, 1);
        localStorage.setItem("cartStored", JSON.stringify(cartItem));
        drawCart();
        console.log("suppr item");
        console.log(cartItem);
    })
}

function getDatas(){
    let products = [];
    for(let i = 0; i < cartItem.length; i++){
        if(!products.includes(cartItem[i].id)){
            products.push(cartItem[i].id);
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

    
    console.log(contact);
    console.log(products);
}

// document.querySelector



hidePage[0].addEventListener("click", () => {
  console.log("click hidePage");
  form.style.display = "none";
  hidePage[0].style.display= "none";
});

validation[0].addEventListener("click", () => {
    hidePage[0].style.display = "block";
    form.style.display = "block";
});

form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("coucou");
    getDatas();
    // window.location.href = "confirmation.html";
    // return false; 
});
// form prevent default