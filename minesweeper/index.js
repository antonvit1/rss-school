let countBomb = 10;
let flag = 0;
// let countFlag = 0;
const arrayFieldSize = [10, 15, 25];
const arrayComplexity = ["Easy", "Medium", "Hard"];
const body = document.querySelector("body");
body.classList = "body";
const wrapperComplexity = document.createElement("div");
wrapperComplexity.className = "complexity-wrapper";
body.appendChild(wrapperComplexity);

//create inscription about count flag
let numberOfRemainBombs = countBomb;
let wrapperInscriptionCountFlag = document.createElement("div");
wrapperInscriptionCountFlag.className = "inscription-count-flag"
body.appendChild(wrapperInscriptionCountFlag);
let inscriptionCountFlag = document.createElement("div");
inscriptionCountFlag.className = "flag";
inscriptionCountFlag.innerHTML = "🚩";
wrapperInscriptionCountFlag.appendChild(inscriptionCountFlag)
let countFlag = document.createElement("div");
countFlag.className = "count-flag";
countFlag.innerHTML = numberOfRemainBombs;
wrapperInscriptionCountFlag.appendChild(countFlag);

let arrayOfCellAll = Array(arrayFieldSize[0] * arrayFieldSize[0]).fill(" ");
let arrayOfCell = [];
for (let i = 0; i < arrayOfCellAll.length / arrayFieldSize[0]; i++) {
  arrayOfCell[i] = arrayOfCellAll.slice(
    i * arrayFieldSize[0],
    i * arrayFieldSize[0] + arrayFieldSize[0]
  );
}

const divCell = document.createElement("div");
divCell.className = "all-cells";

body.appendChild(divCell);
arrayOfCell.forEach((element) => {
  element.forEach((value) => {
    let buttonCell = document.createElement("button");
    buttonCell.className = "cell";
    buttonCell.innerHTML = value;
    divCell.appendChild(buttonCell);

    buttonCell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (buttonCell.innerHTML === "🚩") {
        buttonCell.innerHTML = " ";
        numberOfRemainBombs -= 1;
      } else if (buttonCell.innerHTML === " ") {
        buttonCell.innerHTML = "🚩";
        numberOfRemainBombs += 1;
      } else if (buttonCell.innerHTML !== "🚩" && buttonCell.innerHTML !== " ") {
        buttonCell.innerHTML;
      }
    });
  });
});

let gameArray = [];

function fieldFilling() {
  gameArray = [];
  let smallHelpArr = [];
  let helpCountBomb = 0;

  const arrayBomb = Array(countBomb).fill("💣");

  const arrayWithoutBomb = Array(
    arrayFieldSize[0] * arrayFieldSize[0] - countBomb
  ).fill(" ");
  const totalGameArray = arrayWithoutBomb
    .concat(arrayBomb)
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i < totalGameArray.length / countBomb; i++) {
    gameArray[i] = totalGameArray.slice(
      i * arrayFieldSize[0],
      i * arrayFieldSize[0] + arrayFieldSize[0]
    );
  }
  gameArray = gameArray.map((arrInArr, i, arr) => {
    return arrInArr.map((value, index, arrCell) => {
      if (value === " ") {
        if (arrCell[index - 1] !== undefined) {
          smallHelpArr.push(arrCell[index - 1]);
        }

        if (arrCell[index + 1] !== undefined) {
          smallHelpArr.push(arrCell[index + 1]);
        }

        if (arr[i - 1] !== undefined && arr[i - 1][index - 1] !== undefined) {
          smallHelpArr.push(arr[i - 1][index - 1]);
        }
        if (arr[i - 1] !== undefined && arr[i - 1][index] !== undefined) {
          smallHelpArr.push(arr[i - 1][index]);
        }
        if (arr[i - 1] !== undefined && arr[i - 1][index + 1] !== undefined) {
          smallHelpArr.push(arr[i - 1][index + 1]);
        }
        if (arr[i + 1] !== undefined && arr[i + 1][index - 1] !== undefined) {
          smallHelpArr.push(arr[i + 1][index - 1]);
        }
        if (arr[i + 1] !== undefined && arr[i + 1][index] !== undefined) {
          smallHelpArr.push(arr[i + 1][index]);
        }
        if (arr[i + 1] !== undefined && arr[i + 1][index + 1] !== undefined) {
          smallHelpArr.push(arr[i + 1][index + 1]);
        }

        smallHelpArr.forEach((smallValue) => {
          if (smallValue === "💣") {
            helpCountBomb += 1;
          }
        });

        value = helpCountBomb;
        helpCountBomb = 0;
        smallHelpArr = [];
      }
      // else {
      //   value = "💣";
      // }
      return value;
    });
  });
  console.log(gameArray);
  gameArray = gameArray.flat();
}
fieldFilling();

