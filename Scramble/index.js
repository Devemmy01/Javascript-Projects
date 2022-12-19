const wordText = document.querySelector('.word'),
hintText = document.querySelector('.hint span'),
inputField = document.querySelector('input'),
timeText = document.querySelector('.time b'),
refreshBtn = document.querySelector('.refresh-word'),
checkBtn = document.querySelector('.check-word');

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time up! ${correctWord.toUpperCase()} was the correct word`);
        initializeGame()// calling this function so the game restart
    }, 1000);
}

const initializeGame = () => {
    initTimer(20);
    let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words
    let wordArray = randomObj.word.split("") // splitting each letter of a random word
    for (let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1)); // getting random number
        // shuffling and swiping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]] 
    }
    wordText.innerText = wordArray.join(""); // passing shuffled wordas word text 
    hintText.innerText = randomObj.hint; // passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase(); // passing random word to correctWord
    inputField.value=""; // making input field empty
    inputField.setAttribute("max-lenght", correctWord.length) // setting input max-length attr value to word
}
initializeGame();  


const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase(); // getting user value
    if(!userWord) return alert("You are required to enter a word"); // if users did not enter anything

    // if user word does not match correct word
    if (userWord !== correctWord) return alert(`Oh my! ${userWord} is incorrect `);

    // if both if statements fail, show congrat alert bacause user word is correct
    alert(`Congratulations! ${userWord.toUpperCase()} is the correct word`);
    initializeGame();
}

refreshBtn.addEventListener('click', initializeGame); 
checkBtn.addEventListener('click', checkWord); 