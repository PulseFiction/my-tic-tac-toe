
class Player {
  constructor(name, choice) {
    this.name = name;
    this.score = 0;
    this.choice = choice;
  }
}

function validateGame() {
  const playerOneName = document.querySelector("#player-one-name").value;
  const playerTwoName = document.querySelector("#player-two-name").value;
  // const playerOneNameBox = document.querySelector("#player-one-name");
  // const playerTwoNameBox = document.querySelector("#player-two-name");
  const noughtsBox = document.querySelector("#noughts");
  const crossesBox = document.querySelector("#crosses");
  const button = document.querySelector(".submit");
  const inputDiv = document.querySelector(".user-input");
  const playerOne = document.querySelector(".player-one");
  const playerTwo = document.querySelector(".player-two");
  let playerChoice = "";
  let playerTwoChoice = "";

  button.addEventListener("click", newPlayer);

  // Alternate checkboxes
  inputDiv.addEventListener("click", (e) => {
    let target = e.target;

    if (target.id === "noughts") {
      crossesBox.checked = false;
    } else if (target.id === "crosses") {
      noughtsBox.checked = false;
    }
  });

  function newPlayer() {
    if (
      noughtsBox.checked ||
      (noughtsBox.checked === false && crossesBox.checked === false)
    ) {
      playerChoice = "noughts";
      playerTwoChoice = "crosses";
    } else if (crossesBox.checked) {
      playerChoice = "crosses";
      playerTwoChoice = "noughts";
    }

    const player = new Player(playerOneName, playerChoice);
    const player2 = new Player(playerTwoName, playerTwoChoice);

    if (player.choice === "noughts") {
      playerOne.textContent = player.name;
      playerTwo.textContent = player2.name;
    } else {
      playerOne.textContent = player2.name;
      playerTwo.textContent = player.name;
    }

    button.style.display = "none";
    console.log(player);

    startGame(player, player2);
  }
}

validateGame();

function startGame(playerOne, playerTwo) {
  const squares = document.querySelectorAll(".cell");
  const cross = `<img src="./cross.svg"></img>`;
  const nought = `<img src="./circle.svg"></img>`;
  // push player moves to arrays, need to sort them too.
  const playerMoves = [];
  const playerTwoMoves = [];

  // Set turn based on what piece player is
  // noughts turns are even, crosses are odd
  let turn = 0;

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (turn % 2 === 0) {
        if (square.innerHTML.length === 0) {
          if (playerOne.choice === "noughts") {
            square.innerHTML = nought;
            playerMoves.push(square.dataset.number);
            playerMoves.sort((a, b) => a - b);

            console.log(`player one: ${playerMoves}`);
          } else if (playerTwo.choice === "noughts") {
            square.innerHTML = nought;
            playerTwoMoves.push(square.dataset.number);
            playerTwoMoves.sort((a, b) => a - b);

            console.log(`player two: ${playerTwoMoves}`);
          }
          turn++;

          
        }
      } else {
        if (square.innerHTML.length === 0) {
          if (playerOne.choice === "crosses") {
            square.innerHTML = cross;
            playerMoves.push(square.dataset.number);
            playerMoves.sort((a, b) => a - b);

            console.log(`player one: ${playerMoves}`);
          } else if (playerTwo.choice === "crosses") {
            square.innerHTML = cross;
            playerTwoMoves.push(square.dataset.number);
            playerTwoMoves.sort((a, b) => a - b);

            console.log(`player two: ${playerTwoMoves}`);
          }

          turn--;
          
        }
      }

      const winMessage = document.querySelector('.win');

      if (checkWin(playerMoves, playerTwoMoves) === 1) {
        winMessage.textContent = `${playerOne.name} wins!`;
        winMessage.style.display = 'flex';
      } else if (checkWin(playerMoves, playerTwoMoves) === 2) {
        winMessage.textContent = `${playerTwo.name} wins!`
        winMessage.style.display = 'flex';
      }
      ;
    });
  });
}

function checkWin(playerOneArray, playerTwoArray) {
  const WINNING_COMBINATIONS = [
    // Horizontal
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    // Vertical
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    // Diagonal
    ['1', '5', '9'],
    ['3', '5', '7'],

    
  ];

  for (let i = 0; i < WINNING_COMBINATIONS.length ; i++) {
    if (isEqual(playerOneArray, WINNING_COMBINATIONS[i])) {
      return 1;
    } else if (isEqual(playerTwoArray, WINNING_COMBINATIONS[i])) {
      return 2;
    }
  }
 

  
  
}

// returns and boolean if both arrays are equal
function isEqual(array1, array2) {
  let count = 0;
  for (let i = 0 ; i < array1.length ; i++) {
    if (array1[i] === array2[i]) {
      count++;
     }
    }
    
    return count === 3;
  }


// CPU code - WIP

//  let cpuMove = document.querySelector(`[data-number="${Math.trunc(Math.random() * 9)}"]`);
// setInterval(() => {
//   if (cpuMove.innerHTML.length > 0) {
//     cpuMove = document.querySelector(`[data-number="${Math.trunc(Math.random() * 9) + 1}"]`);
//   }
//   cpuMove.innerHTML = cross;

// }, 1000)
