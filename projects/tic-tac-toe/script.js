// constants
const X = "X",
  O = "O",
  BLANK = " ";
// variables
let aiSymbol = O;
let playerSymbol = X;
let squareId,
  curPlayer,
  moves,
  gamemode,
  gameOver,
  endMessage,
  board = [];
let aiMakingTheirStupidDecisionBecauseIdk = false;
let tc = [
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 5],
  [4, 6],
  [4, 7],
  [4, 8],
  [0, 1],
  [1, 2],
  [6, 7],
  [7, 8],
  [0, 3],
  [3, 6],
  [2, 5],
  [5, 8],

  [0, 2],
  [3, 5],
  [6, 8],
  [0, 6],
  [1, 7],
  [2, 8],
  [0, 8],
  [2, 6]
];
let pl = [8, 7, 6, 5, 3, 2, 1, 0, 2, 0, 8, 6, 6, 0, 8, 2,
         1, 4, 7, 3, 4, 5, 4, 4];
let ns = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 4, 5],
  3: [4, 0, 6],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [2, 4, 8],
  6: [3, 4, 7],
  7: [4, 6, 8],
  8: [7, 5, 4],
};

// game

function indexOf2DArray(array2D, subarray) {
  for (let i = 0; i < array2D.length; i++) {
    if (array2D[i].toString() === subarray.toString()) {
      return i;
    }
  }
  return -1; // Return -1 if the subarray is not found in the 2D array.
}

function play(o) {
  s("#gameboard").addEventListener("click", makeMove);
  curPlayer = X;
  moves = 0;
  gameOver = false;
  gamemode = o;
  board = [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK];
  let squares = qsall(".cell");
  squares.forEach((square, index) => {
    square.innerHTML = "";
    square.classList.remove("winning-square");
    square.classList.remove("taken");
    //console.log(square + ", " + index);
  });
  s("#end-msg").innerHTML = "";
  s(".buttons").style.display = "none";
}

function makeMove(event) {
  if (!aiMakingTheirStupidDecisionBecauseIdk) {
    if (isValidMove(event.target.id)) {
      board[event.target.id] = curPlayer;
      gebid(event.target.id).innerHTML = curPlayer;
      gebid(event.target.id).classList.add("taken");
      moves++;
      checkWin();
      if (!gameOver) {
        switchPlayer();
      }
    }
  }
}

function isValidMove(index) {
  if (board[index] === BLANK) {
    return true;
  } else {
    if((gamemode === "ai" && curPlayer === playerSymbol) || gamemode === "human") {
    swal("Invalid Move", "Please select a blank board position.", "error");
    }
    return false;
  }
}

function aiMakeMove() {
  think();
  aiMakingTheirStupidDecisionBecauseIdk = false;
}

function think() {
  // first priority: if the ai can win, then it will
  let aiWinCombinations = [];
  tc.forEach((combination, index) => {
    let aiWinCombination = [];
    combination.forEach((squareId, squareIndex) => {
      if (board[squareId] === aiSymbol) {
        aiWinCombination.push(squareId);
      }
    });
    if (aiWinCombination.length === 2) {
      aiWinCombinations.push(aiWinCombination);
    }
  });
  if (aiWinCombinations.length >= 1) {
    console.log("chose 1")
    let choseSpot = false;
    while (!choseSpot) {
      if(aiWinCombinations.length < 1) {
        thinkSecond();
        break;
      }
      let chosenCombination =
        aiWinCombinations[randomInt(0, aiWinCombinations.length - 1)];
        aiWinCombinations.splice(indexOf2DArray(aiWinCombinations, chosenCombination), 1);
      let chosenSquare = pl[indexOf2DArray(tc, chosenCombination)];
      if (isValidMove(chosenSquare)) {
        console.log("finished 1")
        choseSpot = true;
        board[chosenSquare] = aiSymbol;
        gebid(chosenSquare).innerHTML = aiSymbol;
        gebid(chosenSquare).classList.add("taken");
        moves++;
        checkWin();
        if (!gameOver) {
          switchPlayer();
        }
      }
    }
  } else {
    thinkSecond();
  }
}

