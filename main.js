
// Array Of Words
const words = {
    Easy: [
        "apple", "ball", "cat", "dog", "egg", "fish", "goat", "hat", "ice", "jam",
        "kite", "lion", "man", "nest", "owl", "pig", "queen", "rat", "sun", "tree",
        "umbrella", "van", "wolf", "x-ray", "yacht", "zebra", "book", "cup", "door", "fan"
    ],
    Medium: [
        "BANANA", "circle", "dinosaur", "elephant", "flower", "giraffe", "helicopter", "igloo", "jacket", "kangaroo",
        "lemon", "mountain", "notebook", "octopus", "piano", "question", "rainbow", "scooter", "triangle", "unicorn",
        "vacuum", "waterfall", "xylophone", "yogurt", "zeppelin", "avocado", "bicycle", "computer", "drum", "engine"
    ],
    Hard: [
        "ALGORITHIM", "Bacterium", "catastrophe", "dichotomy", "ephemeral", "facsimile", "gregarious", "hypothesis", "incandescent", "juxtaposition",
        "kaleidoscope", "labyrinth", "metamorphosis", "nefarious", "obfuscate", "paradigm", "quintessential", "rendezvous", "synecdoche", "transcendental",
        "ubiquitous", "vicissitude", "whimsical", "xenophobia", "yesteryear", "zephyr", "bibliophile", "conundrum", "doppelganger", "effervescent"
    ]
}

// Setting Levels
const lvls = {
    "Easy": 5,
    "Medium": 3,
    "Hard": 2,
};

let choosenLvlName = localStorage.getItem("level");
let choosenLvlArr = words[choosenLvlName];
let wordsLenBeforeRemove = choosenLvlArr.length;

let choosenLvlSeconds = lvls[choosenLvlName];


let lvlSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input")
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish")

lvlSpan.innerHTML = choosenLvlName;
secondsSpan.innerHTML = choosenLvlSeconds;
timeLeft.innerHTML = choosenLvlSeconds;
scoreTotal.innerHTML = choosenLvlArr.length;

input.onpaste = () => {
    return false
}

startBtn.addEventListener("click", () => {
    startBtn.remove();
    input.focus();
    genWords();

})



function genWords() {
    getRandWord();

    // Remove UpComing Words Box Every Generate
    upComingWords.innerHTML = "";

    for (let i = 0; i < choosenLvlArr.length; i++) {
        let div = document.createElement("div");
        let divText = document.createTextNode(choosenLvlArr[i]);
        div.appendChild(divText);
        upComingWords.appendChild(div)
    }
    startPlay();
    if ((wordsLenBeforeRemove - 1) == choosenLvlArr.length) {
        timeLeft.innerHTML = choosenLvlSeconds + 3;

    }
}

function startPlay() {
    // reset the time left
    timeLeft.innerHTML = choosenLvlSeconds;

    let startInterval = setInterval(() => {
        timeLeft.innerHTML--;
        if (timeLeft.innerHTML < 0) {
            clearInterval(startInterval);

            // Check Function
            check()
        }
    }, 1000)
}


function check() {
    if (choosenLvlName == "Hard") {
        compareFunc(theWord.innerHTML, input.value)
    } else {
        compareFunc(theWord.innerHTML.toLowerCase(), input.value.toLowerCase())

    }
}

function getRandWord() {
    let randomWord = choosenLvlArr[Math.floor(Math.random() * choosenLvlArr.length)];
    let randomWordIndex = choosenLvlArr.indexOf(randomWord);

    choosenLvlArr.splice(randomWordIndex, 1);

    theWord.innerHTML = randomWord;
}


function compareFunc(theWordValue, InputValue) {
    if (theWordValue == InputValue) {
        input.value = "";
        scoreGot.innerHTML++;
        if (choosenLvlArr.length > 0) {
            genWords();
        } else {
            let span = document.createElement("span");
            span.className = "win"
            span.appendChild(document.createTextNode("Congratoulations You Win"));
            finishMessage.appendChild(span);

            // Store Date On Winning
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let seconds = date.getSeconds()
            let dateObj = {
                date: `${year}-${month}-${day}-${hours}h-${minutes}m-${seconds}s`
            }
            localStorage.setItem("dateObj", dateObj.date)

            timeLeft.innerHTML = 0;
        }
    } else {
        timeLeft.innerHTML = 0;

        // Remove UpComing Words Box
        upComingWords.remove()

        let span = document.createElement("span");
        span.className = "lose"
        span.appendChild(document.createTextNode("Game Over"));
        finishMessage.appendChild(span);
    }
}