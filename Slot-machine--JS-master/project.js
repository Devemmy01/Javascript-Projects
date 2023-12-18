// Deposit some money
// Determine number of lines to bet on
// Collect a bet amount
// Spin the slot machine
// Check if the user won
// Give the user their winnings
// Play again

// Importing the prompt-sync package for collecting user input
const prompt = require("prompt-sync")();

// Constants defining the dimensions and characteristics of the slot machine
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

// Function to handle the deposit of money by the user
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        // Validate the deposit input
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

// Function to get the number of lines to bet on
const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        // Validate the number of lines input
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

// Function to collect the bet amount per line
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        // Validate the bet input
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
};

// Function to simulate spinning the slot machine and generate random symbols
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // Generate random symbols for each reel
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

// Function to transpose the symbols matrix for easier line checking
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

// Function to print the transposed matrix of symbols in a user-friendly format
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};

// Function to check if the user won and calculate the winnings
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row]
        let allSame = true;

        // Check if all symbols in a line are the same
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        // Calculate winnings based on the symbols and bet amount
        if (allSame) {
            winnings += bet * SYMBOLS_VALUE[symbols[0]]
        }
    }
    return winnings;
}

// Main game function
const game = () => {
    let balance = deposit();
    while (true) {
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log("You won, $" + winnings.toString());
        
        // Check if the user has run out of money
        if (balance <= 0) {
            console.log("You ran out of money");
            break;
        }

        // Ask the user if they want to play again
        const playAgain = prompt("Do you want to play again (y/n)?")
        if (playAgain != "y") break;
    }
};

// Start the game
game();
