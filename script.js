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
]
console.log(cards)
let deck = []
let indexCard = 0
let lastIndex
let guess = ""
let revealedCards = []

function getCards(maxCards) {
    for (let i = 0; i < maxCards / 2; i++) {
        let randomInt = Math.floor(Math.random() * cards.length)
        if (deck.find((element) => element.number === randomInt)) {
            i--
        } else {
            deck.push(cards[randomInt])
            deck.push(cards[randomInt])
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

function distribute() {
    for (let card in deck) {
        let cardContent = document.createElement("div")
        let cardP = document.createElement("p")
        cardContent.classList.add("card" + card, "card")
        table.appendChild(cardContent)
        cardContent.addEventListener("click", () => {
            cardP.innerHTML = deck[card].name

            console.log(card)
            cardContent.appendChild(cardP)
            if (revealedCards.find((element) => element == deck[card].name)) {
                console.log("carte déja révélée..")
            } else if (guess == "") {
                guess = deck[card].name
                cardP.classList.add("lastGuess")
                lastIndex = card
                console.log("premier guess")
            } else if (deck[card].name == guess && card != lastIndex) {
                console.log("bien ouej")
                revealedCards.push(guess)
                guess = ""
                document
                    .getElementsByClassName("lastGuess")[0]
                    .classList.remove("lastGuess")
            } else if (card == lastIndex) {
                console.log("veuillez choisir un carte différente")
            } else {
                guess = deck[card].name
                console.log("essaie encore")
                guess = ""
                cardP.innerHTML = ""
                document.getElementsByClassName("lastGuess")[0].innerHTML = ""
                document
                    .getElementsByClassName("lastGuess")[0]
                    .classList.remove("lastGuess")
            }
        })
    }
}

let table = document.getElementById("memoryContent")
let difficulty = document.getElementById("difficulty")

difficulty.addEventListener("change", () => {
    if (difficulty.value == "easy") {
        table.innerHTML = ""
        deck = []
        getCards(12)
        shuffle(deck)
        distribute()
    } else if (difficulty.value == "normal") {
        table.innerHTML = ""
        deck = []
        getCards(18)
        shuffle(deck)
        distribute()
        console.log("normal")
    } else if (difficulty.value == "hard") {
        table.innerHTML = ""
        deck = []
        getCards(24)
        shuffle(deck)
        distribute()
        console.log("hard")
    } else {
        table.innerHTML = ""
    }
})
