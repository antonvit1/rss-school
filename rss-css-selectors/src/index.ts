import "./style.css";
import levels from "./allLevels.json";
// import tooltipsTexts from "./tooltipsTexts.json";
import levelsDescriptions from "./levelsDescriptions.json";
import { changeTextRightSect } from "./levelsDescription";
import { updateStateOfMainCheckMark } from "./levelsMenu";
import { levelsOfMenu } from "./levelsMenu";
import { btnRessetProgress } from "./levelsMenu";
import { markLevelsOfMenu } from "./levelsMenu";

export let currentLevel: number = 0;

type ImgField = "img1" | "img2" | "img3" | "img4";
// type ImgFieldInside = "imgIn1" | "imgIn2" | "imgIn3" | "imgIn4";

let rightBtn = document.querySelector(".right-button");
let leftBtn = document.querySelector(".left-button");

let buttonHelp = <HTMLElement>document.querySelector(".button-help");

let addClassBody = <HTMLElement>document.querySelector(".body");
let taskName = <HTMLElement>document.querySelector(".task-name");
let htmlContent = <HTMLElement>document.querySelector(".html-content");
let currentLevelEl = <HTMLElement>document.querySelector(".current-level");

let answerTask: any = document.querySelector("#input-answer");
let buttonEnter = <HTMLElement>document.querySelector(".img-enter");
let allTable = <HTMLElement>document.querySelector(".table-wrapper");
let imgTable = document.querySelector(".img-table");

if (localStorage.getItem("indexArrOfTask")) {
  currentLevel = +JSON.parse(localStorage.getItem("indexArrOfTask") || "0");
}

addClassBody.classList.add(levels[currentLevel].mainClass);
createLevelElements();

function addClassToBodyNext() {
  addClassBody.classList.add(levels[currentLevel + 1].mainClass);
}
function addClassToBodyPrev() {
  addClassBody.classList.add(levels[currentLevel - 1].mainClass);
}
function removeClassFromBodyNext() {
  addClassBody.classList.remove(levels[currentLevel - 1].mainClass);
}
function removeClassFromBodyPrev() {
  addClassBody.classList.remove(levels[currentLevel + 1].mainClass);
}

levelsOfMenu.forEach((elem) => {
  elem.addEventListener("click", function () {
    addClassBody.classList.remove(levels[currentLevel].mainClass);
    currentLevel = levels.findIndex(
      (lev, i) => elem.className === lev.levelInMenu
    );
    addClassBody.classList.add(levels[currentLevel].mainClass);
    updateStateOfMainCheckMark();
    createLevelElements();
    changeTextRightSect();
  });
});

btnRessetProgress?.addEventListener("click", function () {
  levels.forEach((obj, i) => {
    obj.isLevelDone = false;
  });
  markLevelsOfMenu.forEach((elem) => {
    elem.classList.remove("done");
  });
});

function highlightHtmlImg(picture: HTMLElement, textHTML: HTMLElement) {
  const popup = picture.querySelector(".popup");
  picture.addEventListener("mouseover", function () {
    picture.classList.add("shadow");
    textHTML.classList.add("highlight1");
popup?.classList.add("active");

  });
  picture.addEventListener("mouseout", function () {
    picture.classList.remove("shadow");
    textHTML.classList.remove("highlight1");
    popup?.classList.remove("active");
  });

  textHTML.addEventListener("mouseover", function () {
    textHTML.classList.add("highlight1");
    picture.classList.add("shadow");
    popup?.classList.add("active");
  });
  textHTML.addEventListener("mouseout", function () {
    textHTML.classList.remove("highlight1");
    picture.classList.remove("shadow");
    popup?.classList.remove("active");
  });
}

function createLevelPictures() {
  let arrayPictures: HTMLElement[] = [];
  imgTable?.replaceChildren();
  levels[currentLevel].images.forEach((pictureObj) => {
    const picture = createPicture(pictureObj);
    arrayPictures.push(picture);
    if (pictureObj.nestedImg) {
      const nested = createPicture(pictureObj.nestedImg);
      picture.appendChild(nested);
      arrayPictures.push(nested);
    }
  });
  return arrayPictures;
}

function createPicture(obj: any, nested = false) {
  let imgWrapper = document.createElement("div");
  imgWrapper.className = "position-relative";
  if (!nested) {
    imgTable?.appendChild(imgWrapper);
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

function createHtmlBlocks() {
  const arrElem: HTMLElement[] = [];
  htmlContent?.replaceChildren();
  levels[currentLevel].html_code.forEach((tagObj) => {
    const divHtmlElement = createHtmlBlock(tagObj);
    arrElem.push(divHtmlElement);
    if (tagObj.html_nested) {
      const htmlNested = createHtmlBlock(tagObj.html_nested);
      divHtmlElement.appendChild(htmlNested);
      arrElem.push(htmlNested);
    }
  });
  return arrElem;
}

function createHtmlBlock(obj: any) {
  let strHtmlCode = document.createElement("div");
  strHtmlCode.className = "str-html-code";
  strHtmlCode.innerHTML = obj.html;
  if (!obj.html_nested) {
    htmlContent.appendChild(strHtmlCode);
  }
  return strHtmlCode;
}

function createLevelElements() {
  let picturesElArr = createLevelPictures();
  let htmlElArr = createHtmlBlocks();
  picturesElArr.forEach((pictEl, index) => {
    highlightHtmlImg(pictEl, htmlElArr[index]);
  });
  taskName.innerHTML = levels[currentLevel].taskName;
  currentLevelEl.innerHTML = levels[currentLevel].curLevel;
}

rightBtn?.addEventListener("click", function () {
  addClassToBodyNext();
  currentLevel += 1;
  updateStateOfMainCheckMark();
  createLevelElements();
  changeTextRightSect();
  removeClassFromBodyNext();
  delAnswer();
});

leftBtn?.addEventListener("click", function () {
  addClassToBodyPrev();
  currentLevel -= 1;
  updateStateOfMainCheckMark();
  createLevelElements();
  changeTextRightSect();
  removeClassFromBodyPrev();
  delAnswer();
});
function implementEnterPress() {
  if (answerTask.value === levels[currentLevel].answer) {
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
    updateStateOfMainCheckMark();
  } else {
    allTable.classList.add("shake");
    setTimeout(() => {
      allTable.classList.remove("shake");
    }, 1200);
  }
}
buttonEnter.addEventListener("click", function () {
  implementEnterPress();
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    implementEnterPress();
  }
});
function saveLocalStorage() {
  localStorage.setItem("indexArrOfTask", String(currentLevel));
}

window.addEventListener("beforeunload", function () {
  saveLocalStorage();
});

buttonHelp.addEventListener("click", function () {
  answerTask.classList = "fly-answer";
  answerTask.value = levels[currentLevel].answer;
  let symbolHelp = <HTMLElement>(
    document.querySelector(`.${levelsDescriptions[currentLevel].classHelp}`)
  );
  symbolHelp.classList.add("active");
});

function delAnswer() {
  answerTask.classList.remove("fly-answer");
  answerTask.value = "";
}
