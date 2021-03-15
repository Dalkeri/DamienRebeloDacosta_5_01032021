let params = new URL(document.location).searchParams;
let idProduit = params.get('id');

let teddy;
let quantity = 1;


fetch("http://localhost:3000/api/teddies/"+idProduit)
.then(res => res.json())
.then(res => {
  teddy = new Teddy(res._id, res.name, res.price, res.description, res.colors, res.imageUrl);

  // console.log(teddy);
  teddy.item_display();

});




let buttonOrder = document.getElementById('order');
buttonOrder.addEventListener("click", () =>{
  let cartArray = (JSON.parse(localStorage.getItem("cartStored")) || [] );
  // let cartArray = localStorage.getItem("cartStored");

  let newItem = new cartItem(teddy.id, teddy.selectedColor, teddy.img, teddy.name, teddy.price, quantity);

  let alreadyIn = cartArray.findIndex( (item => item.id === newItem.id) && (item => item.color === newItem.color));
      
  if(alreadyIn == -1){
    cartArray.push(newItem);
  }
  else{
    cartArray[alreadyIn].number += quantity;
  }

  localStorage.setItem("cartStored", JSON.stringify(cartArray));
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