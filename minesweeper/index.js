let countBomb = 2;
let flag = 0;
let checkSound = true;
let checkWin = false;
let countGame = 0;
let counterWin = 0;
let second = 0;
let width = 10;
let timerUpdate;
let countClick = 0;
let tableResults = [];
let complexityGame = "Easy";
const arrayComplexity = ["Easy", "Medium", "Hard"];
const body = document.querySelector("body");
body.classList = "body";

//create inscription about count flag
let numberOfRemainBombs = countBomb;
let wrapperInscriptionCountFlag = document.createElement("div");
wrapperInscriptionCountFlag.className = "inscription-count-flag";
body.appendChild(wrapperInscriptionCountFlag);

let inscriptionCountFlag = document.createElement("div");
inscriptionCountFlag.className = "flag";
inscriptionCountFlag.innerHTML = "🚩";
wrapperInscriptionCountFlag.appendChild(inscriptionCountFlag);

let countFlag = document.createElement("div");
countFlag.className = "count-flag";
countFlag.innerHTML = numberOfRemainBombs;
wrapperInscriptionCountFlag.appendChild(countFlag);

const display = document.createElement("input");
display.className = "display";
display.type = "text";
wrapperInscriptionCountFlag.appendChild(display);
// display.focus();

let buttonUse = document.createElement("button");
buttonUse.className = "button-use-bomb";
buttonUse.innerHTML = "Use";
wrapperInscriptionCountFlag.appendChild(buttonUse);
buttonUse.addEventListener("click", () => {
  if (display.value >= 10 && display.value <= 99) {
    countBomb = display.value;
    createNewFild();
  }
  // else {
  //   let messageError = document.createElement("div");
  //   messageError.className = "message-error";
  //   messageError.innerHTML = "Enter an integer number less then 99 and greater than 9";
  //   body.appendChild(messageError);
  //   messageError.addEventListener("click", () => {
  //     messageError.remove();
  //   })
  // }
});

let mesageNoFlag = document.createElement("span");
mesageNoFlag.className = "message-no-flag";
wrapperInscriptionCountFlag.appendChild(mesageNoFlag);

const wrapperOfWrapperComplexity = document.createElement("div");
wrapperOfWrapperComplexity.className = "wrapper-of-wrapper";
body.appendChild(wrapperOfWrapperComplexity);
const divCell = document.createElement("div");
divCell.className = "all-cells";
divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;

const downWrapper = document.createElement("div");
downWrapper.className = "down-wrapperty";
body.appendChild(downWrapper);

// checkbox
const wrapperComplexity = document.createElement("div");
wrapperComplexity.className = "complexity-wrapper";
downWrapper.appendChild(wrapperComplexity);

arrayComplexity.forEach((value) => {
  const complexity = document.createElement("input");
  const textComplexity = document.createElement("label");
  complexity.type = "radio";
  complexity.name = "complexity";
  complexity.className = "buttonComplexity";
  textComplexity.className = "buttonComplexityText";
  textComplexity.innerHTML = value;
  wrapperComplexity.appendChild(complexity);
  wrapperComplexity.appendChild(textComplexity);
});

const imgRestart = document.createElement("img");
imgRestart.className = "restart";
imgRestart.src = `./assets/img/restart.svg`;
downWrapper.appendChild(imgRestart);

imgRestart.addEventListener("click", () => {
  createNewFild();
});

let arrOfDomComplexity = Array.from(
  document.querySelectorAll(".buttonComplexityText")
);
arrOfDomComplexity.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.innerHTML === "Easy") {
      width = 10;
      complexityGame = "Easy";
      createNewFild();
    } else if (choice.innerHTML === "Medium") {
      width = 15;
      complexityGame = "Medium";
      createNewFild();
    } else if (choice.innerHTML === "Hard") {
      width = 25;
      complexityGame = "Hard";
      createNewFild();
    }
  });
});

function createNewFild() {
  // countBomb = Math.floor(Math.random() * 90) + 10;

  numberOfRemainBombs = countBomb;
  countFlag.innerHTML = numberOfRemainBombs;
  countClick = 0;
  clickNumber.innerHTML = countClick;
  while (divCell.firstChild) {
    divCell.removeChild(divCell.firstChild);
  }
  writtenDom();
  fieldFilling();
  clearInterval(timerUpdate);
  second = 0;
  timer.innerHTML = second;
  openCell();
  divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;
}

const soundOnOff = document.createElement("img");
soundOnOff.className = "sound-on-off";
soundOnOff.src = `./assets/img/sound-on.svg`;
wrapperInscriptionCountFlag.appendChild(soundOnOff);

soundOnOff.addEventListener("click", () => {
  if (checkSound) {
    soundOnOff.src = `./assets/img/sound-off.svg`;
    checkSound = false;
  } else {
    soundOnOff.src = `./assets/img/sound-on.svg`;
    checkSound = true;
  }
});

