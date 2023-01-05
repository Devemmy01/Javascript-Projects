const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetters = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input")

let word, maxGuesses, corrects = [], incorrects = [];

// Getting a random object from the wordList
function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    maxGuesses = 6; corrects = [], incorrects = [];
  
    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetters.innerText = incorrects;
    

    let html = '';
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`
    }
    inputs.innerHTML = html; 
}
randomWord()

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
    && !corrects.includes(key)){
    
        if(word.includes(key)){ // If user letters were found in the word
            for (let i = 0; i < word.length; i++){
                if(word[i] === key){
                    // show matched letter in the input field
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else{
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetters.innerText = incorrects;
    }
    typingInput.value = "";


    if(corrects.length === word.length){ // if all letters were found
        $('#Cmodal').fadeIn().css("display", "flex");
            $('.close-modal').click(function(){
                $('#Cmodal').fadeOut();
            });
            randomWord();
    }  else if (maxGuesses < 1){// if all letters are not found
        $(function(){
            
            $('#Smodal').fadeIn().css("display", "flex");
        
            $('.close-modal').click(function(){
                $('#Smodal').fadeOut();
                for (let i = 0; i < word.length; i++){
                    // show matched letter in the input field
                    inputs.querySelectorAll("input")[i].value = word[i];
                }
            });
        });
    }
}


resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());