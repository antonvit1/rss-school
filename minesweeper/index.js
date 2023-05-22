let countBomb = 10;
let flag = 0;
let checkSound;
let checkWin = false;
let countGame = 0;
let counterWin = 0;
let second = 0;
let width;
let timerUpdate;
let countClick = 0;
let tableResults = [];
let numberOfRemainingBombs = countBomb;
const arrayComplexity = ["Easy", "Medium", "Hard"];
let complexityGame;

const body = document.querySelector("body");
body.classList = "body";

if (localStorage.getItem("complexity")) {
  complexityGame = JSON.parse(localStorage.getItem("complexity"));
} else {
  complexityGame = "Easy";
}

if (localStorage.getItem("width")) {
  width = JSON.parse(localStorage.getItem("width"));
} else {
  width = 10;
}

//create inscription about count flag

let wrapperInscriptionCountFlag = document.createElement("div");
wrapperInscriptionCountFlag.className = "inscription-count-flag";
body.appendChild(wrapperInscriptionCountFlag);

let inscriptionCountFlag = document.createElement("div");
inscriptionCountFlag.className = "flag";
inscriptionCountFlag.innerHTML = "🚩";
wrapperInscriptionCountFlag.appendChild(inscriptionCountFlag);

let countFlag = document.createElement("div");
countFlag.className = "count-flag";

if (localStorage.getItem("countBomb")) {
  countBomb = JSON.parse(localStorage.getItem("countBomb"));
}

if (localStorage.getItem("flag")) {
  numberOfRemainingBombs = JSON.parse(localStorage.getItem("flag"));
} else {
  numberOfRemainingBombs = countBomb;
}

countFlag.innerHTML = numberOfRemainingBombs;
wrapperInscriptionCountFlag.appendChild(countFlag);

const display = document.createElement("input");
display.className = "display";
display.type = "text";

display.value = countBomb;
wrapperInscriptionCountFlag.appendChild(display);

let buttonUse = document.createElement("button");
buttonUse.className = "button-use-bomb";
buttonUse.innerHTML = "Use";
wrapperInscriptionCountFlag.appendChild(buttonUse);
buttonUse.addEventListener("click", () => {
  if (display.value >= 10 && display.value <= 99) {
    countBomb = +display.value;
    createNewField();
  } else {
    let messageError = document.createElement("div");
    messageError.className = "message-error";
    bodyWrapper.classList.add("active");
    messageError.innerHTML =
      "Enter an integer number less then 99 and greater than 9!";
    body.appendChild(messageError);
    messageError.addEventListener("click", () => {
      messageError.remove();
      bodyWrapper.classList.remove("active");
    });
    bodyWrapper.addEventListener("click", () => {
      messageError.remove();
      bodyWrapper.classList.remove("active");
    });
  }
});

let mesageNoFlag = document.createElement("span");
mesageNoFlag.className = "message-no-flag";
wrapperInscriptionCountFlag.appendChild(mesageNoFlag);

const wrapperOfWrapperComplexity = document.createElement("div");
wrapperOfWrapperComplexity.className = "wrapper-of-wrapper";
body.appendChild(wrapperOfWrapperComplexity);
const divCell = document.createElement("div");
divCell.className = "all-cells";
if (window.matchMedia("(max-width: 660px)").matches) {
  divCell.style.gridTemplateColumns = `repeat(${width}, 15px)`;
} else {
  divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;
}
const downWrapper = document.createElement("div");
downWrapper.className = "down-wrapperty";
body.appendChild(downWrapper);

if (localStorage.getItem("click")) {
  countClick = JSON.parse(localStorage.getItem("click"));
}

if (localStorage.getItem("time")) {

  if (countClick) {
    second = JSON.parse(localStorage.getItem("time"));
    timerUpdate = setInterval(() => {
      second += 1;
      timer.innerHTML = second;
    }, 1000);
  }
}

//complexity
const wrapperComplexity = document.createElement("div");
wrapperComplexity.className = "complexity-wrapper";
downWrapper.appendChild(wrapperComplexity);

arrayComplexity.forEach((value) => {
  const textComplexity = document.createElement("label");
  textComplexity.className = "buttonComplexityText";
  textComplexity.innerHTML = value;

  wrapperComplexity.appendChild(textComplexity);
});

