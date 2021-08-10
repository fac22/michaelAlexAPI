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

async function CardsID(card) {
    let items = [];
    console.log(card.length)
    for(let i = 0; i < card.length; i++){
        let scry = await fetch(`https://api.scryfall.com/cards/multiverse/${card[i].multiverseid}`)
        let response = await scry.json();
        items.push(response);
    }
    for(let i = 0; i < items.length; i++){
        let image = `${items[i].image_uris.normal}`;
        let name = items[i].name;
        let type = items[i].type_line;
        let rarity = items[i].rarity;
        let oracle = items[i].oracle_text;
        let flavor = items[i].flavor_text;
        if(flavor === undefined){
            flavor = "";
        }
        let price = `$${items[i].prices.usd}`;

        arr.push({image, name, type, rarity, oracle, flavor, price})
    }
    console.log(arr)
    arr.forEach(createCardUsingTemplate);
}

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


