/**************************************************************************************
 * Shubham Prakash
 * Email: shubham.prakash2308@gmail.com
 * LinkedIn: https: //www.linkedin.com/in/ishubhamprakash/
 **************************************************************************************/

/* A list that holds all of the cards */
let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]

let openCard = []; //To store the open card list
let moves = 0; //To store the no of moves
let score = 0; //To store the score
let sec = 0; //stores second value for time
let min = 0; //stores minute value for time
let previousCard; //stores the previously clicked card
let currentCard; //stores the current clicked card

const reset = document.querySelector(".restart"); //Stores RESET button information
const cards = document.getElementsByClassName("card"); //Stores CARD element information
const movesShow = document.getElementsByClassName("moves")[0]; //Stores MOVES display information
const allCards = document.getElementsByClassName("card"); //Selects all elements with class Card
const startButton = document.getElementsByClassName("start-game")[0]; //for start button
const reStartButton = document.getElementsByClassName("reStartGame")[0]; //For restart button at the end of game
const timeMin = document.getElementsByClassName("min")[0]; //to access time in minute
const timeSec = document.getElementsByClassName("sec")[0]; //to access time in minute
const starColor = document.getElementsByClassName("star"); //to change stat rating

let timeCounter; //setInterval variable for time calculation
let starValue; //hold star value



// Shuffle function from http://stackoverflow.com/a/2450976 to shuffle card when reset
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*Start of the game */
startButton.addEventListener("click", function () {
    const popup1 = document.getElementsByClassName("start-popup")[0];
    popup1.classList.add("hide-popup");
});

/*Restarting of game */
reStartButton.addEventListener("click", function () {
    const popup2 = document.getElementsByClassName("end-popup")[0];
    popup2.classList.add("hide-popup");
});


/*When user click reset button, call resetGame fuction*/
reset.addEventListener("click", resetGame);

/* Setting event listener for click to every cards */
setEventforClick();

function setEventforClick() {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", flipCard);
    }
}
/* Function to resets the game by setting score, time, moves to zero and reshuffeling the cards */
function resetGame() {

    cardList = shuffle(cardList); // To shuffle the card list

    /* Add classes to the elements from shuffled card list to display the cards on the page */
    for (let i = 0; i < cardList.length; i++) {
        let cardChild = cards[i].children[0];
        cardChild.className = "fa" + " " + cardList[i];
    }
    timeStop();
    score = 0; // Sets the score to 0
    moves = 0; // Sets the moves counter to 0
    movesShow.innerHTML = moves; //Display the updated move count
    openCard = []; //Empty the openCard list

    for (let j = 0; j < cards.length; j++) {
        hideCard(cards[j]); //hide all the fliped card
    }
    setEventforClick();
}

/* flipCard function to flip and show card */
function flipCard() {
    let card = event.target;
    if (card.tagName == "LI") {
        card.className = "card open show";
        openCard.push(card.children[0].classList[1]);
        card.removeEventListener("click", flipCard);

        if (openCard.length % 2) {
            card.id = "card1";
            console.log("card1 set");
        } else {
            card.id = "card2";
            console.log("card2 set");
        }

        console.log(this);

        if (openCard.length % 2 == 0 && openCard.length != 0) {
            previousCard = document.getElementById("card1");
            currentCard = document.getElementById("card2");

            if (openCard[openCard.length - 1] == openCard[openCard.length - 2]) {
                console.log("Card matched...");
                incrementMoveCount();
                previousCard.id = "";
                currentCard.id = "";
                previousCard.className = "card open show match";
                currentCard.className = "card open show match";
            } else {
                console.log("Card NOT matched...");
                incrementMoveCount();
                previousCard.className = "card show wrong";
                currentCard.className = "card show wrong";
                setTimeout(function () {
                    previousCard.className = "card";
                    currentCard.className = "card";
                    previousCard.id = "";
                    currentCard.id = "";
                    setEventforClick(previousCard);
                    setEventforClick(currentCard);
                    openCard.pop();
                    openCard.pop();
                }, 500);
            }
        }
    }
    // console.log(openCard + "\n" + card.classList);
}



/*hideCard Function to flip back and hide the card */
function hideCard(c) {
    c.className = "card";
    c.addEventListener("click", flipCard);
}

/* Function to increase move count */
function incrementMoveCount() {
    moves++;
    movesShow.innerHTML = moves;
}

/* Function for calculating and displaying time */

function timeStart() {
    sec = 0;
    min = 0;
    timeCounter = setInterval(timeCalculate, 1000);
}

function timeCalculate() {
    sec++;
    if (sec == 60) {
        min++;
        sec = 0;
        timeMin.innerHTML = min;
        //to change the number of star and its value
        starRating(min);
    }
    // console.log(min + " min" + " and " + sec + " sec");
    timeSec.innerHTML = sec;
}

function timeStop() {
    clearInterval(timeCounter);
}

function starRating(min) {
    switch (min) {
        case 1:
            starValue = 5;
            break;
        case 2:
            starValue = 4;
            starColor[4].style.color = "#60b0be6b";
            break;
        case 3:
            starValue = 3;
            starColor[3].style.color = "#60b0be6b";
            break;
        case 4:
            starValue = 2;
            starColor[2].style.color = "#60b0be6b";
            break;
        case 5:
            starValue = 1;
            starColor[1].style.color = "#60b0be6b";
            break;
        default:
            console.log("5 min time exeded");
    }
}