const imgRestart = document.createElement("i");
imgRestart.className = "ri-loop-left-line";

downWrapper.appendChild(imgRestart);

imgRestart.addEventListener("click", () => {
  createNewField();
});

let arrOfDomComplexity = Array.from(
  document.querySelectorAll(".buttonComplexityText")
);

arrOfDomComplexity.forEach((choice, index, arr) => {

  if (choice.innerHTML === complexityGame) {
    choice.classList.add("active");
  }

  choice.addEventListener("click", () => {
    arr.forEach((compl) => {
      compl.classList.remove("active");
    });

    choice.classList.add("active");
    if (choice.innerHTML === "Easy") {
      width = 10;
      complexityGame = "Easy";
      choice.classList.add("active");
      createNewField();
    } else if (choice.innerHTML === "Medium") {
      width = 15;
      complexityGame = "Medium";
      createNewField();
    } else if (choice.innerHTML === "Hard") {
      width = 25;
      complexityGame = "Hard";
      createNewField();
    }
    if (window.matchMedia("(max-width: 660px)").matches) {
      divCell.style.gridTemplateColumns = `repeat(${width}, 15px)`;
    } else {
      divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;
    }
  });
});

const soundOnOff = document.createElement("i");
soundOnOff.className = "sound-on-off ri-volume-up-line";
wrapperInscriptionCountFlag.appendChild(soundOnOff);

if (JSON.parse(localStorage.getItem("checkSound"))) {
  soundOnOff.classList.remove("ri-volume-mute-line");
  soundOnOff.classList.remove("ri-volume-up-line");

  if (JSON.parse(localStorage.getItem("checkSound")) === "on") {
    soundOnOff.classList.add("ri-volume-up-line");
    soundOnOff.classList.remove("ri-volume-mute-line");
    checkSound = "on";
  } else if (JSON.parse(localStorage.getItem("checkSound")) === "off") {
    soundOnOff.classList.remove("ri-volume-up-line");
    soundOnOff.classList.add("ri-volume-mute-line");
    checkSound = "off";
  }
} else {
  checkSound = "on";
}

soundOnOff.addEventListener("click", () => {
  if (checkSound === "on") {
    soundOnOff.classList.remove("ri-volume-up-line");
    soundOnOff.classList.add("ri-volume-mute-line");
    checkSound = "off";
  } else {
    soundOnOff.classList.remove("ri-volume-mute-line");
    soundOnOff.classList.add("ri-volume-up-line");
    checkSound = "on";
  }
});

function createNewField() {
  numberOfRemainingBombs = countBomb;
  countFlag.innerHTML = numberOfRemainingBombs;
  countClick = 0;
  second = 0;
  timer.innerHTML = second;
  clickNumber.innerHTML = countClick;
  while (divCell.firstChild) {
    divCell.removeChild(divCell.firstChild);
  }
  writtenDom();
  fieldFilling();
  clearInterval(timerUpdate);
  openCell();
}

const timerWrapper = document.createElement("div");
timerWrapper.className = "timer-wrapper";
wrapperInscriptionCountFlag.appendChild(timerWrapper);
const timerImg = document.createElement("i");
timerImg.className = "ri-timer-line";

timerWrapper.appendChild(timerImg);
const timer = document.createElement("div");
timer.className = "timer";
timer.innerHTML = second;
timerWrapper.appendChild(timer);

