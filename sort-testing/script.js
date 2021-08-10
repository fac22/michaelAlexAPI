// sort code

const sort = document.querySelector("#sort");
const sortForm = document.querySelector("#sortForm");
const sortTestArea = document.querySelector("#sort-test");

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
			cards.forEach((e) => sortTestArea.appendChild(e));
			break;
		case "priceHiLo":
			cards.sort((a, b) => {
				return b.getAttribute("data-price") - a.getAttribute("data-price");
			});
			cards.forEach((e) => sortTestArea.appendChild(e));
			break;
		case "rarityMC":
			cards.sort((a, b) => {
				return b.getAttribute("data-rarity") - a.getAttribute("data-rarity");
			});
			cards.forEach((e) => sortTestArea.appendChild(e));
			break;
	}

	console.log(cards);
});
