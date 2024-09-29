const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }

  function updateBoard(index, mark) {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return { getBoard, updateBoard, resetBoard };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const GameController = (function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");

  let currentPlayer = player1;

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function playTurn(index, cell) {
    if (Gameboard.updateBoard(index, currentPlayer.mark)) {
      cell.textContent = currentPlayer.mark;

      if (checkWinner()) {
        setTimeout(() => {
          alert(`${currentPlayer.name} wins!`);
          Gameboard.resetBoard();
          resetCells();
        }, 100); // Slight delay to show the final move
      } else {
        switchPlayer();
      }
    }
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2], // row 1
      [3, 4, 5], // row 2
      [6, 7, 8], // row 3
      [0, 3, 6], // col 1
      [1, 4, 7], // col 2
      [2, 5, 8], // col 3
      [0, 4, 8], // diagonal 1
      [2, 4, 6], // diagonal 2
    ];

    const board = Gameboard.getBoard();
    return winConditions.some((condition) => {
      const [a, b, c] = condition;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  function resetCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }

  return { getCurrentPlayer, playTurn };
})();

document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellIndex = parseInt(cell.id);
      GameController.playTurn(cellIndex, cell);
    });
  });
});
