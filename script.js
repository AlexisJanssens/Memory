const cards = [
  { number: 0, name: "Jeremy", url: "" },
  { number: 1, name: "Nicolas", url: "" },
  { number: 2, name: "Thomas", url: "" },
  { number: 3, name: "Pauline", url: "" },
  { number: 4, name: "Sam", url: "" },
  { number: 5, name: "Alexis", url: "" },
  { number: 6, name: "Maude", url: "" },
  { number: 7, name: "Julie", url: "" },
  { number: 8, name: "Rodrigue", url: "" },
  { number: 9, name: "Bastien", url: "" },
  { number: 10, name: "Drillon", url: "" },
  { number: 11, name: "Chris", url: "" },
  { number: 12, name: "Sabrina", url: "" },
  { number: 13, name: "Marc", url: "" },
];
console.log(cards);
let deck = [];

function getCards(maxCards) {
  for (let i = 0; i < maxCards / 2; i++) {
    let randomInt = Math.floor(Math.random() * (cards.length + 1));
    if (deck.find((element) => element.number == randomInt)) {
      i--;
    } else {
      deck.push(randomInt);
      deck.push(randomInt);
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function distribute() {
  for (let card of deck) {
    let cardContent = document.createElement("div");
    cardContent.className = card;
    cardContent.classList.add("card");
    table.appendChild(cardContent);
    console.log("voici la " + card + " carte");
  }
}

let table = document.getElementById("memoryContent");
let difficulty = document.getElementById("difficulty");

difficulty.addEventListener("change", () => {
  if (difficulty.value == "easy") {
    table.innerHTML = "";
    deck = [];
    getCards(12);
    shuffle(deck);
    distribute();
  } else if (difficulty.value == "normal") {
    table.innerHTML = "";
    deck = [];
    getCards(18);
    shuffle(deck);
    distribute();
    console.log("normal");
  } else if (difficulty.value == "hard") {
    table.innerHTML = "";
    deck = [];
    getCards(24);
    shuffle(deck);
    distribute();
    console.log("hard");
  } else {
    table.innerHTML = "";
  }
});
