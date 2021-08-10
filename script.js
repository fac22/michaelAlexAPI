const form = document.querySelector("#setCodeForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const code = formData.get("setCode");
    fetch(`https://api.magicthegathering.io/v1/sets/${code}/booster`)
        .then((response) => {
            if(!response.ok) {
                throw new Error("Not a valid set")
            }
            return response.json();
        })
        .then((data) => CardsID(data.cards))

})


let arr = [];

const CardsID = (card) => {
    console.log(card.length)
    card.forEach(e => {
        fetch(`https://api.scryfall.com/cards/multiverse/${e.multiverseid}`)
        .then(response => response.json())
        // .then((deck) => console.log(deck))
        .then((card) => {
            //output[card] = card.name.bold();
            console.log(card)
            // const image = document.createElement("img");
            // image.src = `${card.image_uris.normal}`;
            // image.alt = "";
            // let source = `${card.image_uris.normal}`;

            // const name = document.createElement("h2");
            // name.innerHTML = card.name.bold();

            // const type = document.createElement("h3");
            // type.innerHTML = card.type_line.bold();

            // const rarity = document.createElement("h4");
            // rarity.innerHTML = card.rarity.bold();
            // console.log(card.rarity)

            // const oracle = document.createElement("p");
            // oracle.textContent = card.oracle_text;

            // const flavor = document.createElement("p");
            // flavor.innerHTML = card.flavor_text.italics();

            // const price = document.createElement("p");
            // price.textContent = `$${card.prices.usd}`;
            let image = `${card.image_uris.normal}`
            let name = card.name;
            let type = card.type_line;
            let rarity = card.rarity;
            let oracle = card.oracle_text;
            let flavor = card.flavor_text;
            if(flavor === undefined){
                flavor = "";
            }
            let price = `$${card.prices.usd}`;
            
            // booster.append(image, name, type, rarity, oracle, flavor, price);
            arr.push({image, name, type, rarity, oracle, flavor, price});
            
        })
        .catch((console.error));
        
        
    })
    arr.forEach(createCardUsingTemplate);
}
console.log(arr);


const booster = document.querySelector("#newBooster");

function createCardUsingTemplate(e){
        const { image, name, type, rarity, oracle, flavor, price } = e;
        const template = document.querySelector("#template");
        const domFragment = template.content.cloneNode(true);
        domFragment.querySelector("img").src = image;
        domFragment.querySelector("#card_name").textContent = name;
        domFragment.querySelector("#card_type").textContent = type;
        domFragment.querySelector("#card_rarity").textContent = rarity.toUpperCase();
        domFragment.querySelector("#card_oracle").textContent = oracle;
        domFragment.querySelector("#card_flavor i").textContent = flavor;
        domFragment.querySelector("#card_price").textContent = price;
        booster.append(domFragment);
}


