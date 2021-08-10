const form = document.querySelector("#setCodeForm");

form.addEventListener("submit", (event) => {
    const section = document.querySelector("#newBooster")
    section.innerHTML = '';
    arr = [];
	event.preventDefault();
	const formData = new FormData(form);
	const code = formData.get("setCode");
	fetch(`https://api.magicthegathering.io/v1/sets/${code}/booster`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Not a valid set");
			}
			return response.json();
		})
		.then((data) => CardsID(data.cards));
});

let arr = [];

async function CardsID(card) {
	let items = [];
	console.log(card.length);
	for (let i = 0; i < card.length; i++) {
		let scry = await fetch(
			`https://api.scryfall.com/cards/multiverse/${card[i].multiverseid}`
		);
		let response = await scry.json();
		items.push(response);
	}
	for (let i = 0; i < items.length; i++) {
		let image = `${items[i].image_uris.normal}`;
		let name = items[i].name;
		let type = items[i].type_line;
		let rarity = items[i].rarity;
		let oracle = items[i].oracle_text;
		let flavor = items[i].flavor_text;
		if (flavor === undefined) {
			flavor = "";
		}
		let price = `$${items[i].prices.usd}`;

		arr.push({ image, name, type, rarity, oracle, flavor, price });
	}
	console.log(arr);
	arr.forEach(createCardUsingTemplate);
}

const booster = document.querySelector("#newBooster");

function createCardUsingTemplate(e) {
	const { image, name, type, rarity, oracle, flavor, price } = e;
	const template = document.querySelector("#template");
	const domFragment = template.content.cloneNode(true);
	let card = domFragment.querySelector("#templateCard");
	card.setAttribute("data-name", `${name}`);
	card.setAttribute("data-price", `${price.replace("$", "")}`);
	card.setAttribute("data-rarity", `${rarityNumerator(rarity)}`);
	domFragment.querySelector("img").src = image;
	domFragment.querySelector("#card_name").textContent = name;
	domFragment.querySelector("#card_type").textContent = type;
	domFragment.querySelector("#card_rarity").textContent = rarity.toUpperCase();
	domFragment.querySelector("#card_oracle").textContent = oracle;
	domFragment.querySelector("#card_flavor").textContent = flavor;
	domFragment.querySelector("#card_price").textContent = price;
	booster.append(domFragment);
}

function rarityNumerator(rarity) {
	switch (rarity) {
		case "common":
			return 0;
		case "uncommon":
			return 1;
		case "rare":
			return 2;
		case "mythic":
			return 3;
	}
}

const sort = document.querySelector("#sort");
const sortForm = document.querySelector("#sortForm");

sortForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let cards = Array.from(document.getElementsByClassName("card"));

	switch (sort.value) {
		case "nameAZ":
			cards.sort((a, b) => {
				let nameA = a.getAttribute("data-name").toUpperCase();
				let nameB = b.getAttribute("data-name").toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
			cards.forEach((e) => booster.appendChild(e));
			break;
		case "priceHiLo":
			cards.sort((a, b) => {
				return b.getAttribute("data-price") - a.getAttribute("data-price");
			});
			cards.forEach((e) => booster.appendChild(e));
			break;
		case "rarityMC":
			cards.sort((a, b) => {
				return b.getAttribute("data-rarity") - a.getAttribute("data-rarity");
			});
			cards.forEach((e) => booster.appendChild(e));
			break;
	}
});
