import "./style.css";
import levelsFromJson from "./allLevels.json";
import levelsDescriptions from "./levelsDescriptions.json";
import { changeTextRightSect } from "./levels-description";
import { levelsOfMenu } from "./levels-menu";
import { buttonRessetProgress as buttonRessetProgress } from "./levels-menu";
import { markLevelsOfMenu } from "./levels-menu";
import { HtmlCode, Image, Level, LevelDescription } from "./types";

export let currentLevel: number = 0;
let levels: Level[] = [];

const rightButton = <HTMLElement>document.querySelector(".right-button");
const leftButton = <HTMLElement>document.querySelector(".left-button");
const winMessage = <HTMLElement>document.querySelector(".win-message");
const buttonHelp = <HTMLElement>document.querySelector(".button-help");
const addClassBody = <HTMLElement>document.querySelector(".body");
const taskName = <HTMLElement>document.querySelector(".task-name");
const htmlContent = <HTMLElement>document.querySelector(".html-content");
const currentLevelElement = <HTMLElement>(
  document.querySelector(".current-level")
);

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
function addClassToBodyPrevious(): void {
  addClassBody.classList.add(levels[currentLevel - 1].mainClass);
}
function removeClassFromBodyNext(): void {
  addClassBody.classList.remove(levels[currentLevel - 1].mainClass);
}
function removeClassFromBodyPrevious(): void {
  addClassBody.classList.remove(levels[currentLevel + 1].mainClass);
}

levelsOfMenu.forEach((element: Element) => {
  element.addEventListener("click", function () {
    addClassBody.classList.remove(levels[currentLevel].mainClass);
    currentLevel = levels.findIndex(
      (lev: Level) => element.className === lev.levelInMenu
    );
    addClassBody.classList.add(levels[currentLevel].mainClass);
    updateStateOfMainCheckMark();
    createLevelElements();
    changeTextRightSect();
  });
});

