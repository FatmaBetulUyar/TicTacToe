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
  const turnInformation= document.getElementById("turnInformation");

  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  boardCells.forEach((element) => {
    element.addEventListener("click", () => {
      element.textContent = getCurrentPlayerSign();
      turnInformation.textContent ="Player " +  getCurrentPlayerSign() + "'s Turn";
    turnInformation.classList.add("turnInformation");
      round ++;
    });
  });
})();
