let countBomb = 2;
let flag = 0;
let checkSound = true;
let checkWin = false;
let counterWin = 0;
let second = 0;
let width = 10;
let timerUpdate;
let countClick = 0;

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
downWrapper.className = "down-wrapperty"
body.appendChild(downWrapper)
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
  createNewFild()
})

let arrOfDomComplexity = Array.from(
  document.querySelectorAll(".buttonComplexityText")
);
arrOfDomComplexity.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.innerHTML === "Easy") {
      width = 10;
      createNewFild();
    } else if (choice.innerHTML === "Medium") {
      width = 15;
      createNewFild();
    } else if (choice.innerHTML === "Hard") {
      width = 25;
      createNewFild();
    }
  });
});

function createNewFild() {
  // countBomb = Math.floor(Math.random() * 90) + 10;
  countBomb = 2;
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

function openCell() {
  let arrayOfDomButton = Array.from(document.querySelectorAll(".cell"));
  arrayOfDomButton.forEach((cell, index, array) => {
    cell.addEventListener("click", () => {
      countClick += 1;
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
        gameOver();

      }

      if (cell.innerHTML === "0") {
        if (checkSound) {
          playSound("one-click");
        }
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
      if (cell.innerHTML !== "0" && cell.innerHTML !== "💣" && checkSound) {
        playSound("one-click");
      }
      counterWin = 0;
      arrayOfDomButton.forEach((buttonEmpty, indBut, arrbut) => {

    if (buttonEmpty.innerHTML !== "🚩" && buttonEmpty.innerHTML !== " " && buttonEmpty.innerHTML !== "💣" ) {
    counterWin += 1;
    console.log(counterWin);
    if (width * width - countBomb === counterWin) {
      checkWin = true;
         gameOver()
      checkWin = false;
    }

    }
      })

    });

  });

}
openCell();

function gameOver() {
  let messageGameOver = document.createElement("div");
  messageGameOver.className = "message-gameover";
  body.appendChild(messageGameOver);
  let imgGame = document.createElement("img");
  imgGame.className = "img-game";

  messageGameOver.appendChild(imgGame)
  let phraseLose = document.createElement("div");
  phraseLose.className = "inscription-lose";

  messageGameOver.appendChild(phraseLose);
  let buttonTryAgain = document.createElement("button");
  buttonTryAgain.className = "button-try-again";
  buttonTryAgain.innerHTML = "Try again";
  messageGameOver.appendChild(buttonTryAgain);
if (checkWin) {
  imgGame.src = `./assets/img/smiley.svg`
  phraseLose.innerHTML = "You are win! Congratulation!";
  if (checkSound) {
  playSound("win");
  }
} else {
  imgGame.src = `./assets/img/sadsmiley.svg`
  phraseLose.innerHTML = "Game over!";
}

  buttonTryAgain.addEventListener("click", () => {
    createNewFild()
    messageGameOver.removeChild(messageGameOver.firstChild)
    messageGameOver.removeChild(messageGameOver.firstChild)
    messageGameOver.removeChild(messageGameOver.firstChild)
    messageGameOver.remove();

  });
}

function playSound(typeSound) {
  let audio = document.createElement("audio");
  audio.src = `./assets/audio/${typeSound}.mp3`;
  audio.autoplay = true;
  return true;
}