buttonRessetProgress?.addEventListener("click", function () {
  levels.forEach((object: Level) => {
    object.isLevelDone = false;
    object.isLevelDoneWithHelp = false;
  });
  markLevelsOfMenu.forEach((element: Element) => {
    element.classList.remove("done");
  });
  levelsDescriptions.forEach((object: LevelDescription, index: number) => {
    const symbolHelp = <HTMLElement>(
      document.querySelector(`.${levelsDescriptions[index].classHelp}`)
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

function createLevelPictures(): HTMLElement[] {
  const arrayPictures: HTMLElement[] = [];
  imgTable?.replaceChildren();
  levels[currentLevel].images.forEach((pictureObject: Image) => {
    const picture = createPicture(pictureObject);
    arrayPictures.push(picture);
    if (pictureObject.nestedImg) {
      const nested = createPicture(pictureObject.nestedImg, true);
      picture.append(nested);
      arrayPictures.push(nested);
    }
  });
  return arrayPictures;
}

function createPicture(object: Image, nested = false): HTMLElement {
  const imgWrapper = document.createElement("div");

  if (nested) {
    imgWrapper.className = "position-absolute";
  } else {
    imgTable?.append(imgWrapper);
    imgWrapper.className = "position-relative";
  }
  const picture = document.createElement("img");
  picture.className = object.class;
  picture.src = object.src;
  imgWrapper?.append(picture);
  const popUp = document.createElement("div");
  popUp.className = "popup";
  popUp.innerHTML = object.tooltip;
  imgWrapper.append(popUp);
  return imgWrapper;
}

function createHtmlBlocks(): HTMLElement[] {
  const arrayElement: HTMLElement[] = [];
  htmlContent?.replaceChildren();
  levels[currentLevel].html_code.forEach(
    (tagObject: HtmlCode, index: number) => {
      const divHtmlElement = createHtmlBlock(tagObject);
      arrayElement.push(divHtmlElement);
      if (tagObject.html_nested) {
        const htmlNested = createHtmlBlock(tagObject.html_nested, true);
        divHtmlElement.append(htmlNested);
        arrayElement.push(htmlNested);
        const closedTag = document.createTextNode(
          levels[currentLevel].html_code[index].html_close
        );
        divHtmlElement.append(closedTag);
      }
    }
  );
  return arrayElement;
}

function createHtmlBlock(object: HtmlCode, html_nested = false): HTMLElement {
  const stringHtmlCode = document.createElement("div");
  stringHtmlCode.className = "str-html-code";
  stringHtmlCode.innerHTML = object.html;
  if (!html_nested) {
    htmlContent.append(stringHtmlCode);
  }
  return stringHtmlCode;
}

function createLevelElements(): void {
  const picturesElementArray = createLevelPictures();
  const htmlElementArray = createHtmlBlocks();
  picturesElementArray.forEach((pictElement: HTMLElement, index: number) => {
    highlightHtmlImg(pictElement, htmlElementArray[index]);
  });
  taskName.innerHTML = levels[currentLevel].taskName;
  currentLevelElement.innerHTML = levels[currentLevel].curLevel;
}

function flyImg(): void {
  const allPict = document.querySelectorAll(".position-relative");
  allPict.forEach((imgOfTable: Element) => {
    imgOfTable.classList.add("fly-img");
  });
}

rightButton?.addEventListener("click", function () {
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

leftButton?.addEventListener("click", function () {
  if (currentLevel !== 0) {
    addClassToBodyPrevious();
    currentLevel -= 1;
    updateStateOfMainCheckMark();
    createLevelElements();
    changeTextRightSect();
    removeClassFromBodyPrevious();
    delAnswer();
  }
});
function loadPage(): void {
  updateStateOfMainCheckMark();
  addClassBody.classList.add(levels[currentLevel].mainClass);
  createLevelElements();
  changeTextRightSect();
  levels.forEach((object: Level, index: number) => {
    if (object.isLevelDone) {
      const symbolHelp = <HTMLElement>(
        document.querySelector(`.${levelsDescriptions[index].classHelp}`)
      );
      symbolHelp.classList.add("active");
    }
    if (object.isLevelDoneWithHelp) {
      const markSideBoxTask = <HTMLElement>(
        document.getElementById(levels[index].checkMarkSideId)
      );
      markSideBoxTask?.classList.add("done");
    }
  });
}

function showMessageIfAllLevelsDone(): void {
  if (levels.every((value: Level) => value.isLevelDone)) {
    winMessage.classList.add("active");
  }
}

function implementEnterPressLastLevel(): void {
  flyImg();
  const markSideBoxTask = <HTMLElement>(
    document.getElementById(levels[currentLevel].checkMarkSideId)
  );
  (document.querySelector("#input-answer") as HTMLInputElement).value = "";
  markSideBoxTask?.classList.add("done");
  levels[currentLevel].isLevelDone = true;
  updateStateOfMainCheckMark();
  changeTextRightSect();
}
function implementEnterPress(): void {
  if (levels[currentLevel].answers.includes(answerTask.value)) {
    flyImg();
    setTimeout(() => {
      const markSideBoxTask = <HTMLElement>(
        document.getElementById(levels[currentLevel].checkMarkSideId)
      );
      (document.querySelector("#input-answer") as HTMLInputElement).value = "";
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
  if (currentLevel === 10) {
    implementEnterPressLastLevel();
    showMessageIfAllLevelsDone();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && currentLevel < 10) {
    implementEnterPress();
    showMessageIfAllLevelsDone();
  }
  if (event.code === "Enter" && currentLevel === 10) {
    implementEnterPressLastLevel();
    showMessageIfAllLevelsDone();
  }
});
function saveLocalStorage(): void {
  localStorage.setItem("indexArrOfTask", String(currentLevel));
  localStorage.setItem("allLevels", JSON.stringify(levels));
}

window.addEventListener("beforeunload", function () {
  saveLocalStorage();
});

buttonHelp.addEventListener("click", function () {
  answerTask.className = "fly-answer";
  answerTask.value = levels[currentLevel].answers[0];
  levels[currentLevel].isLevelDoneWithHelp = true;
  const symbolHelp = <HTMLElement>(
    document.querySelector(`.${levelsDescriptions[currentLevel].classHelp}`)
  );
  symbolHelp.classList.add("active");
});

function delAnswer(): void {
  answerTask.classList.remove("fly-answer");
  answerTask.value = "";
}
