import "./style.css";
import levelsFromJson from "./allLevels.json";
import levelsDescriptions from "./levelsDescriptions.json";
import { changeTextRightSect } from "./levelsDescription";
import { levelsOfMenu } from "./levelsMenu";
import { btnRessetProgress } from "./levelsMenu";
import { markLevelsOfMenu } from "./levelsMenu";
import { HtmlCode, Image, Level } from "./types";

export let currentLevel: number = 0;
let levels: Level[] = [];



let rightBtn = document.querySelector(".right-button");
let leftBtn = document.querySelector(".left-button");

let buttonHelp = <HTMLElement>document.querySelector(".button-help");

let addClassBody = <HTMLElement>document.querySelector(".body");
let taskName = <HTMLElement>document.querySelector(".task-name");
let htmlContent = <HTMLElement>document.querySelector(".html-content");
let currentLevelEl = <HTMLElement>document.querySelector(".current-level");

let answerTask = <HTMLInputElement>document.querySelector("#input-answer");
let buttonEnter = <HTMLElement>document.querySelector(".img-enter");
let allTable = <HTMLElement>document.querySelector(".table-wrapper");
let imgTable = document.querySelector(".img-table");
let chekMarkTask = document.querySelector(".check-mark");
currentLevel = +JSON.parse(localStorage.getItem("indexArrOfTask") || "0");
levels = JSON.parse(localStorage.getItem("allLevels") || "null") || levelsFromJson;

function updateStateOfMainCheckMark() {
  chekMarkTask?.classList.remove("done");
  if (levels[currentLevel].isLevelDone) {
    chekMarkTask?.classList.add("done");
  }
}
  loadPage()

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
  levels.forEach((obj) => {
    obj.isLevelDone = false;
    obj.isLevelDoneWithHelp = false;
  });
  markLevelsOfMenu.forEach((elem) => {
    elem.classList.remove("done");
  });
  levelsDescriptions.forEach((obj, i) => {
    let symbolHelp = <HTMLElement>(
      document.querySelector(`.${levelsDescriptions[i].classHelp}`)
    );
    symbolHelp.classList.remove("active");
  })


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
      const nested = createPicture(pictureObj.nestedImg, true);
      picture.appendChild(nested);
      arrayPictures.push(nested);
    }
  });
  return arrayPictures;
}

function createPicture(obj: Image, nested = false) {
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

function createHtmlBlocks() {
  const arrElem: HTMLElement[] = [];
  htmlContent?.replaceChildren();
  levels[currentLevel].html_code.forEach((tagObj, i) => {
    const divHtmlElement = createHtmlBlock(tagObj);
    arrElem.push(divHtmlElement);
    if (tagObj.html_nested) {
      const htmlNested = createHtmlBlock(tagObj.html_nested, true);
      divHtmlElement.appendChild(htmlNested);
      arrElem.push(htmlNested);
      let closedTag = document.createTextNode(levels[currentLevel].html_code[i].html_close);
      divHtmlElement.appendChild(closedTag);
    }
  });
  return arrElem;
}

function createHtmlBlock(obj: HtmlCode, html_nested = false) {
  let strHtmlCode = document.createElement("div");
  strHtmlCode.className = "str-html-code";
  strHtmlCode.innerHTML = obj.html;
  if (!html_nested) {
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

function flyImg() {
  let allpict = document.querySelectorAll(".position-relative");
  allpict.forEach((imgOfTable) => {
    imgOfTable.classList.add("fly-img");
  });
  return allpict;
}

rightBtn?.addEventListener("click", function () {
  if (currentLevel < 12) {
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

function loadPage() {
updateStateOfMainCheckMark();
  addClassBody.classList.add(levels[currentLevel].mainClass);
  createLevelElements();
  changeTextRightSect()
  levels.forEach((obj, i) => {
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
  })
}

function implementEnterPress() {
  if (answerTask.value === levels[currentLevel].answer) {
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
      changeTextRightSect()
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
  if (currentLevel < 12){
  implementEnterPress();
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Enter" && currentLevel < 12) {
    implementEnterPress();
  }
});
// function saveLocalStorage() {
//   localStorage.setItem("indexArrOfTask", String(currentLevel));
//   localStorage.setItem("allLevels", JSON.stringify(levels));
// }

window.addEventListener("beforeunload", function () {
  // saveLocalStorage();
});

buttonHelp.addEventListener("click", function () {
  answerTask.className = "fly-answer";
  answerTask.value = levels[currentLevel].answer;
  levels[currentLevel].isLevelDoneWithHelp = true;
  let symbolHelp = <HTMLElement>(
    document.querySelector(`.${levelsDescriptions[currentLevel].classHelp}`)
  );
  symbolHelp.classList.add("active");
});

function delAnswer() {
  answerTask.classList.remove("fly-answer");
  answerTask.value = "";
}
