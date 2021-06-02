//game levels
const EASY = 12;
const MEDIUM = 20;
const HARD = 30;
//this game's card id's
let cardIds = [];

//an array that accmulate matched cards id's
let matches = [];

//A flag to check if the game is won
let win = false;

//misses counter
let misses = 0;
let hits = 0;

const gameMisses = document.querySelector(".misses-counter");

//function to reload location
function restartGame() {
    location.reload();
}

//updates when a player chooses it in the enter screen
let levelNumber = 12; 

let totalRows = 0;
let totalColums = 0;

//last flipped card
let firstCardPlayed = null;

//Update total rows/columns 
//accourding to the level number
//*********************** Runs at start
function rowsColumnsForLevel () {
    //easy
    if (levelNumber == EASY) {
        totalRows = 3;
        totalColums = 4;
    }
    //medium
    else if (levelNumber == MEDIUM) {
        totalRows = 4;
        totalColums = 5;
    }
    //hard
    else if (levelNumber == HARD) {
        totalRows = 5;
        totalColums = 6;
    }
    //error
    else console.log("Error: no level was picked");
}
rowsColumnsForLevel();


// a function that recives the "easy" / "medium" / "hard" levelNumbers
// and returns an array of ID's.
//Also updates the global array cardIds.
//**************************Runs at start
function createIdArr () {
    const firstArr = [];
    for (i = 1; i <= levelNumber/2; i++) {
        firstArr.push(i);
    }

    const copyArr = [];
    for (i = 0; i < firstArr.length; i++) {
        copyArr.push(firstArr[i]);
    } 

    let idArr = firstArr.concat(copyArr);
    idArr = idArr.sort(()=> Math.random()-0.5);
        
    //update global arr:
    cardIds = idArr

    return idArr;
}
createIdArr();

//Function that creates the board grid and fills it with cards.
//the cards get an id from global idArr
//the cards get the event listener clickedCard
//the cards get the class "cards".
//**********************************Runs at start
function createCards () {
    const board = document.querySelector(".board");
    board.style.gridColumn = totalColums;
    board.style.gridRow = totalRows;

    let row = 1;
    let column = 0;

    for (i = 0; i<levelNumber; i++) {
        const card = document.createElement('div');
        board.insertAdjacentElement('beforeend', card);
        card.style.gridRow = row;
        card.style.gridColumn = column;
        card.classList.add('card');
        card.dataset.id = cardIds[i];
        card.addEventListener('click', cardClicked);
        card.faceUp = false;
 
        column += 1;

        if(column == totalColums) {
            row += 1;
            column = 0;
        }
    }
}

createCards();


//function for flipping a card.
//recives a card element.
//toggles the class(if it has a 'flipped' class, removes it.
//if not, adds it)
function flipCard(card) {
    card.classList.toggle(`flipped${card.dataset.id}`);
    card.faceUp = !(card.faceUp);
}

//function that handels currentCard, and checks current card id.
//re-assign currentCard and "match" flag. 
function playCard (card) {

    flipCard(card);

    if (firstCardPlayed == null) {
        //this means we are flipping the first card in a new potential match
        firstCardPlayed = card;
        console.log("This is the first card in current match:");
        console.log(card);
    }
    else { 
        console.log("This is the SECOND card in current match:");
        console.log(card);
        if (firstCardPlayed.dataset.id == card.dataset.id)  {
            // yay we got a match!
            console.log("MATCH!!!: First card: "+firstCardPlayed.dataset.id+" Second card: "+card.dataset.id);
            // we can now reset firstCardPlayed for the next match
            firstCardPlayed = null;
            //couting up the hits
            hits+=2;
            if (hits == cardIds.length) {
                win = true;
                let sideBar = document.querySelector(".sidebar");
                sideBar.classList.add("sidebar-win");
                let winP = document.createElement('p');
                let restartBtn = document.createElement('button');
                restartBtn.innerHTML = "Play again?";
                restartBtn.addEventListener('click', restartGame);

                winP.innerHTML = "You Won!!!";
                winP.classList.add("win");

                sideBar.appendChild(winP);
                sideBar.insertAdjacentElement('beforeend', restartBtn);
            }
        }   
        else {
            // no such luck, the second card we flipped does not match the first
            console.log("NO MATCH :( First card: "+firstCardPlayed.dataset.id+" Second Card: "+card.dataset.id);
            //const cards = document.querySelectorAll(`[data-id="${card.dataset.id}"]`);
            // no worries, we just flip back both cards
            setTimeout(function() {
                //delay before flipping back the cards
                flipCard(card);
                flipCard(firstCardPlayed);
                firstCardPlayed = null;
                // count up the misses
                misses++;
                gameMisses.innerHTML =`${misses}`;
              }, 200);
        }
    }
}

//The main game function!
//happens whenever a card is clicked
//is bulid from small functions for comfort

function cardClicked(event) {
    const card = event.target;
    //card.removeEventListener('click', cardClicked);
    //update match: 
    if (card.faceUp == false) playCard(card);
    
    console.log(card.dataset.id);
}

createIdArr(12);



//test

// let cards = document.querySelectorAll(".card");
// console.log(cards);
// cards.forEach(card => flipCard(card));