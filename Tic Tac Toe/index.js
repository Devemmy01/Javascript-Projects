window.addEventListener('DOMContentLoaded', () =>{
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const resetBtn = document.querySelector('#reset');
    const bot = document.querySelector('.bot');

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYER_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE'

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation(){
        let roundWon = false;
        for (let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c ===''){
                continue;
            }
            if (a === b && b === c){
                roundWon = true;
                break;
            }
        }
        
        if (roundWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameACtive = false;
            return;
        }
        if (!board.includes(''))
        announce(TIE);
    }


    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                bot.innerHTML = 'Player <span class="playerO">O</span> Won The Game &#128540;';
                break; 
            case PLAYERX_WON:
                bot.innerHTML = 'Player <span class="playerX">X</span> Won The Game &#128540;';
                break; 
            case TIE:
                bot.innerHTML = 'Tie &#128533;';
        }
        bot.classList.remove('hide');
    };

    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }
        return true;
    }


    const updateGame = (index) => {
        board[index] = currentPlayer;
    }


    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (box, index) => {
        if(isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateGame(index);
            handleResultValidation();
            changePlayer(); 
        }
    }

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameACtive = true;
        bot.classList.add('hide');

        if (currentPlayer === 'O'){
            changePlayer();
        }

        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    resetBtn.addEventListener('click', resetGame);
});