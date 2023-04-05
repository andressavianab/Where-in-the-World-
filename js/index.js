const endPointAPI = "data.json";

const input = document.querySelector("#input");
const filter = document.querySelector("#filter");

const rowCards = document.querySelector("#row-cards");

getapi();

async function getapi() {
  const answer = await fetch(endPointAPI);
  const countries = await answer.json();

  cardRow(countries);

  filter.addEventListener("change", (e) => {
    if (e.target.value === "Africa") {
      clearRowCards();
      cardRow(filterByRegion(countries, "Africa"));
    } else if (e.target.value === "America") {
      clearRowCards();
      cardRow(filterByRegion(countries, "Americas"));
    } else if (e.target.value === "Asia") {
      clearRowCards();
      cardRow(filterByRegion(countries, "Asia"));
    } else if (e.target.value === "Europe") {
      clearRowCards();
      cardRow(filterByRegion(countries, "Europe"));
    } else if (e.target.value === "Oceania") {
      clearRowCards();
      cardRow(filterByRegion(countries, "Oceania"));
    }
  });

  input.addEventListener("input", () => {
    clearRowCards();

    const filterBySearch = countries.filter((countrie) => {
      return countrie.name.toLowerCase().includes(input.value.toLowerCase());
    });

    cardRow(filterBySearch);
  });
}

function filterByRegion(arr, region) {
  return arr.filter((object) => {
    return object.region === region;
  });
}

function cardRow(arr) {
  arr.forEach((countrie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                <img src="${countrie.flags.svg}" alt="" width="100%">
                <div class="card-texts">
                    <h4>${countrie.name}</h4>
                    <span><strong>Population:</strong> ${countrie.population}</span>
                    <span><strong>Region:</strong> ${countrie.region}</span>
                    <span><strong>Capital:</strong> ${countrie.capital}</span>
                </div>    
        `;
    rowCards.appendChild(card);
  });
}

function clearRowCards() {
  rowCards.innerHTML = "";
}
