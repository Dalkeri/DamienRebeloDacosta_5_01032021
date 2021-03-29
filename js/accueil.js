const serverAddress = "http://localhost:3000/api/teddies/";
 
fetch(serverAddress)
  .then(res => res.json())
  .then(res => {
    for(let i = 0; i < res.length; i++){
      let teddy = new Teddy(res[i]._id, res[i].name, res[i].price, res[i].description, res[i].colors, res[i].imageUrl);

      teddy.index_display(); // ajouter displayZOne en param
    }
  });