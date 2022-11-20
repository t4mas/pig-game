'use strict';
////////////////////////////////////////////////////////////////////////////////////////////////////
// Selecting DOM Elements
// Scores & Dice Element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

// Current Scores
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Player Names
let player0Name = document.querySelector('.name--0');
let player1Name = document.querySelector('.name--1');

// Plaer Sections
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');





////////////////////////////////////////////////////////////////////////////////////////////////////
// Starting Conditions & Basic Functions
let currentScore, activePlayer, scores, playing;


const init = function () {
    // Resetting UI elements
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0Section.classList.add('player--active');
    player1Section.classList.remove('player--active');
    player0Section.classList.remove('player--winner');
    player1Section.classList.remove('player--winner');
    diceEl.classList.add('hidden');
    //Resetting game data
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
}
init();


const changePlayerNames = function () {
    //
    player0Name.textContent = prompt('Please enter PLAYER 1 name.');
    player1Name.textContent = prompt('Please enter PLAYER 2 name.');
}
changePlayerNames();


const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Section.classList.toggle('player--active');
    player1Section.classList.toggle('player--active');
}





////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Logic
btnRoll.addEventListener('click', function () {
    if (playing) {

        // Generate a random number between 1-6
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        // Display dice roll
        diceEl.src = `dice-${diceRoll}.png`;
        diceEl.classList.remove('hidden');

        // Decide if the number is equal to 1
        if (diceRoll !== 1) {
            // Add diceRoll value to currentScore and display current score on the User Interface
            currentScore += diceRoll;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch Player
            switchPlayer();
        }

    }
})





////////////////////////////////////////////////////////////////////////////////////////////////////
// Holding current score
btnHold.addEventListener('click', function () {
    if (playing) {

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Decide if the score is equal or more than 100
        if (scores[activePlayer] >= 100) {
            // Active player wins the game
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            playing = false;
        } else {
            // Switch Player
            switchPlayer();
        }

    }
})





////////////////////////////////////////////////////////////////////////////////////////////////////
// User resets the game
btnNew.addEventListener('click', init);



