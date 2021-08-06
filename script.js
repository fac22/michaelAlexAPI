
const sets = (code) => fetch(`https://api.magicthegathering.io/v1/sets/${code}/booster`)
.then((response) => response.json())
.then((data) => CardsID(data.cards))

const arr = [];
const CardsID = (card) => {
    card.forEach(e => {
        fetch(`https://api.scryfall.com/cards/multiverse/${e.multiverseid}`).then(response => response.json()).then((deck) => console.log(deck)).catch((console.error));

    })
}

// const CardsID = card => {
//     const cards = document.querySelector("#new-div");
//     card.forEach(e => {
//         const id = document.createElement("p");
//         id.innerText = `${e.id}`;
//         cards.append(id)
//     })
// }


sets("ktk");
console.log(arr)
// sets("ktk").then((deck) => console.log(deck)).catch((console.error));
// console.log(setTimeout(id1, 5000))
// const getCards = (card) => fetch(`https://api.scryfall.com/cards/${sets(code.cards[0].id)}`).then((response) => response.json())
// console.log(getCards(sets("dom")))
// fetch(`https://api.magicthegathering.io/v1/sets/${sky}/`)
// .then((response) => response.json())
// .then((data) => console.log(data));


//fetch(`https://api.scryfall.com/cards/multiverse/${arr[0]}`).then((response) => (response.json));