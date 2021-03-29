class Teddy{
    constructor(id, name, price, description, colors, imageUrl){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.colors = colors;
        this.img = imageUrl;
        this.selectedColor = colors[0];

    }
 
    //affichage spécifique à l'accueil
    index_display(){
        let displayZone = document.getElementById("list-teddies");

        let dimensions = document.createElement("div");
        let card = document.createElement("div");
        let imgContainer = document.createElement("div");
        let img = document.createElement("img");
        // let cardTitle = document.createElement("span");
        let cardContentContainer = document.createElement("div");
        let cardContentName = document.createElement("h5");
        let cardContentDesc = document.createElement("p");
        let cardContentPrice = document.createElement("p");
        let cardAction = document.createElement("div");
        let cardLink = document.createElement("a");

        dimensions.classList.add("col", "s12", "m6", "l4");
        card.classList.add("card", "hoverable");
        imgContainer.classList.add("card-image");
        img.classList.add("imageIndex");
        cardContentContainer.classList.add("card-content", "center-align");
        cardContentPrice.classList.add("cardContentPrice");
        cardAction.classList.add("card-action", "center-align");

        img.src = this.img;
        // cardTitle.textContent = this.name;
        cardContentName.textContent = this.name;
        cardContentDesc.textContent = this.description;
        cardContentPrice.textContent = this.handleCents(this.price) + "€";
        cardLink.href="./pages/item.html?id=" + this.id;
        cardLink.textContent = "En savoir plus";

        imgContainer.appendChild(img);
        // imgContainer.appendChild(cardTitle);

        cardContentContainer.appendChild(cardContentName);
        cardContentContainer.appendChild(cardContentDesc);
        cardContentContainer.appendChild(cardContentPrice);

        cardAction.appendChild(cardLink);

        card.appendChild(imgContainer);
        card.appendChild(cardContentContainer);
        card.appendChild(cardAction);
        
        dimensions.appendChild(card);

        displayZone.appendChild(dimensions);
    }

    //affichage spécifique à la page produit
    item_display(){      
        let displayZone = document.getElementById("teddy");

        let img = document.getElementById("teddy__img");
        let name = document.getElementById("teddy__title");
        let price = document.getElementById("teddy__price");
        let description = document.getElementById("teddy__description");
        let colorLabel = document.getElementById("colorsLabel");
        let colorSelect = document.getElementById("colorSelect");
        let orderButton = document.getElementById("order");

        img.src = this.img;
        // img.style.height= "200px";

        name.textContent = this.name;
        price.textContent = this.price/100;
        description.textContent = this.description;

        //on ajoute un Event Listener sur le select pour changer la selectedColor quand on change
        colorSelect.addEventListener('change', () =>{
            this.selectedColor = this.colors[colorSelect.selectedIndex];
        });     
        for(let i=0; i < this.colors.length; i++){
            let colorOption = document.createElement("option");
            colorOption.value = this.colors[i];
            colorOption.textContent = this.colors[i];
            colorSelect.appendChild(colorOption);
        }

        // document.getElementsByTagName("BODY")[0].appendChild(displayZone); // on ajoute au body
    }

    handleCents(price){
        let priceString = price.toString();
        return priceString.slice(0, priceString.length-2)+","+priceString.slice(priceString.length-2);
    }
}