const timerWrapper = document.createElement("div");
timerWrapper.className = "timer-wrapper";
wrapperInscriptionCountFlag.appendChild(timerWrapper);
const timerImg = document.createElement("img");
timerImg.className = "timer-img";
timerImg.src = `./assets/img/timer.svg`;
timerWrapper.appendChild(timerImg);
const timer = document.createElement("div");
timer.className = "timer";
timer.innerHTML = second;
timerWrapper.appendChild(timer);

const clickWrapper = document.createElement("div");
clickWrapper.className = "click-wrapper";
wrapperInscriptionCountFlag.appendChild(clickWrapper);
const clickImg = document.createElement("img");
clickImg.className = "click-img";
clickImg.src = `./assets/img/click.svg`;
clickWrapper.appendChild(clickImg);
const clickNumber = document.createElement("div");
clickNumber.className = "click-number";
clickNumber.innerHTML = countClick;
clickWrapper.appendChild(clickNumber);

wrapperOfWrapperComplexity.appendChild(divCell);
function writtenDom() {
  let arrayOfCellAll = Array(width * width).fill(" ");
  let arrayOfCell = [];
  for (let i = 0; i < arrayOfCellAll.length / width; i++) {
    arrayOfCell[i] = arrayOfCellAll.slice(i * width, i * width + width);
  }
  arrayOfCell.forEach((element) => {
    element.forEach((value) => {
      let buttonCell = document.createElement("button");
      buttonCell.className = "cell";
      buttonCell.innerHTML = value;
      divCell.appendChild(buttonCell);

      buttonCell.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        if (numberOfRemainBombs > 0) {
          if (buttonCell.innerHTML === "🚩") {
            buttonCell.innerHTML = " ";
            numberOfRemainBombs += 1;
            countFlag.innerHTML = numberOfRemainBombs;
            if (checkSound) {
              playSound("bomb");
            }
          } else if (buttonCell.innerHTML === " ") {
            buttonCell.innerHTML = "🚩";
            numberOfRemainBombs -= 1;
            countFlag.innerHTML = numberOfRemainBombs;
            if (checkSound) {
              playSound("bomb");
            }
          } else if (
            buttonCell.innerHTML !== "🚩" &&
            buttonCell.innerHTML !== " "
          ) {
            buttonCell.innerHTML;
            if (checkSound) {
              playSound("bomb");
            }
          } else if (numberOfRemainBombs > 0) {
            mesageNoFlag.innerHTML = "You used all the flags!";
          }
        } else {
          if (buttonCell.innerHTML === "🚩") {
            buttonCell.innerHTML = " ";
            numberOfRemainBombs += 1;
            countFlag.innerHTML = numberOfRemainBombs;
            mesageNoFlag.innerHTML = "";
            if (checkSound) {
              playSound("bomb");
            }
          } else {
            mesageNoFlag.innerHTML = "You used all the flags!";
          }
        }
      });
    });
  });
}
writtenDom();

let gameArray = [];

function fieldFilling() {
  gameArray = [];
  let smallHelpArr = [];
  let helpCountBomb = 0;

  const arrayBomb = Array(countBomb).fill("💣");

  const arrayWithoutBomb = Array(width * width - countBomb).fill(" ");
  const totalGameArray = arrayWithoutBomb
    .concat(arrayBomb)
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i < totalGameArray.length / width; i++) {
    gameArray[i] = totalGameArray.slice(i * width, i * width + width);
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
      return value;
    });
  });
  console.log(gameArray);
  gameArray = gameArray.flat();
}
fieldFilling();

let a = 0;

