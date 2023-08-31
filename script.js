const cards = [
    { number: 0, name: "Jeremy", url: "./images/jeremy.jpg" },
    { number: 1, name: "Nicolas", url: "./images/nico.png" },
    { number: 2, name: "Thomas", url: "./images/thomas.jpeg" },
    { number: 3, name: "Pauline", url: "./images/pauline.png" },
    { number: 4, name: "Sam", url: "./images/sam.JPEG" },
    { number: 5, name: "Alexis", url: "./images/alexis.jpg" },
    { number: 6, name: "Maude", url: "./images/maude.jpeg" },
    { number: 7, name: "Julie", url: "./images/julie.png" },
    { number: 8, name: "Rodrigue", url: "./images/rodrigue.jpg" },
    { number: 9, name: "Bastien", url: "./images/bastien.png" },
    { number: 10, name: "Drillon", url: "./images/drillon.jpg" },
    { number: 11, name: "Chris", url: "./images/Chris.png" },
    { number: 12, name: "Sabrina", url: "./images/sabrina.jpg" },
    { number: 13, name: "Marc", url: "./images/marc.jpg" },
]
console.log(cards)

let deck = []
let indexCard = 0
let lastIndex
let guess = ""
let revealedCards = []
let flippedCard = []

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

function flipcard(cardContent) {
    cardContent.classList.toggle("flipCard")
}

function distribute() {
    for (let card in deck) {
        let effectContainer = document.createElement("div")
        effectContainer.classList.add("effectContainer")
        table.appendChild(effectContainer)

        let mainContainer = document.createElement("div")
        mainContainer.classList.add("mainContainer")
        effectContainer.appendChild(mainContainer)

        let cardContent = document.createElement("div")
        cardContent.classList.add("card" + card, "card")
        mainContainer.appendChild(cardContent)

        let front = document.createElement("div")
        front.classList.add("front")
        cardContent.appendChild(front)

        let back = document.createElement("div")
        back.classList.add("back")
        cardContent.appendChild(back)
        cardContent.addEventListener("click", () => {
            flipcard(cardContent, revealedCards, card)
        })
        cardContent.addEventListener("click", () => {
            revealCard(card, back)
        })
    }
}

function flipcard(cardContent, revealedCard, card) {
    if (
        flippedCard.find((elem) => elem == card) ||
        revealedCard.find((elem) => elem == deck[card].name)
    ) {
        console.log("pas content")
    } else {
        cardContent.classList.toggle("flipCard")
        flippedCard.push(card)
    }
}

let table = document.getElementById("memoryContent")
let difficulty = document.getElementById("difficulty")

difficulty.addEventListener("change", () => {
    if (difficulty.value == "easy") {
        resetGame()
        getCards(12)
        shuffle(deck)
        distribute()
    } else if (difficulty.value == "normal") {
        resetGame()
        getCards(18)
        shuffle(deck)
        distribute()

        console.log("normal")
    } else if (difficulty.value == "hard") {
        resetGame()
        getCards(24)
        shuffle(deck)
        distribute()
        console.log("hard")
    } else {
        resetGame()
    }
})

function deleteLastGuess() {
    document
        .getElementsByClassName("lastGuess")[0]
        .classList.remove("lastGuess")
}

function resetImg() {
    // document.getElementsByClassName("lastGuess")[0].style.backgroundColor =
    //     "yellow"
    // document.getElementsByClassName("lastGuess")[0].style.backgroundImage = ""
    document.getElementsByClassName("lastGuess")[0].classList.toggle("flipCard")
}

function resetHTML(back, lastBack) {
    back.style.backgroundColor = "yellow"
    back.style.backgroundImage = ""
    lastBack.style.backgroundColor = "yellow"
    lastBack.style.backgroundImage = ""
}

function resetCards(cardHTML, back) {
    let lastBack = document.querySelector(".lastGuess .back")
    console.log(lastBack)
    setTimeout(() => resetHTML(back, lastBack), 1000)

    cardHTML[0].classList.toggle("flipCard")
    document.getElementsByClassName("lastGuess")[0]
    resetImg()

    deleteLastGuess()
    console.log("go")
}

function resetGame() {
    table.innerHTML = ""
    deck = []
    revealedCards = []
    guess = ""
}

function revealCard(card, back) {
    console.log(card)
    let cardHTML = document.getElementsByClassName("card" + card)
    back.style.backgroundColor = "transparent"
    back.style.backgroundImage = "url(" + deck[card].url + ")"
    if (revealedCards.find((element) => element == deck[card].name)) {
    } else if (guess == "") {
        guess = deck[card].name
        cardHTML[0].classList.add("lastGuess")
        lastIndex = card
    } else if (deck[card].name == guess && card != lastIndex) {
        revealedCards.push(guess)
        guess = ""
        deleteLastGuess()
    } else if (card == lastIndex) {
        console.log("veuillez choisir un carte différente")
    } else {
        guess = deck[card].name
        guess = ""
        flippedCard = []
        setTimeout(() => resetCards(cardHTML, back), 1000)
    }
}
