// All avaibles cards
const cards = [
    { number: 0, name: "Jeremy", url: "./images/Jeremy.jpg" },
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

// init variables

let deck = []
let indexCard = 0
let guess = ""
let revealedCards = []
let flippedCard = []
let starterDate = new Date()
let timer = document.getElementById("timer")
let table = document.getElementById("memoryContent")
let difficulty = document.getElementById("difficulty")
let reset = document.getElementById("reset")

// Timer

function showTime() {
    timer.innerHTML = millisToMinutesAndSeconds(new Date() - starterDate)
}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}

setInterval(showTime, 1000)

// get the specified nmber of cards (but they are semi-ordered)

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

// shuffle those cards

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

// distribute cards for the game

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

// toggle the flipcard animation

function flipcard(cardContent, revealedCard, card) {
    if (
        flippedCard.find((elem) => elem == card) ||
        revealedCard.find((elem) => elem == deck[card].name) ||
        flippedCard.length == 2
    ) {
        console.log("pas content")
    } else {
        cardContent.classList.toggle("flipCard")
    }
}

// reset the game and timer on the reset button

function resetAll() {
    if (flippedCard.length == 2) {
        console.log("attendez la fin de la manche")
    } else if (difficulty.value == "easy") {
        resetGame()
        getCards(12)
        shuffle(deck)
        distribute()
        starterDate = new Date()
    } else if (difficulty.value == "normal") {
        resetGame()
        getCards(18)
        shuffle(deck)
        distribute()
        starterDate = new Date()

        console.log("normal")
    } else if (difficulty.value == "hard") {
        resetGame()
        getCards(24)
        shuffle(deck)
        distribute()
        console.log("hard")
        starterDate = new Date()
    }
}
reset.addEventListener("click", resetAll)

// change the difficulty

difficulty.addEventListener("change", () => {
    if (difficulty.value == "easy") {
        resetGame()
        getCards(12)
        shuffle(deck)
        distribute()
        starterDate = new Date()
    } else if (difficulty.value == "normal") {
        resetGame()
        getCards(18)
        shuffle(deck)
        distribute()
        starterDate = new Date()

        console.log("normal")
    } else if (difficulty.value == "hard") {
        resetGame()
        getCards(24)
        shuffle(deck)
        distribute()
        console.log("hard")
        starterDate = new Date()
    } else {
        resetGame()
    }
})

// delete "lastGuess" className

function deleteLastGuess() {
    document
        .getElementsByClassName("lastGuess")[0]
        .classList.remove("lastGuess")
}

// toggle the flip card on the previous guess

function resetImg() {
    document.getElementsByClassName("lastGuess")[0].classList.toggle("flipCard")
}

// reset HTML for discoverd cards

function resetHTML(back, lastBack) {
    back.style.backgroundColor = "yellow"
    back.style.backgroundImage = ""
    lastBack.style.backgroundColor = "yellow"
    lastBack.style.backgroundImage = ""
}

// flip cards, reset HTML prepare for next guess

function resetCards(cardHTML, back) {
    let lastBack = document.querySelector(".lastGuess .back")
    console.log(lastBack)
    setTimeout(() => resetHTML(back, lastBack), 400)

    cardHTML[0].classList.toggle("flipCard")
    document.getElementsByClassName("lastGuess")[0]
    resetImg()

    deleteLastGuess()
    flippedCard = []
    console.log("go")
    console.log(flippedCard)
}

// reset all variables for new game

function resetGame() {
    table.innerHTML = ""
    deck = []
    revealedCards = []
    guess = ""
    flippedCard = []
}

// show back of cards and decide what need to do if it's a match or not

function revealCard(card, back) {
    console.log(card)
    let cardHTML = document.getElementsByClassName("card" + card)
    back.style.backgroundColor = "transparent"
    back.style.backgroundImage = "url(" + deck[card].url + ")"
    if (flippedCard.length == 2) {
        console.log("wait")
    } else if (guess == "") {
        guess = deck[card].name
        cardHTML[0].classList.add("lastGuess")
        lastIndex = card
        flippedCard.push(card)
    } else if (deck[card].name == guess && card != lastIndex) {
        revealedCards.push(guess)
        guess = ""
        deleteLastGuess()
        flippedCard = []
    } else if (card == lastIndex) {
        console.log("veuillez choisir un carte différente")
    } else {
        guess = deck[card].name
        guess = ""
        flippedCard.push(card)

        setTimeout(() => resetCards(cardHTML, back), 800)
        console.log(flippedCard)
    }
}