function openCell() {
  let arrayOfDomButton = Array.from(document.querySelectorAll(".cell"));
  arrayOfDomButton.forEach((cell, index, array) => {
    cell.addEventListener("click", () => {
      if (!cell.classList.contains("checked") && cell.innerHTML === " ") {
        countClick += 1;
        if (checkSound) {
          playSound("one-click");
        }
      }

      clickNumber.innerHTML = countClick;
      if (arrayOfDomButton.every((cell) => cell.innerHTML === " ")) {
        timerUpdate = setInterval(() => {
          second += 1;
          timer.innerHTML = second;
        }, 1000);
        cell.innerHTML = gameArray[index];
        while (cell.innerHTML === "💣") {
          fieldFilling();
          cell.innerHTML = gameArray[index];
        }
      }
      cell.innerHTML = gameArray[index];
      if (cell.innerHTML === "💣") {
        if (checkSound) {
          playSound("game-over");
        }
        array.forEach((value, i) => {
          if (gameArray[i] === "💣") {
            value.innerHTML = gameArray[i];
          }
        });
        checkWin = false;
        messageEndGame();
      }

      if (cell.innerHTML === "0") {
        // cell.innerHTML = "i";
        function openNeighborCells(currentIndex) {
          // if (array[currentIndex].classList.contains("checked")) return;
          if (
            array[currentIndex - (width + 1)] &&
            !array[currentIndex - (width + 1)].classList.contains("checked") &&
            currentIndex % width !== 0
          ) {
            array[currentIndex - (width + 1)].innerHTML =
              gameArray[currentIndex - (width + 1)];
            array[currentIndex - (width + 1)].classList.add("checked");

            if (array[currentIndex - (width + 1)].innerHTML === "0") {
              // console.log("left-top-diagonal", currentIndex);

              openNeighborCells(currentIndex - (width + 1));
            }
          }
          if (
            currentIndex > width &&
            !array[currentIndex - width].classList.contains("checked")
          ) {
            // console.log("AAAAAAAAAAA");
            array[currentIndex - width].innerHTML =
              gameArray[currentIndex - width];
            array[currentIndex - width].classList.add("checked");
            if (array[currentIndex - width].innerHTML === "0") {
              // console.log("top", currentIndex);
              openNeighborCells(currentIndex - width);
            }
          }
          if (
            array[currentIndex - (width - 1)] &&
            !array[currentIndex - (width - 1)].classList.contains("checked") &&
            currentIndex % width !== width - 1
          ) {
            array[currentIndex - (width - 1)].innerHTML =
              gameArray[currentIndex - (width - 1)];
            array[currentIndex - (width - 1)].classList.add("checked");
            // console.log("right-diagonal", currentIndex);
            if (array[currentIndex - (width - 1)].innerHTML === "0") {
              // console.log("recursive right-top-diagonal");
              openNeighborCells(currentIndex - (width - 1));
            }
          }

          if (
            array[currentIndex + 1] &&
            !array[currentIndex + 1].classList.contains("checked") &&
            currentIndex % width !== width - 1
          ) {
            array[currentIndex + 1].innerHTML = gameArray[currentIndex + 1];
            array[currentIndex + 1].classList.add("checked");
            if (array[currentIndex + 1].innerHTML === "0") {
              // console.log("right", currentIndex);
              openNeighborCells(currentIndex + 1);
            }
          }

          if (
            array[currentIndex + (width + 1)] &&
            !array[currentIndex + (width + 1)].classList.contains("checked") &&
            currentIndex % width !== width - 1
          ) {
            array[currentIndex + (width + 1)].innerHTML =
              gameArray[currentIndex + (width + 1)];
            array[currentIndex + (width + 1)].classList.add("checked");
            if (array[currentIndex + (width + 1)].innerHTML === "0") {
              // console.log("bottom-right-diagonal", currentIndex);
              openNeighborCells(currentIndex + (width + 1));
            }
          }
          if (
            array[currentIndex + width] &&
            !array[currentIndex + width].classList.contains("checked")
          ) {
            array[currentIndex + width].innerHTML =
              gameArray[currentIndex + width];
            array[currentIndex + width].classList.add("checked");
            if (array[currentIndex + width].innerHTML === "0") {
              // console.log("bottom", currentIndex);
              openNeighborCells(currentIndex + width);
            }
          }
          if (
            array[currentIndex + (width - 1)] &&
            !array[currentIndex + (width - 1)].classList.contains("checked") &&
            currentIndex % width !== 0
          ) {
            array[currentIndex + (width - 1)].innerHTML =
              gameArray[currentIndex + (width - 1)];
            array[currentIndex + (width - 1)].classList.add("checked");
            if (array[currentIndex + (width - 1)].innerHTML === "0") {
              // console.log("left-bottom-diagonal", currentIndex);
              openNeighborCells(currentIndex + (width - 1));
            }
          }
          if (
            array[currentIndex - 1] &&
            !array[currentIndex - 1].classList.contains("checked") &&
            currentIndex % width !== 0
          ) {
            array[currentIndex - 1].innerHTML = gameArray[currentIndex - 1];
            array[currentIndex - 1].classList.add("checked");
            if (array[currentIndex - 1].innerHTML === "0") {
              // console.log("left", currentIndex);
              openNeighborCells(currentIndex - 1);
            }
          }
          return;
        }
        openNeighborCells(index);
      }

      counterWin = 0;
      let differenceOfFlags = 0;
      arrayOfDomButton.forEach((buttonEmpty, indBut, arrbut) => {
        if (buttonEmpty.innerHTML === "1") {
          buttonEmpty.classList.add("one");
        }
        if (buttonEmpty.innerHTML === "2") {
          buttonEmpty.classList.add("two");
        }
        if (buttonEmpty.innerHTML === "3") {
          buttonEmpty.classList.add("three");
        }
        if (buttonEmpty.innerHTML === "4") {
          buttonEmpty.classList.add("four");
        }
        if (buttonEmpty.innerHTML === "5") {
          buttonEmpty.classList.add("five");
        }
        if (buttonEmpty.innerHTML === "6") {
          buttonEmpty.classList.add("six");
        }
        if (buttonEmpty.innerHTML === "7") {
          buttonEmpty.classList.add("seven");
        }
        if (buttonEmpty.innerHTML === "8") {
          buttonEmpty.classList.add("eight");
        }
        if (
          buttonEmpty.innerHTML !== "🚩" &&
          buttonEmpty.innerHTML !== " " &&
          buttonEmpty.innerHTML !== "💣"
        ) {
          counterWin += 1;

          if (width * width - countBomb === counterWin) {
            countGame += 1;
            checkWin = true;
            messageEndGame();
            tableResults.push({
              Game: countGame,
              fild: complexityGame,
              Bomb: countBomb,
              Time: second,
              Click: countClick,
            });

            if (tableResults.length > 10) {
tableResults.reverse().splice(-1, 1);
tableResults.reverse();
            }
            console.log(tableResults);
            checkWin = false;
          }
        }
        if (buttonEmpty.innerHTML === "🚩") {
          differenceOfFlags += 1;
        }
      });
      numberOfRemainBombs = countBomb - differenceOfFlags;
      countFlag.innerHTML = numberOfRemainBombs;
    });
  });
}
openCell();

