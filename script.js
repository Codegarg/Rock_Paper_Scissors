// Game state
let humanScore = 0;
let computerScore = 0;
let gameStarted = false;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "tie";
    }
    
    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "rock")
    ) {
        return "human";
    } else {
        return "computer";
    }
}

function updateDisplay(message, gameStatus = "") {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <div style="margin-bottom: 20px;">${message}</div>
        <div style="font-weight: bold; color: #4f46e5;">
            Score - You: ${humanScore} | Computer: ${computerScore}
        </div>
        ${gameStatus ? `<div style="margin-top: 15px; font-size: 20px; font-weight: bold; color: #059669;">${gameStatus}</div>` : ""}
    `;
}

function playRound(humanChoice) {
    if (!humanChoice || !["rock", "paper", "scissors"].includes(humanChoice.toLowerCase())) {
        updateDisplay("Invalid choice! Please enter rock, paper, or scissors.");
        return;
    }

    humanChoice = humanChoice.toLowerCase();
    const computerChoice = getComputerChoice();
    const winner = getWinner(humanChoice, computerChoice);

    let roundMessage = `You chose: ${humanChoice.toUpperCase()} | Computer chose: ${computerChoice.toUpperCase()}<br>`;
    
    if (winner === "tie") {
        roundMessage += "It's a tie!";
    } else if (winner === "human") {
        humanScore++;
        roundMessage += `You win this round! ${humanChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        roundMessage += `You lose this round! ${computerChoice} beats ${humanChoice}`;
    }

    // Check if game is complete (first to 5 wins)
    let gameStatus = "";
    if (humanScore === 5) {
        gameStatus = "CONGRATULATIONS! You won the game!";
        gameStarted = false;
        document.getElementById("choiceButtons").style.display = "none";
    } else if (computerScore === 5) {
        gameStatus = "Game Over! Computer won the game!";
        gameStarted = false;
        document.getElementById("choiceButtons").style.display = "none";
    }

    updateDisplay(roundMessage, gameStatus);
    
    if (!gameStarted && (humanScore === 5 || computerScore === 5)) {
        setTimeout(() => {
            if (confirm("Game finished! Would you like to play again?")) {
                resetGame();
            }
        }, 1000);
    }
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameStarted = true;
    updateDisplay(" Game started! Choose your weapon:", "First to 5 wins!");
}

function startNewGame() {
    resetGame();
    document.getElementById("choiceButtons").style.display = "block";
}

function makeChoice(choice) {
    if (!gameStarted) {
        updateDisplay(" Please start a new game first!");
        return;
    }
    playRound(choice);
}

function playGame() {
    startNewGame();
}
