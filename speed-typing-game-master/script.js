window.addEventListener('load', init);
// Global variables

//Available levels
const levels = {
    easy: 15,
    medium: 10,
    hard: 5
};
// to change level
const currentLevel = levels.easy;


let time = currentLevel;
let point = 0;
let isPlaying; 



// DOM ELEMENTS
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    "The sign said there was road work ahead so he decided to speed up",
    "She moved forward only because she trusted that the ending she now was going through must be followed by a new beginning.",
    "He had decided to accept his fate of accepting his fate.",
    "For some unfathomable reason, the response team didn't consider a lack of milk for my cereal as a proper emergency.",
    "Nancy thought the best way to create a welcoming home was to line it with barbed wire.",
    "She wanted a pet platypus but ended up getting a duck and a ferret instead.",
    "She discovered van life is difficult with 2 cats and a dog.",
    "Thigh-high in the water, the fisherman’s hope for dinner soon turned to despair.",
    "The anaconda was the greatest criminal mastermind in this part of the neighborhood.",
    "She wondered what his eyes were saying beneath his mirrored sunglasses.",
    "I used to practice weaving with spaghetti three hours a day but stopped because I didn't want to die alone.",
    "The dead trees waited to be ignited by the smallest spark and seek their revenge.",
    "She felt that chill that makes the hairs on the back of your neck when he walked into the room.",
    "You're good at English when you know the difference between a man eating chicken and a man-eating chicken.",
    "There was no ice cream in the freezer, nor did they have money to go to the store.",
];

// initialize game
function init() {
    seconds.innerHTML = currentLevel;
    //load word from array
    showWord(words);
    //Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every seconds
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
}

//Start game
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        point++;
    }

    // if score is -1 display 0
    if (point === -1) {
        scoreDisplay.innerHTML = 0;
    } else{
        scoreDisplay.innerHTML = point;
    }
    
}

//match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}


//pick and show random word
function showWord(words) {
    //generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // output random word
    currentWord.innerHTML = words[randIndex];
}

//countdown timer

function countdown() {
    //make sure time does not run out
    if(time > 0) {
        //Decrement
        time--;
    } else if(time === 0) {
        //Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!';
        point = -1;
    }
}