document.addEventListener("DOMContentLoaded", function () {
  const Player = (sign) => {
    const getSign = () => {
      return sign;
    };

    return {
      getSign,
    };
  };

  const gameBoard = (() => {
    "use strict";

    const boardCells = document.querySelectorAll(".boardCell");
    const turnInformation = document.getElementById("turnInformation");
    const scoreXDiv = document.getElementById("scoreX");
    const scoreODiv = document.getElementById("scoreO");
    const restartButton = document.getElementById("restartButton");

    const playerX = Player("X");
    const playerO = Player("O");
    const winnerMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let movesX = [];
    let movesO = [];
    let round = 1;
    let scoreX = 0;
    let scoreO = 0;
    let winner = "";
    let isTurned = true;
    let isClicked = false;

    const getCurrentPlayerSign = () => {
      return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    restartButton.addEventListener("click", () => {
      clearBoard();
      round = 1;
      scoreX = 0;
      scoreO = 0;
      winner = "";
      resetScore(scoreXDiv);
      resetScore(scoreODiv);
    });

    function play() {
      boardCells.forEach((element) => {
        element.addEventListener("click", () => {
          if (element.textContent === "") {
            element.textContent = getCurrentPlayerSign();
          }
          console.log(getCurrentPlayerSign());
          turnInformation.textContent = `Player ${getCurrentPlayerSign()}'s Turn`;
          if (getCurrentPlayerSign() === "X") {
            playTurn("X", movesX, boardCells, scoreXDiv);
          } else {
            playTurn("O", movesO, boardCells, scoreODiv);
          }
          round++;
        });
      });
    }
    play();

    function clearBoard() {
      boardCells.forEach((element) => {
        element.textContent = "";
        element.style.backgroundColor = "#BEADFA";
        element.style.pointerEvents = "click";
      });
      movesX = [];
      movesO = [];
    }

    function rotateCells() {
      if (isTurned) {
        boardCells.forEach((element) => {
          element.style.transition = "width 2s, height 2s, transform 2s";
          element.style.transform = "rotate(180deg)";
          element.style.backgroundColor = "#BEADFA";
        });
        isTurned = false;
      } else {
        boardCells.forEach((element) => {
          element.style.transition = "width 2s, height 2s, transform 2s";
          element.style.transform = "rotate(0deg)";
          element.style.backgroundColor = "#BEADFA";
        });
        isTurned = true;
      }
    }

    function gameOver(boardCells) {
      if (scoreO === 3 || scoreX === 3 || round === 9) {
        if (scoreO === 3) {
          winner = "O";
        }
        if (scoreX === 3) {
          winner = "X";
        }
        if (!checkBoardCells) {
          winner = "No";
        }
        boardCells.forEach((element) => {
          element.style.backgroundColor = "lightgray";
          element.style.pointerEvents = "none";
        });
        turnInformation.textContent = winner + " Won";
        turnInformation.style.fontWeight = "bold";
      }
    }
    function checkBoardCells(boardCells) {
      return boardCells.every((item) => item.textContent !== "");
    }
    function delay(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    }

    function findWinner(moves) {
      //[0, 1, 2] [1,4, 0, 2]
      const winningMove = winnerMoves.find((move) => {
        return move.every((index) => moves.includes(index));
      });
      console.log("wm: ", winningMove);
      return winningMove;
    }

    async function setWinnerStyle(winningMove, boardCells) {
      winningMove.forEach((index) => {
        boardCells[index].style.backgroundColor = "aquamarine";
      });

      await delay(2000);
      clearBoard();
      rotateCells();
      gameOver(boardCells);
    }

    function decreaseScore(player, scoreDiv) {
      if (player === "X") {
        scoreX++;
        scoreDiv.textContent = scoreX;
      } else {
        scoreO++;
        scoreDiv.textContent = scoreO;
      }
    }

    function resetScore(scoreDiv) {
      scoreDiv.textContent = "0";
    }

    function playTurn(player, moves, boardCells, scoreDiv) {
      console.log("boardcells", boardCells);
      for (let index = 0; index < boardCells.length; index++) {
        const element = boardCells[index].textContent.valueOf();

        if (element === player && !moves.includes(index)) {
          moves.push(index);
          moves.sort();
          let winningMove = findWinner(moves);
          if (winningMove) {
            console.log("wm'ye girildi");
            decreaseScore(player, scoreDiv);

            setWinnerStyle(winningMove, boardCells, scoreDiv);

            winningMove = null;
            return;
          }
        }
      }
      return moves;
    }
  })();
});
