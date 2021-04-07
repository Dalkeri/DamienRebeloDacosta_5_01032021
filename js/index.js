let serverIssue = document.getElementById("serverIssue");
serverIssue.style.display = "none";

fetch(serverAddress)
  .then(res => {
        console.log(res);
    if(!res.ok){
      throw new Error("Error while retrieving response from server");

    }
    else{
      res.json();
    }
  })
  .then(res => {
    for(let i = 0; i < res.length; i++){
      let teddy = new Teddy(res[i]._id, res[i].name, res[i].price, res[i].description, res[i].colors, res[i].imageUrl);

      teddy.index_display();
      }
    })
  .catch(e => {
    serverIssue.style.display = "block";
    console.log(e)
  })
