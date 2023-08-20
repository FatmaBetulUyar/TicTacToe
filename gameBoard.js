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

  const board = document.querySelector(".board");
  const boardCells = document.querySelectorAll(".boardCell");
  const turnInformation = document.getElementById("turnInformation");
  const scoreXDiv = document.getElementById("scoreX");
  const scoreODiv = document.getElementById("scoreO");

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
  let isWon = false;
  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  boardCells.forEach((element) => {
    element.addEventListener("click", () => {
      element.textContent = getCurrentPlayerSign();
      turnInformation.textContent =
        "Player " + getCurrentPlayerSign() + "'s Turn";
      turnInformation.classList.add("turnInformation");
      round++;
      findMoves("X");
      findMoves("O");
      gameOver();
    });
  });

  function clearBoard() {
    boardCells.forEach((element) => {
      element.textContent = "";
    });
  }

  function gameOver() {
    if (scoreX === 3 || scoreO === 3) {
      scoreO === 3 ? (winner = "O") : (winner = "X");
      turnInformation.textContent = winner + " Won";
      turnInformation.style.fontWeight = "bold";
      boardCells.forEach((element) => {
        element.style.backgroundColor = "lightgray";
        element.style.pointerEvents = "none";
      });
    }
  }

  function findMoves(player) {
    if (player === "X") {
      for (let index = 0; index < 9; index++) {
        const element = boardCells[index].textContent.valueOf();
        if (element === player && !movesX.includes(index)) {
          movesX.push(index);
          movesX.sort(); // [0, 2, 4, 8]     [0, 4, 8]

          const includesWinnerMove = winnerMoves.some((move) => {
            return move.every((index) => movesX.includes(index));
          });
          if (includesWinnerMove) {
            clearBoard();
            scoreX++;
            isWon = true;
            movesX = [];
            scoreXDiv.textContent = scoreX;
            console.log(scoreX);
            console.log(player);
          }
        }
      }
      return movesX;
    } else {
      for (let index = 0; index < 9; index++) {
        const element = boardCells[index].textContent.valueOf();
        if (element === player && !movesO.includes(index)) {
          movesO.push(index);
          movesO.sort();

          const includesWinnerMove = winnerMoves.some((move) => {
            return move.every((index) => movesO.includes(index));
          });
          if (includesWinnerMove) {
            clearBoard();
            isWon = true;
            movesO = [];
            scoreO++;
            scoreODiv.textContent = scoreO;
            console.log(scoreO);
            console.log(player);
          }
        }
      }
      return movesO;
    }
  }
})();
