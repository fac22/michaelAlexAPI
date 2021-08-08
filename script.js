// Linking both APIs through the multiverse id
const sets = (code) => fetch(`https://api.magicthegathering.io/v1/sets/${code}/booster`)
.then((response) => {
    if(!response.ok) {
        throw new Error("Not a valid set")
    }
    return response.json();
})
.then((data) => CardsID(data.cards))



const booster = document.querySelector("#newBooster");
const CardsID = (card) => {
    console.log(card.length)
    card.forEach(e => {
        fetch(`https://api.scryfall.com/cards/multiverse/${e.multiverseid}`)
        .then(response => response.json())
        // .then((deck) => console.log(deck))
        .then((card) => {
            console.log(card)
            const image = document.createElement("img");
            image.src = `${card.image_uris.normal}`;
            image.alt = "";

            const name = document.createElement("h2");
            name.innerHTML = card.name.bold();

            const type = document.createElement("h3");
            type.innerHTML = card.type_line.bold();

            const oracle = document.createElement("p");
            oracle.textContent = card.oracle_text;

            const flavor = document.createElement("p");
            flavor.innerHTML = card.flavor_text.italics();

            const price = document.createElement("p");
            price.textContent = `$${card.prices.usd}`;
            
            booster.append(image, name, type, oracle, flavor, price);
        })
        .catch((console.error));

        
    })
    
}





function createCardUsingTemplate(newCard){
    const { name, type, oracle, flavor, price } = newCard;
    const template = document.querySelector("#template");
    const domFragment = template.content.cloneNode(true);
    domFragment.querySelector("#card_name").textContent = name;
    domFragment.querySelector("#card_type").textContent = type;
    domFragment.querySelector("#card_oracle").textContent = oracle;
    domFragment.querySelector("#card_flavor").textContent = flavor;
    domFragment.querySelector("#card_price").textContent = price;

    booster.appendChild(domFragment);
}



sets("dom");
