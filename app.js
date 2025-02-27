const readline = require('readline');

function createGameBoard () {
    let board = [["-","-","-"], ["-","-","-"], ["-","-","-"]];

    return {
        getBoard: function() {
            return board;
        },

        placeCounter: function(icon, xPosition, yPosition) {
            if (board[xPosition][yPosition] === "-") {
                board[xPosition][yPosition] = icon;
                return true;
            }
            return false;
        }, 

        displayBoard: function() {
            let display = "";
            for (let i=0; i < 3; i++) {
                display += board[i].join(" | ") + "\n";
                if (i < 2) display += "-----------\n";
            }
            return display;
        },

        // Check if there's a winner
        checkForWinner: function() {
            // Check rows
            for (let i = 0; i < 3; i++) {
                if (board[i][0] !== "-" && 
                    board[i][0] === board[i][1] && 
                    board[i][0] === board[i][2]) {
                    return board[i][0]; // Return the winning symbol
                }
            }
            
            // Check columns
            for (let i = 0; i < 3; i++) {
                if (board[0][i] !== "-" && 
                    board[0][i] === board[1][i] && 
                    board[0][i] === board[2][i]) {
                    return board[0][i];
                }
            }
            
            // Check diagonals
            if (board[0][0] !== "-" && 
                board[0][0] === board[1][1] && 
                board[0][0] === board[2][2]) {
                return board[0][0];
            }
            
            if (board[0][2] !== "-" && 
                board[0][2] === board[1][1] && 
                board[0][2] === board[2][0]) {
                return board[0][2];
            }
            
            // Check for a draw
            let isDraw = true;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "-") {
                        isDraw = false;
                        break;
                    }
                }
                if (!isDraw) break;
            }
            
            if (isDraw) return "draw";
            
            return null; // No winner yet
        }
        

    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function gamePlay() {
    const gameBoard = createGameBoard();
    let currentPlayer = "X";
    let gameOver = false;

    function promptMove() {
        console.log(`Player ${currentPlayer}'s turn`);

        rl.question("Enter x position (0-2): ", (xInput) => {
            rl.question("Enter y position(0-2): ", (yInput) => {
                const x = parseInt(xInput);
                const y = parseInt(yInput);

                if(isNaN(x) || isNaN(y) || x < 0 || x > 2 || y < 0 || y > 2) {
                    console.log("Please enter valid positions (0-2)");
                    promptMove();
                    return;
                }

                if (gameBoard.placeCounter(currentPlayer, x, y)) {
                    console.log(gameBoard.displayBoard());

                    const winner = gameBoard.checkForWinner();
                    if (winner) {
                        gameOver = true;
                        if (winner == "draw") {
                            console.log("Game over! The game was a draw");
                        } else {
                            console.log(`Game over! Player ${winner} is the winner`)
                        }
                        rl.close();
                        return;
                    }
                    
                    // Switch players
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    promptMove();
                } else {
                    console.log("That position is already taken!");
                    promptMove();
                }
            });
        });
    }

    promptMove();
}

gamePlay();