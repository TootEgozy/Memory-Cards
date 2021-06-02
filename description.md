Deconstructing the task

1. a function that recives the "easy" / "medium" / "hard" numbers
   and returns an array of ID's, two of the same for each id.

   this would be done by creating an array of numbers between 1-"easy"/2,
   for example, and then multiplying it, and then shuffles it:

function shuffle(array) {
array.sort(() => Math.random() - 0.5);
}

this will be duplicated into a global array called cardIds.

2. a function that takes a number, an id array and an Event listener callback
   and creates a board accordingly:
   "easy" = 3 X 4
   "medium" = 4 X 5  
   "hard" = 5 X 6

the board will be a grid div filled with card divs.
when the cards are created, each of them is assigned a random ID from the array,
and then that id is removed from the array.
also attach an event listener for every card.

3.  create classes to half of the number of the cards.

4.  create a global variable currentCardFlag. it starts with 0.

    gameflow:
    a card is clicked.

    function clickedCard (event callback):
    a. the event listener is removed, so it cannot be clicked anymore
    b. the card recives a class to look flipped

    c. do function checkCard:
    if (currentFlag == 0), assign the current card id to the flag. for example now currentFlag = 3.
    now (currentFlag != 0). so I check if currentFlag == clicked card id.

    d. do function playCard:
    //this is a function that recives true / false and does the following stuff:
    if true, it means that we got a match! push two cards id (twice the same id) into result arr.
    leave the cards without event listeners and with the same class.
    check if (result.length == "easy" number, for example) and if so the game is won.

        if false, it means that we got a miss.
            select the card with the ids of - the card selected, and the card id in current flag:
                * remove class to flip them
                * re-add the event listener so user can click them.
            assign 0 to currentFlag so a new round can begin.
            update the mistakes counter to be mistakes counter+1.

5.  advanced: create a starting screen and a winning screen.
6.  create game timer.
