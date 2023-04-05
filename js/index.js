const endPointAPI = "data.json";

const input = document.querySelector("#input");
const filter = document.querySelector("#filter");

const rowCards = document.querySelector("#row-cards");

async function getapi() {
  const answer = await fetch(endPointAPI);
  const countries = await answer.json();

  cardRow(countries);

  filter.addEventListener("change", (e) => {
    if (e.target.value === "Africa") {
      rowCards.innerHTML = "";
      cardRow(filterByRegion(countries, "Africa"));
    } else if (e.target.value === "America") {
      rowCards.innerHTML = "";
      cardRow(filterByRegion(countries, "Americas"));
    } else if (e.target.value === "Asia") {
      rowCards.innerHTML = "";
      cardRow(filterByRegion(countries, "Asia"));
    } else if (e.target.value === "Europe") {
      rowCards.innerHTML = "";
      cardRow(filterByRegion(countries, "Europe"));
    } else if (e.target.value === "Oceania") {
      rowCards.innerHTML = "";
      cardRow(filterByRegion(countries, "Oceania"));
    }
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

getapi();
