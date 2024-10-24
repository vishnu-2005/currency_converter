const button = document.querySelector("#btn");
const input = document.querySelector("#input");
const from = document.querySelector("#from_out");
const to = document.querySelector("#to_out");
let data = {};
const select = document.querySelectorAll("select");

for (let a of select) {
  for (let codes in countryList) {
    let op = document.createElement("option");
    op.value = codes;
    op.innerText = codes;
    a.append(op);
    if (a.name === "from" && codes === "USD") {
      op.selected = "selected";
    }
    if (a.name === "to" && codes === "INR") {
      op.selected = "selected";
    }
  }
}

select[0].addEventListener("change", (event) => {
  from.childNodes[1].src = `https://flagsapi.com/${countryList[event.target.value]}/flat/64.png`;
});

select[1].addEventListener("change", (event) => {
  to.childNodes[1].src = `https://flagsapi.com/${countryList[event.target.value]}/flat/64.png`;
});

button.addEventListener("click", (evt) => {
  evt.preventDefault();
  currency();
});

(async function fetchExchangeRates() {
  const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
  let response = await fetch(url);
  data = await response.json();

  document.querySelector("#msg").innerText = `1 USD = ${(1 * data["eur"]["inr"]) / data["eur"]["usd"]} INR`;
})();

function currency() {
  let X = data["eur"][select[0].value.toLowerCase()];
  let Y = data["eur"][select[1].value.toLowerCase()];
  let A = input.value;
  let B = (A * Y) / X;
  document.querySelector("#msg").innerText = `${A} ${select[0].value} = ${B} ${select[1].value}`;
  input.value = 1;
}
