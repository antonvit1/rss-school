import "./style.css";
import levelsFromJson from "./allLevels.json";
import levelsDescriptions from "./levelsDescriptions.json";
import { changeTextRightSect } from "./levelsDescription";
import { levelsOfMenu } from "./levelsMenu";
import { btnRessetProgress } from "./levelsMenu";
import { markLevelsOfMenu } from "./levelsMenu";
import { HtmlCode, Image, Level, LevelDescription } from "./types";

export let currentLevel: number = 0;
let levels: Level[] = [];

const rightBtn = <HTMLElement>document.querySelector(".right-button");
const leftBtn = <HTMLElement>document.querySelector(".left-button");
const winMessage = <HTMLElement>document.querySelector(".win-message");
const buttonHelp = <HTMLElement>document.querySelector(".button-help");
const addClassBody = <HTMLElement>document.querySelector(".body");
const taskName = <HTMLElement>document.querySelector(".task-name");
const htmlContent = <HTMLElement>document.querySelector(".html-content");
const currentLevelEl = <HTMLElement>document.querySelector(".current-level");

const answerTask = <HTMLInputElement>document.querySelector("#input-answer");
const buttonEnter = <HTMLElement>document.querySelector(".img-enter");
const allTable = <HTMLElement>document.querySelector(".table-wrapper");
const imgTable = <HTMLElement>document.querySelector(".img-table");
const chekMarkTask = <HTMLElement>document.querySelector(".check-mark");

currentLevel = +JSON.parse(localStorage.getItem("indexArrOfTask") || "0");
levels =
  JSON.parse(localStorage.getItem("allLevels") || "null") || levelsFromJson;

function updateStateOfMainCheckMark(): void {
  chekMarkTask?.classList.remove("done");
  if (levels[currentLevel].isLevelDone) {
    chekMarkTask?.classList.add("done");
  }
}
loadPage();

function addClassToBodyNext(): void {
  addClassBody.classList.add(levels[currentLevel + 1].mainClass);
}
function addClassToBodyPrev(): void {
  addClassBody.classList.add(levels[currentLevel - 1].mainClass);
}
function removeClassFromBodyNext(): void {
  addClassBody.classList.remove(levels[currentLevel - 1].mainClass);
}
function removeClassFromBodyPrev(): void {
  addClassBody.classList.remove(levels[currentLevel + 1].mainClass);
}

levelsOfMenu.forEach((elem: Element) => {
  elem.addEventListener("click", function () {
    addClassBody.classList.remove(levels[currentLevel].mainClass);
    currentLevel = levels.findIndex(
      (lev: Level, i: number) => elem.className === lev.levelInMenu
    );
    addClassBody.classList.add(levels[currentLevel].mainClass);
    updateStateOfMainCheckMark();
    createLevelElements();
    changeTextRightSect();
  });
});

btnRessetProgress?.addEventListener("click", function () {

  levels.forEach((obj: Level) => {
    obj.isLevelDone = false;
    obj.isLevelDoneWithHelp = false;
  });
  markLevelsOfMenu.forEach((elem: Element) => {
    elem.classList.remove("done");
  });
  levelsDescriptions.forEach((obj: LevelDescription, i: number) => {
    let symbolHelp = <HTMLElement>(
      document.querySelector(`.${levelsDescriptions[i].classHelp}`)
    );
    symbolHelp.classList.remove("active");
  });

  winMessage.classList.remove("active");

});

function highlightHtmlImg(picture: HTMLElement, textHTML: HTMLElement) {
  const popup = picture.querySelector(".popup");
  picture.addEventListener("mouseover", function (event: Event) {
    event.stopPropagation();

    picture.classList.add("shadow");
    textHTML.classList.add("highlight1");
    popup?.classList.add("active");
  });
  picture.addEventListener("mouseout", function (event: Event) {
    event.stopPropagation();
    picture.classList.remove("shadow");
    textHTML.classList.remove("highlight1");
    popup?.classList.remove("active");
  });

  textHTML.addEventListener("mouseover", function (event: Event) {
    event.stopPropagation();
    textHTML.classList.add("highlight1");
    picture.classList.add("shadow");
    popup?.classList.add("active");
  });
  textHTML.addEventListener("mouseout", function (event: Event) {
    event.stopPropagation();
    textHTML.classList.remove("highlight1");
    picture.classList.remove("shadow");
    popup?.classList.remove("active");
  });
}

function createLevelPictures(): HTMLElement[]  {
  let arrayPictures: HTMLElement[] = [];
  imgTable?.replaceChildren();
  levels[currentLevel].images.forEach((pictureObj: Image) => {
    const picture = createPicture(pictureObj);
    arrayPictures.push(picture);
    if (pictureObj.nestedImg) {
      const nested = createPicture(pictureObj.nestedImg, true);
      picture.appendChild(nested);
      arrayPictures.push(nested);
    }
  });
  return arrayPictures;
}

function createPicture(obj: Image, nested = false): HTMLElement {
  let imgWrapper = document.createElement("div");

  if (!nested) {
    imgTable?.appendChild(imgWrapper);
    imgWrapper.className = "position-relative";
  } else {
    imgWrapper.className = "position-absolute";
  }
  let picture = document.createElement("img");
  picture.className = obj.class;
  picture.src = obj.src;
  imgWrapper?.appendChild(picture);
  let popUp = document.createElement("div");
  popUp.className = "popup";
  popUp.innerHTML = obj.tooltip;
  imgWrapper.appendChild(popUp);
  return imgWrapper;
}

