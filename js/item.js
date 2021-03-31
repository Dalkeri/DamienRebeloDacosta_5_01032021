let params = new URL(document.location).searchParams;
let idProduit = params.get('id');

let itemGet = document.getElementById("itemGet");
let itemNotGet = document.getElementById("itemNotGet");
itemNotGet.style.display = "none";

let teddy;
let quantity = 1;

let buttonOrder = document.getElementById('order');


fetch(serverAddress + idProduit)
.then(res => res.json())
.then(res => {
  teddy = new Teddy(res._id, res.name, res.price, res.description, res.colors, res.imageUrl);
  // console.log(teddy);
  teddy.item_display();
})
.catch(e => {
  console.log("error", e)
  fetchError();
});

function fetchError(){
  itemGet.style.display = "none";
  itemNotGet.style.display = "block";
}

buttonOrder.addEventListener("click", () =>{
  let cartArray = (JSON.parse(localStorage.getItem("OrinocoCartStored")) || [] );

  //facultatif ?
  let newItem = new cartItem(teddy.id, teddy.selectedColor, teddy.img, teddy.name, teddy.price, quantity);

  let alreadyIn = cartArray.findIndex( (item => item.id === newItem.id) && (item => item.color === newItem.color));
      
  if(alreadyIn == -1){
    cartArray.push(newItem);
  }
  else{
    cartArray[alreadyIn].number += quantity;
  }
  // console.log("cartArray item.js", JSON.stringify(cartArray));
  localStorage.setItem("OrinocoCartStored", JSON.stringify(cartArray));

  updateNavBar();
  // console.log("coucou");
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