const clickWrapper = document.createElement("div");
clickWrapper.className = "click-wrapper";
wrapperInscriptionCountFlag.appendChild(clickWrapper);
const clickImg = document.createElement("i");
clickImg.className = "ri-cursor-line";

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

        if (numberOfRemainingBombs > 0) {
          if (buttonCell.innerHTML === "🚩") {
            buttonCell.innerHTML = " ";
            numberOfRemainingBombs += 1;
            countFlag.innerHTML = numberOfRemainingBombs;
            if (checkSound === "on") {
              playSound("bomb");
            }
          } else if (buttonCell.innerHTML === " ") {
            buttonCell.innerHTML = "🚩";
            numberOfRemainingBombs -= 1;
            countFlag.innerHTML = numberOfRemainingBombs;
            if (checkSound === "on") {
              playSound("bomb");
            }
          } else if (
            buttonCell.innerHTML !== "🚩" &&
            buttonCell.innerHTML !== " "
          ) {
            buttonCell.innerHTML;
            if (checkSound === "on") {
              playSound("bomb");
            }
          } else if (numberOfRemainingBombs > 0) {
            mesageNoFlag.innerHTML = "You used all the flags!";
          }
        } else {
          if (buttonCell.innerHTML === "🚩") {
            buttonCell.innerHTML = " ";
            numberOfRemainingBombs += 1;
            countFlag.innerHTML = numberOfRemainingBombs;
            mesageNoFlag.innerHTML = "";
            if (checkSound === "on") {
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

  gameArray = gameArray.flat();
}

if (localStorage.getItem("gameArray")) {
  gameArray = JSON.parse(localStorage.getItem("gameArray"));
} else {
  fieldFilling();
}

let arrayOfDomButton = Array.from(document.querySelectorAll(".cell"));
function openCell() {
  arrayOfDomButton = Array.from(document.querySelectorAll(".cell"));
  arrayOfDomButton.forEach((cell, index, array) => {
    cell.addEventListener("click", () => {
      if (!cell.classList.contains("checked") && cell.innerHTML === " ") {
        countClick += 1;
        if (checkSound === "on") {
          playSound("one-click");
        }
      }

      clickNumber.innerHTML = countClick;
      if (arrayOfDomButton.every((cell) => cell.innerHTML === " ")) {

        cell.innerHTML = gameArray[index];
        while (cell.innerHTML === "💣") {
          fieldFilling();
          cell.innerHTML = gameArray[index];
        }
        timerUpdate = setInterval(() => {
          second += 1;
          timer.innerHTML = second;
        }, 1000);
      }
      cell.innerHTML = gameArray[index];
      if (cell.innerHTML === "💣") {
        if (checkSound === "on") {
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
        function openNeighborCells(currentIndex) {
          if (
            array[currentIndex - (width + 1)] &&
            !array[currentIndex - (width + 1)].classList.contains("checked") &&
            currentIndex % width !== 0
          ) {
            array[currentIndex - (width + 1)].innerHTML =
              gameArray[currentIndex - (width + 1)];
            array[currentIndex - (width + 1)].classList.add("checked");

            if (array[currentIndex - (width + 1)].innerHTML === "0") {
              openNeighborCells(currentIndex - (width + 1));
            }
          }
          if (
            currentIndex > width &&
            !array[currentIndex - width].classList.contains("checked")
          ) {
            array[currentIndex - width].innerHTML =
              gameArray[currentIndex - width];
            array[currentIndex - width].classList.add("checked");
            if (array[currentIndex - width].innerHTML === "0") {
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

            if (array[currentIndex - (width - 1)].innerHTML === "0") {
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
        addColorsToNumbers(buttonEmpty);
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

            checkWin = false;
          }
        }
        if (buttonEmpty.innerHTML === "🚩") {
          differenceOfFlags += 1;
        }
      });
      numberOfRemainingBombs = countBomb - differenceOfFlags;
      countFlag.innerHTML = numberOfRemainingBombs;
    });
  });
}

function addColorsToNumbers(buttonEmpty) {
  if (buttonEmpty.innerHTML === "0") {
    buttonEmpty.classList.add("zero");
  }
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
}

if (localStorage.getItem("arrayOfDomButton")) {
  const arrayLocalStorage = JSON.parse(
    localStorage.getItem("arrayOfDomButton")
  );
  arrayOfDomButton.forEach((cellEl, index, arr) => {
    if (arrayLocalStorage[index] !== " " && arrayLocalStorage[index] !== "🚩") {
      cellEl.classList.add("checked");
      cellEl.innerHTML = arrayLocalStorage[index];
      addColorsToNumbers(cellEl);
    } else if (arrayLocalStorage[index] === "🚩") {
      cellEl.innerHTML = arrayLocalStorage[index];
    }
  });
}
openCell();

function messageEndGame() {
  clearInterval(timerUpdate);
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
    phraseFinalGame.innerHTML = `Hooray! You found all mines in ${second} seconds and ${countClick} moves!`;
    if (checkSound === "on") {
      playSound("win");
    }
  } else {
    imgGameFinal.src = `./assets/img/sadsmiley.svg`;
    phraseFinalGame.innerHTML = "Game over!";
  }
  bodyWrapper.classList.add("active");
  buttonTryAgain.addEventListener("click", () => {
    createNewField();
    bodyWrapper.classList.remove("active");
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
buttonResult.innerHTML = "Table results";
body.appendChild(buttonResult);

let bodyWrapper = document.createElement("div");
bodyWrapper.className = "body-wrapper";
body.appendChild(bodyWrapper);

buttonResult.addEventListener("click", () => {
  bodyWrapper.classList.add("active");
  resultOfGame();
});

const arrayTable = ["Game №", "Fild", "Bomb", "Time", "Click"];
let tr;
let td;
let th;
let tableResult;
function resultOfGame() {
  tableResult = document.createElement("table");
  tableResult.className = "fild-result";
  body.appendChild(tableResult);
  for (let i = 0; i < arrayTable.length; i++) {

    td = document.createElement("td");
    td.className = "td";

    tableResult.appendChild(td);
    th = document.createElement("th");
    th.className = "th";
    th.innerHTML = arrayTable[i];
    td.appendChild(th);
    for (let k = 0; k < tableResults.length; k++) {
      tr = document.createElement("tr");
      tr.className = "tr";
      tr.innerHTML = Object.values(tableResults[k])[i];
      td.appendChild(tr);
    }
  }
  closeVisul();
}
function closeVisul() {
  let buttonCloseTable = document.createElement("button");
  buttonCloseTable.className = "button-close-table";
  let imgClose = document.createElement("img");
  imgClose.src = `./assets/img/close.svg`;
  imgClose.alt = "cross";
  tableResult.appendChild(buttonCloseTable);
  buttonCloseTable.appendChild(imgClose);

  bodyWrapper.addEventListener("click", () => {
    buttonCloseTable.remove();
    tableResult.remove();
    bodyWrapper.classList.remove("active");
  });
  buttonCloseTable.addEventListener("click", () => {
    buttonCloseTable.remove();
    tableResult.remove();
    bodyWrapper.classList.remove("active");
  });
}
const wrapperStyleWrapper = document.createElement("div");
wrapperStyleWrapper.className = "wrupper-style-wrapper";
body.appendChild(wrapperStyleWrapper);

const styleWrapper = document.createElement("div");
styleWrapper.className = "style-wrapper";
wrapperStyleWrapper.appendChild(styleWrapper);

const darkStyle = document.createElement("button");
darkStyle.className = "dark-style";
darkStyle.innerHTML = "Dark style";
styleWrapper.appendChild(darkStyle);

const lightStyle = document.createElement("button");
lightStyle.className = "light-style";
lightStyle.innerHTML = "Light style";
styleWrapper.appendChild(lightStyle);

darkStyle.addEventListener("click", () => {
  body.classList.add("style");
});

lightStyle.addEventListener("click", () => {
  body.classList.remove("style");
});

function saveInLocalStorage() {
  localStorage.setItem("flag", numberOfRemainingBombs);
  localStorage.setItem("time", second);
  localStorage.setItem("complexity", JSON.stringify(complexityGame));
  localStorage.setItem("click", countClick);
  localStorage.setItem("countBomb", countBomb);
  localStorage.setItem("width", width);
  localStorage.setItem("checkSound", JSON.stringify(checkSound));
  localStorage.setItem("gameArray", JSON.stringify(gameArray));
  let lSarrayOfDomButton = arrayOfDomButton.map((value) => {
    return value.innerHTML;
  });
  localStorage.setItem("arrayOfDomButton", JSON.stringify(lSarrayOfDomButton));
}

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 660px)").matches) {
    divCell.style.gridTemplateColumns = `repeat(${width}, 15px)`;
  } else {
    divCell.style.gridTemplateColumns = `repeat(${width}, 25px)`;
  }
});

window.addEventListener("beforeunload", (event) => {
  if (document.querySelector(".message-final") !== null) {
    createNewField();
  }
  saveInLocalStorage();
});