function createHtmlBlocks(): HTMLElement[] {
  const arrElem: HTMLElement[] = [];
  htmlContent?.replaceChildren();
  levels[currentLevel].html_code.forEach((tagObj: HtmlCode, i:number) => {
    const divHtmlElement = createHtmlBlock(tagObj);
    arrElem.push(divHtmlElement);
    if (tagObj.html_nested) {
      const htmlNested = createHtmlBlock(tagObj.html_nested, true);
      divHtmlElement.appendChild(htmlNested);
      arrElem.push(htmlNested);
      let closedTag = document.createTextNode(
        levels[currentLevel].html_code[i].html_close
      );
      divHtmlElement.appendChild(closedTag);
    }
  });
  return arrElem;
}

function createHtmlBlock(obj: HtmlCode, html_nested = false): HTMLElement {
  let strHtmlCode = document.createElement("div");
  strHtmlCode.className = "str-html-code";
  strHtmlCode.innerHTML = obj.html;
  if (!html_nested) {
    htmlContent.appendChild(strHtmlCode);
  }
  return strHtmlCode;
}

function createLevelElements(): void {
  let picturesElArr = createLevelPictures();
  let htmlElArr = createHtmlBlocks();
  picturesElArr.forEach((pictEl: HTMLElement, index: number) => {
    highlightHtmlImg(pictEl, htmlElArr[index]);
  });
  taskName.innerHTML = levels[currentLevel].taskName;
  currentLevelEl.innerHTML = levels[currentLevel].curLevel;
}

function flyImg(): void {
  const allPict = document.querySelectorAll(".position-relative");
  allPict.forEach((imgOfTable: Element) => {
    imgOfTable.classList.add("fly-img");
  });
 }

rightBtn?.addEventListener("click", function () {
  if (currentLevel < 10) {
    addClassToBodyNext();
    currentLevel += 1;
    updateStateOfMainCheckMark();
    createLevelElements();
    changeTextRightSect();
    removeClassFromBodyNext();
    delAnswer();
  }
});

leftBtn?.addEventListener("click", function () {
  if (currentLevel !== 0) {
    addClassToBodyPrev();
    currentLevel -= 1;
    updateStateOfMainCheckMark();
    createLevelElements();
    changeTextRightSect();
    removeClassFromBodyPrev();
    delAnswer();
  }
});
function loadPage(): void {
  updateStateOfMainCheckMark();
  addClassBody.classList.add(levels[currentLevel].mainClass);
  createLevelElements();
  changeTextRightSect();
  levels.forEach((obj: Level, i: number) => {
    if (obj.isLevelDone) {
      let symbolHelp = <HTMLElement>(
        document.querySelector(`.${levelsDescriptions[i].classHelp}`)
      );
      symbolHelp.classList.add("active");
    }
    if (obj.isLevelDoneWithHelp) {
      let markSideBoxTask = <HTMLElement>(
        document.getElementById(levels[i].checkMarkSideId)
      );
      markSideBoxTask?.classList.add("done");
    }
  });
}

function showMessageIfAllLevelsDone(): void {
  if (levels.every((val: Level) => val.isLevelDone)) {
    winMessage.classList.add("active");
  }
}

function implementEnterPressLastLevel(): void {
  flyImg();
  let markSideBoxTask = <HTMLElement>(
    document.getElementById(levels[currentLevel].checkMarkSideId)
  );
  (document.getElementById("input-answer") as HTMLInputElement).value = "";
  markSideBoxTask?.classList.add("done");
  levels[currentLevel].isLevelDone = true;
  updateStateOfMainCheckMark();
  changeTextRightSect();
}
function implementEnterPress(): void {
  if (levels[currentLevel].answers.includes(answerTask.value)) {
    flyImg();
    setTimeout(() => {
      let markSideBoxTask = <HTMLElement>(
        document.getElementById(levels[currentLevel].checkMarkSideId)
      );
      (document.getElementById("input-answer") as HTMLInputElement).value = "";
      markSideBoxTask?.classList.add("done");
      addClassToBodyNext();
      levels[currentLevel].isLevelDone = true;
      currentLevel += 1;
      createLevelElements();
      removeClassFromBodyNext();
      changeTextRightSect();
      delAnswer();
    }, 1000);
    updateStateOfMainCheckMark();
  } else {
    allTable.classList.add("shake");
    setTimeout(() => {
      allTable.classList.remove("shake");
    }, 1200);
  }
}
buttonEnter.addEventListener("click", function () {
  if (currentLevel < 10) {
    implementEnterPress();
    showMessageIfAllLevelsDone();
  }
  if (
    currentLevel === 10 &&
    levels[currentLevel].answers.includes(answerTask.value)
  ) {
    implementEnterPressLastLevel();
    showMessageIfAllLevelsDone();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && currentLevel < 10) {
    implementEnterPress();
    showMessageIfAllLevelsDone();
  }
  if (
    event.code === "Enter" &&
    currentLevel === 10 &&
    levels[currentLevel].answers.includes(answerTask.value)
  ) {
    implementEnterPressLastLevel();
    showMessageIfAllLevelsDone();
  }
});
// function saveLocalStorage(): void {
//   localStorage.setItem("indexArrOfTask", String(currentLevel));
//   localStorage.setItem("allLevels", JSON.stringify(levels));
// }

// window.addEventListener("beforeunload", function () {
//   saveLocalStorage();
// });

buttonHelp.addEventListener("click", function () {
  answerTask.className = "fly-answer";
  answerTask.value = levels[currentLevel].answers[0];
  levels[currentLevel].isLevelDoneWithHelp = true;
  let symbolHelp = <HTMLElement>(
    document.querySelector(`.${levelsDescriptions[currentLevel].classHelp}`)
  );
  symbolHelp.classList.add("active");
});

function delAnswer(): void {
  answerTask.classList.remove("fly-answer");
  answerTask.value = "";
}
