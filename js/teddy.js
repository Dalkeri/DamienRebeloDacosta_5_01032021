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
    accueil_display(){
        let displayZone = document.getElementById("list-teddies")
        let teddyZone= document.createElement("section");

        let img = document.createElement("img");
        let name = document.createElement("h3");
        let price = document.createElement("p");
        let desc = document.createElement("p");
        let link = document.createElement("a");

        teddyZone.classList.add("teddy");
        img.classList.add("teddy__img");
        name.classList.add("teddy__name")
        price.classList.add("teddy__price");
        desc.classList.add("teddy__desc");
        link.classList.add("teddy__link");

        img.src = this.img;
        img.style.width = "200px";

        name.textContent = this.name;
        price.textContent = this.price/100;
        desc.textContent = this.description;
        link.href="./pages/item.html?id=" + this.id;
        link.textContent = "En savoir plus";

        teddyZone.appendChild(img);
        teddyZone.appendChild(name);
        teddyZone.appendChild(price);
        teddyZone.appendChild(desc);
        teddyZone.appendChild(link);

        displayZone.appendChild(teddyZone);
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
        img.style.width= "200px";

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

        document.getElementsByTagName("BODY")[0].appendChild(displayZone); // on ajoute au body
    }
}