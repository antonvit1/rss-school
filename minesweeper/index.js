let countBomb = 5;
let flag = 0;
let checkSound = true;

let width = 10;
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


// checkbox
const wrapperComplexity = document.createElement("div");
wrapperComplexity.className = "complexity-wrapper";
body.appendChild(wrapperComplexity);

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

let arrOfDomComplexity = Array.from(document.querySelectorAll(".buttonComplexityText"));
arrOfDomComplexity.forEach((choice) => {

  choice.addEventListener("click", () => {
  if (choice.innerHTML === "Easy") {

    width = 10;
    numberOfRemainBombs = countBomb;
    countFlag.innerHTML = numberOfRemainBombs;

    while(divCell.firstChild){
      divCell.removeChild(divCell.firstChild)
      }
    writtenDom()
    fieldFilling();
    openCell();

    divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;

  } else if (choice.innerHTML === "Medium") {
    width = 15;
    numberOfRemainBombs = countBomb;
    countFlag.innerHTML = numberOfRemainBombs;

    while(divCell.firstChild){
    divCell.removeChild(divCell.firstChild)
    }
    writtenDom()
    fieldFilling();
    openCell();
    divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;

  } else if (choice.innerHTML === "Hard") {
    width = 25;
    numberOfRemainBombs = countBomb;
    countFlag.innerHTML = numberOfRemainBombs;

    while(divCell.firstChild){
      divCell.removeChild(divCell.firstChild)
      }
    writtenDom()
    fieldFilling();
    openCell();
    divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;

  }
  });
});





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
writtenDom()

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
      if (arrayOfDomButton.every((cell) => cell.innerHTML === " ")) {
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
    });
  });
}
openCell();

function gameOver() {
  let messageGameOver = document.createElement("div");
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
    });
    fieldFilling();
    openCell();
  });
}

function playSound(typeSound) {
  let audio = document.createElement("audio");
  audio.src = `./assets/audio/${typeSound}.mp3`;
  audio.autoplay = true;
  return true;
}