function thinkSecond() {
  // second priority: if the user is about to win, block them
  //do it all over again
  let playerWinCombinations = [];
  tc.forEach((combination, index) => {
    let playerWinCombination = [];
    combination.forEach((squareId, squareIndex) => {
      if (board[squareId] === playerSymbol) {
        playerWinCombination.push(squareId);
      }
    });
    if (playerWinCombination.length >= 2) {
      playerWinCombinations.push(playerWinCombination);
    }
  });
  if (playerWinCombinations.length >= 1) {
    //console.log(playerWinCombinations)
    //console.log(indexOf2DArray(playerWinCombinations, 0))
    console.log("chose 2")
    let choseSpot = false;
    while (!choseSpot) {
      //console.log("trying 2: choseSpot: "+choseSpot+", playerWinCombinations: "+playerWinCombinations)
      if(playerWinCombinations.length < 1) {
        thinkThird();
        break;
      }
      let chosenCombination =
        playerWinCombinations[randomInt(0, playerWinCombinations.length - 1)];

      //console.log("chosenCombination: "+chosenCombination)
      //console.log(playerWinCombinations.join(", "))
      playerWinCombinations.splice(
        indexOf2DArray(playerWinCombinations, chosenCombination),
        1
      );
      let chosenSquare = pl[indexOf2DArray(tc, chosenCombination)];
      //console.log("chosenSquare: "+chosenSquare)
      if (isValidMove(chosenSquare)) {
        console.log("finished 2")
        choseSpot = true;
        board[chosenSquare] = aiSymbol;
        gebid(chosenSquare).innerHTML = aiSymbol;
        gebid(chosenSquare).classList.add("taken");
        moves++;
        checkWin();
        if (!gameOver) {
          switchPlayer();
        }
        aiMakingTheirStupidDecisionBecauseIdk = false;
      }
    }
  } else {
    thinkThird();
  }
}

function thinkThird() {
  //third priority: if none of the above conditions are met, try placing a symbol next to an existing one
  let existingSymbols = [];
  let availableSpots = [];
  board.forEach((symbol, index) => {
    console.log(symbol)
    if (symbol === aiSymbol) {
      existingSymbols.push(index);
    }
  });
  //console.log("exsisting symblos: " + existingSymbols);
  Object.keys(ns).forEach((key, index) => {
   // console.log("key: "+key+", index: "+index)
    ns[key].forEach((squareId, squareIndex) => {
   //   console.log("sqid: "+squareId+", sqindex: "+squareIndex);
   //   console.log(existingSymbols)
  //    console.log("eSi: "+Object.keys(ns)[key])
 //     console.log("doesit: "+existingSymbols.includes(Object.keys(ns)[key]))
      if(existingSymbols.includes(parseInt(Object.keys(ns)[key]))) {
     //   console.log("passwed first check")
        if (isValidMove(squareId)) {
     //     console.log("ADDED")
          availableSpots.push(squareId);
        }
      }
    })
  });
 //   console.log("spots:" + availableSpots);
  if (availableSpots.length >= 1) {
    console.log("chose 3")
    let chosenSpot =
      availableSpots[randomInt(0, availableSpots.length - 1)];

    if (isValidMove(chosenSpot)) {
      console.log("finished 3")
      successChoose = true;
      board[chosenSpot] = aiSymbol;
      gebid(chosenSpot).innerHTML = aiSymbol;
      gebid(chosenSpot).classList.add("taken");
      moves++;
      checkWin();
      if (!gameOver) {
        switchPlayer();
      }
      aiMakingTheirStupidDecisionBecauseIdk = false;
    }
  } else {
    thinkFourth();
  }
}

function thinkFourth() {
  //last priority: pick random
  console.log("chose 4--picking random")
  let choseSpot = false;
  while(!choseSpot) {
    let chosenSquare = randomInt(0, 8);
    if(isValidMove(chosenSquare)) {
      console.log("picked random")
      choseSpot = true;
      board[chosenSquare] = aiSymbol;
      gebid(chosenSquare).innerHTML = aiSymbol;
      gebid(chosenSquare).classList.add("taken");
      moves++;
      checkWin();
      if (!gameOver) {
        switchPlayer();
      }
      aiMakingTheirStupidDecisionBecauseIdk = false;
    }
  }
}

function switchPlayer() {
  if (curPlayer === "X") {
    curPlayer = "O";
  } else {
    curPlayer = "X";
  }
  if (gamemode === "ai" && curPlayer === aiSymbol) {
    aiMakingTheirStupidDecisionBecauseIdk = true;
    setTimeout(aiMakeMove, randomInt(1500, 3000));
  }
  s("#currentPlayer").innerHTML = curPlayer;
}

let winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  if (moves === 9) {
    gameOver = true;
    s("#gameboard").removeEventListener("click", makeMove);
    endMessage = "Draw!";
    s("#end-msg").innerHTML = endMessage;

    s(".buttons").style.display = "flex";
  }
  winCombinations.forEach((combination, index) => {
    if (
      board[combination[0]] === curPlayer &&
      board[combination[1]] === curPlayer &&
      board[combination[2]] === curPlayer
    ) {
      for (let i = 0; i < combination.length; i++) {
        let winelm = gebid(combination[i]);
        winelm.classList.add("winning-square");
      }
      gameOver = true;
      s("#gameboard").removeEventListener("click", makeMove);
      if (gamemode === "ai") {
        if (curPlayer !== aiSymbol) endMessage = "You won!";
        else endMessage = "You lost!";
      } else {
        endMessage = `Game Over! Player ${curPlayer} wins!`;
      }
      s("#end-msg").innerHTML = endMessage;

      s(".buttons").style.display = "flex";
    }
  });
}
