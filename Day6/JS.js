const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data)); //...(spread)로 길이가 1이었던 cities를 길이 1000의 array로 만들어줌 각각의 데이터를 흩뿌려준다고 생각

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    //here we need to figure out if the city or state matches that was searched
    const regex = new RegExp(wordToMatch, "gi"); //RegExp가 뭐야? 정규표현식
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li> 
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
      `;
    })
    .join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("input", displayMatches);
