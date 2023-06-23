import "./style.css";
import levels from "./allLevels.json";
import tooltipsTexts from "./tooltipsTexts.json";
import { changeTextRightSect } from "./levelsDescription";
import { updateStateOfMainCheckMark } from "./levelsMenu";
import { levelsOfMenu } from "./levelsMenu";
import { btnRessetProgress } from "./levelsMenu";
import { markLevelsOfMenu } from "./levelsMenu";

export let currentLevel: number = 0;

type ImgField = "img1" | "img2" | "img3" | "img4";

let rightBtn = document.querySelector(".right-button");
let leftBtn = document.querySelector(".left-button");

let addClassBody = <HTMLElement>document.querySelector(".body");
let taskName = <HTMLElement>document.querySelector(".task-name");
let htmlCodeStr2 = <HTMLElement>document.querySelector(".html_str2");
let htmlCodeStr3 = <HTMLElement>document.querySelector(".html_str3");
let htmlCodeStr4 = <HTMLElement>document.querySelector(".html_str4");
let htmlCodeStr5 = <HTMLElement>document.querySelector(".html_str5");
let htmlCodeStr6 = <HTMLElement>document.querySelector(".html_str6");
let currentLevelEl = <HTMLElement>document.querySelector(".current-level");

let answerTask: any = document.querySelector("#input-answer");
let buttonEnter = <HTMLElement>document.querySelector(".img-enter");
let allTable = <HTMLElement>document.querySelector(".table-wrapper");
let imgTable = document.querySelector(".img-table");

if (localStorage.getItem("indexArrOfTask")) {
  currentLevel = +JSON.parse(localStorage.getItem("indexArrOfTask") || "0");
}

addClassBody.classList.add(levels[currentLevel].mainClass);
changePictureHtmlTableTask();

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
    changePictureHtmlTableTask();
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

function createPopup(
  parentElement: HTMLElement,
  img: ImgField,
  showPopUp: boolean
) {
  if (showPopUp) {
    let popUp = document.createElement("div");
    popUp.className = "popup";
    popUp.innerHTML = levels[currentLevel][img].tooltip;
    parentElement?.appendChild(popUp);
  } else {
    parentElement?.lastChild && parentElement.removeChild(parentElement?.lastChild);
  }
}

function highlightHtmlImg(
  picture: HTMLElement,
  textHTML: HTMLElement,
  img: ImgField
) {
  picture.addEventListener("mouseover", function () {
    picture.classList.add(levels[currentLevel].shadowImg);
    textHTML.classList.add(levels[currentLevel].class_highlight1);
    createPopup(picture, img, true);
  });
  picture.addEventListener("mouseout", function () {
    picture.classList.remove(levels[currentLevel].shadowImg);
    textHTML.classList.remove(levels[currentLevel].class_highlight1);
    createPopup(picture, img, false);
  });

  textHTML.addEventListener("mouseover", function () {
    textHTML.classList.add(levels[currentLevel].class_highlight1);
    picture.classList.add(levels[currentLevel].shadowImg);
    createPopup(picture, img, true);
  });
  textHTML.addEventListener("mouseout", function () {
    textHTML.classList.remove(levels[currentLevel].class_highlight1);
    picture.classList.remove(levels[currentLevel].shadowImg);
    createPopup(picture, img, false);
  });
}

function createPicture(img: ImgField) {
  let imgWrapper = document.createElement("div");
  imgWrapper.className = "position-relative";
  imgTable?.appendChild(imgWrapper);
  let picture = document.createElement("img");
  picture.className = levels[currentLevel][img].class;
  picture.src = levels[currentLevel][img].src;
  imgWrapper?.appendChild(picture);

  return imgWrapper;
}

function changePictureHtmlTableTask() {
  imgTable?.replaceChildren();
  let pictureOne = createPicture("img1");
  let pictureTwo = createPicture("img2");
  let pictureThree = createPicture("img3");
  let pictureFour = createPicture("img4");

  taskName.innerHTML = levels[currentLevel].taskName;
  htmlCodeStr2.innerHTML = levels[currentLevel].html_str2;
  htmlCodeStr3.innerHTML = levels[currentLevel].html_str3;
  htmlCodeStr4.innerHTML = levels[currentLevel].html_str4;
  htmlCodeStr5.innerHTML = levels[currentLevel].html_str5;
  htmlCodeStr6.innerHTML = levels[currentLevel].html_str6;
  currentLevelEl.innerHTML = levels[currentLevel].curLevel;

  highlightHtmlImg(pictureOne, htmlCodeStr2, "img1");
  highlightHtmlImg(pictureTwo, htmlCodeStr3, "img2");
  highlightHtmlImg(pictureThree, htmlCodeStr4, "img3");
}

rightBtn?.addEventListener("click", function () {
  addClassToBodyNext();
  currentLevel += 1;
  updateStateOfMainCheckMark();
  changePictureHtmlTableTask();
  changeTextRightSect();
  removeClassFromBodyNext();
});

leftBtn?.addEventListener("click", function () {
  addClassToBodyPrev();
  currentLevel -= 1;
  updateStateOfMainCheckMark();
  changePictureHtmlTableTask();
  changeTextRightSect();
  removeClassFromBodyPrev();
});

buttonEnter.addEventListener("click", function () {
  if (answerTask.value === levels[currentLevel].answer) {
    let markSideBoxTask = <HTMLElement>(
      document.getElementById(levels[currentLevel].checkMarkSideId)
    );

    (document.getElementById("input-answer") as HTMLInputElement).value = "";
    markSideBoxTask?.classList.add("done");
    addClassToBodyNext();
    levels[currentLevel].isLevelDone = true;
    currentLevel += 1;
    changePictureHtmlTableTask();
    removeClassFromBodyNext();
    updateStateOfMainCheckMark();
  } else {
    allTable.classList.add("shake");
    setTimeout(() => {
      allTable.classList.remove("shake");
    }, 1200);
  }
});
function saveLocalStorage() {
  localStorage.setItem("indexArrOfTask", String(currentLevel));
}

window.addEventListener("beforeunload", function () {
  saveLocalStorage();
});