function messageEndGame() {
  let messageFinalGame = document.createElement("div");
  messageFinalGame.className = "message-final";
  body.appendChild(messageFinalGame);
  let imgGameFinal = document.createElement("img");
  imgGameFinal.className = "img-game-final";

  messageFinalGame.appendChild(imgGameFinal);
  let phraseFinalGame = document.createElement("div");
  phraseFinalGame.className = "final-game-inscription";

  messageFinalGame.appendChild(phraseFinalGame);
  let buttonTryAgain = document.createElement("button");
  buttonTryAgain.className = "button-try-again";
  buttonTryAgain.innerHTML = "Try again";
  messageFinalGame.appendChild(buttonTryAgain);
  if (checkWin) {
    imgGameFinal.src = `./assets/img/smiley.svg`;
    phraseFinalGame.innerHTML = "You are win! Congratulation!";
    if (checkSound) {
      playSound("win");
    }
  } else {
    imgGameFinal.src = `./assets/img/sadsmiley.svg`;
    phraseFinalGame.innerHTML = "Game over!";
  }
  bodyWrapper.classList.add("active");
  buttonTryAgain.addEventListener("click", () => {
    createNewFild();
    bodyWrapper.classList.toggle("active");
    messageFinalGame.removeChild(messageFinalGame.firstChild);
    messageFinalGame.removeChild(messageFinalGame.firstChild);
    messageFinalGame.removeChild(messageFinalGame.firstChild);
    messageFinalGame.remove();
  });
}

function playSound(typeSound) {
  let audio = document.createElement("audio");
  audio.src = `./assets/audio/${typeSound}.mp3`;
  audio.autoplay = true;
  return true;
}


let buttonResult = document.createElement("button");
buttonResult.className = "button-results";
buttonResult.innerHTML = "Last results";
body.appendChild(buttonResult);

let bodyWrapper = document.createElement("div");
bodyWrapper.className = "body-wrapper";
body.appendChild(bodyWrapper);

buttonResult.addEventListener("click", () => {
  bodyWrapper.classList.add("active");
resultOfGame();
})
const arrayTable = ["Game №","Fild", "Bomb", "Time", "Click"]
function resultOfGame() {
let tr;
let td;
let th
let tableResult = document.createElement("table");
tableResult.className = "fild-result";
body.appendChild(tableResult);
for (let i = 0; i < arrayTable.length; i++) {
  console.log(tableResults[i]);
	 td = document.createElement("td");
   td.className = "td";

   tableResult.appendChild(td)
   th = document.createElement("th")
   th.className = "th";
   th.innerHTML = arrayTable[i];
   td.appendChild(th)
	for (let k = 0; k < tableResults.length; k++) {

		 tr = document.createElement('tr');
     tr.className = "tr";
       tr.innerHTML = Object.values(tableResults[k])[i];
     td.appendChild(tr);
	}

}

let buttonCloseTable = document.createElement("button");
buttonCloseTable.className = "button-close-table";
let imgClose = document.createElement("img");
imgClose.src = `./assets/img/close.svg`;
imgClose.alt = "cross";
tableResult.appendChild(buttonCloseTable);
buttonCloseTable.appendChild(imgClose);

bodyWrapper.addEventListener("click", () => {
  buttonCloseTable.remove();
  tableResult.remove()
  bodyWrapper.classList.toggle("active");
})
buttonCloseTable.addEventListener("click", () => {
  buttonCloseTable.remove();
  tableResult.remove()
  bodyWrapper.classList.toggle("active");
})
}




