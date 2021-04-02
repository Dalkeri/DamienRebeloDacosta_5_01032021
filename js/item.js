let params = new URL(document.location).searchParams;
let idProduit = params.get('id');

let fetchSuccess = document.getElementById("fetchSuccess");
let fetchFail = document.getElementById("fetchFail");
fetchFail.style.display = "none";

let addedToCart = document.getElementById("addedToCart");
addedToCart.style.display = "none";

let teddy;
let quantity = 1;

let buttonOrder = document.getElementById('order');

fetch(serverAddress + idProduit)
.then(res => res.json())
.then(res => {
  teddy = new Teddy(res._id, res.name, res.price, res.description, res.colors, res.imageUrl);
  teddy.item_display();
})
.catch(e => {
  console.log("error", e)
  fetchError();
});

function fetchError(){
  fetchSuccess.style.display = "none";
  fetchFail.style.display = "block";
}

buttonOrder.addEventListener("click", () =>{
  let cartArray = (JSON.parse(localStorage.getItem("OrinocoCartStored")) || [] );

  let newItem = {
    id : teddy.id,
    color : teddy.selectedColor,
    name : teddy.name,
    price : teddy.price,
    number : quantity
  }

  let alreadyIn = cartArray.findIndex( (item => item.id === newItem.id) && (item => item.color === newItem.color));
      
  if(alreadyIn == -1){
    cartArray.push(newItem);
  }
  else{
    cartArray[alreadyIn].number += quantity;
  }
  localStorage.setItem("OrinocoCartStored", JSON.stringify(cartArray));

  updateNavBar();
  
  addedToCart.style.display = "block";
  setTimeout(() => {
    addedToCart.style.display = "none";
  }, 1000);
})

let buttonLess = document.getElementById('quantity_less');
buttonLess.addEventListener("click", () =>{
  if(quantity > 1){
    quantity--;
    document.getElementById("quantity_label").textContent = quantity;
  } 
});

let buttonMore = document.getElementById('quantity_more');
buttonMore.addEventListener("click", () =>{
  quantity++;
  document.getElementById("quantity_label").innerHTML = quantity;
});