let arrayOfDomButton = Array.from(document.querySelectorAll(".cell"));

function openCell() {
arrayOfDomButton.forEach((cell, index, array) => {
  cell.addEventListener("click", () => {
    if (arrayOfDomButton.every((cell) => cell.innerHTML === " ")) {
      cell.innerHTML = gameArray[index];
      while (cell.innerHTML === "💣") {
        fieldFilling();
        cell.innerHTML = gameArray[index];
      }
    }
    cell.innerHTML = gameArray[index];
    if (cell.innerHTML === "💣") {
      array.forEach((value, i) => {
        if (gameArray[i] === "💣") {
          value.innerHTML = gameArray[i];
        }
      });
      gameOver();
    }

    console.log(gameArray);

    if (cell.innerHTML === "0") {
      // cell.innerHTML = "i";
      function openNeighborCells(){
      if (
        array[index - (arrayFieldSize[0] + 1)] &&
        index % arrayFieldSize[0] !== 0
      ) {
        array[index - (arrayFieldSize[0] + 1)].innerHTML =
          gameArray[index - (arrayFieldSize[0] + 1)];
          console.log(array[index - (arrayFieldSize[0] + 1)].innerHTML);
          // if (array[index - (arrayFieldSize[0] + 1)].innerHTML !== 0){
          //   return;
          // } else {
          //  return openNeighborCells();
          // }
      }
      if (index > arrayFieldSize[0]) {
        array[index - arrayFieldSize[0]].innerHTML =
          gameArray[index - arrayFieldSize[0]];
      }
      if (
        array[index - (arrayFieldSize[0] + 1)] &&
        index % arrayFieldSize[0] !== arrayFieldSize[0] - 1
      ) {
        array[index - (arrayFieldSize[0] - 1)].innerHTML =
          gameArray[index - (arrayFieldSize[0] - 1)];
      }
      if (array[index - 1] && index % arrayFieldSize[0] !== 0) {
        array[index - 1].innerHTML = gameArray[index - 1];
      }
      if (
        array[index + 1] &&
        index % arrayFieldSize[0] !== arrayFieldSize[0] - 1
      ) {
        array[index + 1].innerHTML = gameArray[index + 1];
      }
      if (
        array[index + (arrayFieldSize[0] + 1)] &&
        index % arrayFieldSize[0] !== arrayFieldSize[0] - 1
      ) {
        array[index + (arrayFieldSize[0] + 1)].innerHTML =
          gameArray[index + (arrayFieldSize[0] + 1)];
      }
      if (array[index + arrayFieldSize[0]]) {
        array[index + arrayFieldSize[0]].innerHTML =
          gameArray[index + arrayFieldSize[0]];
      }
      if (
        array[index + (arrayFieldSize[0] - 1)] &&
        index % arrayFieldSize[0] !== 0
      )
        array[index + (arrayFieldSize[0] - 1)].innerHTML =
          gameArray[index + (arrayFieldSize[0] - 1)];
      }
      openNeighborCells();
    }
  });
});
}
openCell()
arrayOfDomButton.forEach((cell, index, array) => {
  cell.addEventListener("click", "contextmenu", () => {
    console.log("AAAAAA");
  })
})

function gameOver() {
  let messageGameOver = document.createElement("div")
  messageGameOver.className = "message-gameover";
  body.appendChild(messageGameOver);
  let phraseLose = document.createElement("div");
  phraseLose.className = "inscription-lose";
  phraseLose.innerHTML = "Game over!";
  messageGameOver.appendChild(phraseLose);
  let buttonTryAgain = document.createElement("button");
buttonTryAgain.className = "button-try-again";
buttonTryAgain.innerHTML = "Try again";
messageGameOver.appendChild(buttonTryAgain);
buttonTryAgain.addEventListener("click", () => {
  arrayOfDomButton.forEach((cell) => {
    cell.innerHTML = " ";
  })
  fieldFilling()
  openCell()
})
}
// checkbox
// arrayComplexity.forEach((value) => {
//   const complexity = document.createElement("input");
//   const textComplexity = document.createElement("label");
//   complexity.type = "radio";
//   complexity.className = "buttonComplexity";
//   textComplexity.innerHTML = value;
//   wrapperComplexity.appendChild(complexity);
//   wrapperComplexity.appendChild(textComplexity);
// });
