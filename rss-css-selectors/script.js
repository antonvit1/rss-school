/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentLevel: () => (/* binding */ currentLevel)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _allLevels_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allLevels.json */ "./src/allLevels.json");
/* harmony import */ var _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levelsDescriptions.json */ "./src/levelsDescriptions.json");
/* harmony import */ var _levelsDescription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levelsDescription */ "./src/levelsDescription.ts");
/* harmony import */ var _levelsMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./levelsMenu */ "./src/levelsMenu.ts");







let currentLevel = 0;
let levels = [];
const rightBtn = document.querySelector(".right-button");
const leftBtn = document.querySelector(".left-button");
const winMessage = document.querySelector(".win-message");
const buttonHelp = document.querySelector(".button-help");
const addClassBody = document.querySelector(".body");
const taskName = document.querySelector(".task-name");
const htmlContent = document.querySelector(".html-content");
const currentLevelEl = document.querySelector(".current-level");
const answerTask = document.querySelector("#input-answer");
const buttonEnter = document.querySelector(".img-enter");
const allTable = document.querySelector(".table-wrapper");
const imgTable = document.querySelector(".img-table");
const chekMarkTask = document.querySelector(".check-mark");
currentLevel = +JSON.parse(localStorage.getItem("indexArrOfTask") || "0");
levels =
    JSON.parse(localStorage.getItem("allLevels") || "null") || _allLevels_json__WEBPACK_IMPORTED_MODULE_1__;
function updateStateOfMainCheckMark() {
    chekMarkTask?.classList.remove("done");
    if (levels[currentLevel].isLevelDone) {
        chekMarkTask?.classList.add("done");
    }
}
loadPage();
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
_levelsMenu__WEBPACK_IMPORTED_MODULE_4__.levelsOfMenu.forEach((elem) => {
    elem.addEventListener("click", function () {
        addClassBody.classList.remove(levels[currentLevel].mainClass);
        currentLevel = levels.findIndex((lev, i) => elem.className === lev.levelInMenu);
        addClassBody.classList.add(levels[currentLevel].mainClass);
        updateStateOfMainCheckMark();
        createLevelElements();
        (0,_levelsDescription__WEBPACK_IMPORTED_MODULE_3__.changeTextRightSect)();
    });
});
_levelsMenu__WEBPACK_IMPORTED_MODULE_4__.btnRessetProgress?.addEventListener("click", function () {
    levels.forEach((obj) => {
        obj.isLevelDone = false;
        obj.isLevelDoneWithHelp = false;
    });
    _levelsMenu__WEBPACK_IMPORTED_MODULE_4__.markLevelsOfMenu.forEach((elem) => {
        elem.classList.remove("done");
    });
    _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_2__.forEach((obj, i) => {
        let symbolHelp = (document.querySelector(`.${_levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_2__[i].classHelp}`));
        symbolHelp.classList.remove("active");
    });
    winMessage.classList.remove("active");
});
function highlightHtmlImg(picture, textHTML) {
    const popup = picture.querySelector(".popup");
    picture.addEventListener("mouseover", function (event) {
        event.stopPropagation();
        picture.classList.add("shadow");
        textHTML.classList.add("highlight1");
        popup?.classList.add("active");
    });
    picture.addEventListener("mouseout", function (event) {
        event.stopPropagation();
        picture.classList.remove("shadow");
        textHTML.classList.remove("highlight1");
        popup?.classList.remove("active");
    });
    textHTML.addEventListener("mouseover", function (event) {
        event.stopPropagation();
        textHTML.classList.add("highlight1");
        picture.classList.add("shadow");
        popup?.classList.add("active");
    });
    textHTML.addEventListener("mouseout", function (event) {
        event.stopPropagation();
        textHTML.classList.remove("highlight1");
        picture.classList.remove("shadow");
        popup?.classList.remove("active");
    });
}
function createLevelPictures() {
    let arrayPictures = [];
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
function createPicture(obj, nested = false) {
    let imgWrapper = document.createElement("div");
    if (!nested) {
        imgTable?.appendChild(imgWrapper);
        imgWrapper.className = "position-relative";
    }
    else {
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
    const arrElem = [];
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
function createHtmlBlock(obj, html_nested = false) {
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
    const allPict = document.querySelectorAll(".position-relative");
    allPict.forEach((imgOfTable) => {
        imgOfTable.classList.add("fly-img");
    });
}
rightBtn?.addEventListener("click", function () {
    if (currentLevel < 10) {
        addClassToBodyNext();
        currentLevel += 1;
        updateStateOfMainCheckMark();
        createLevelElements();
        (0,_levelsDescription__WEBPACK_IMPORTED_MODULE_3__.changeTextRightSect)();
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
        (0,_levelsDescription__WEBPACK_IMPORTED_MODULE_3__.changeTextRightSect)();
        removeClassFromBodyPrev();
        delAnswer();
    }
});
function loadPage() {
    updateStateOfMainCheckMark();
    addClassBody.classList.add(levels[currentLevel].mainClass);
    createLevelElements();
    (0,_levelsDescription__WEBPACK_IMPORTED_MODULE_3__.changeTextRightSect)();
    levels.forEach((obj, i) => {
        if (obj.isLevelDone) {
            let symbolHelp = (document.querySelector(`.${_levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_2__[i].classHelp}`));
            symbolHelp.classList.add("active");
        }
        if (obj.isLevelDoneWithHelp) {
            let markSideBoxTask = (document.getElementById(levels[i].checkMarkSideId));
            markSideBoxTask?.classList.add("done");
        }
    });
}
function showMessageIfAllLevelsDone() {
    if (levels.every((val) => val.isLevelDone)) {
        winMessage.classList.add("active");
    }
}
function implementEnterPressLastLevel() {
    flyImg();
    let markSideBoxTask = (document.getElementById(levels[currentLevel].checkMarkSideId));
    document.getElementById("input-answer").value = "";
    markSideBoxTask?.classList.add("done");
    levels[currentLevel].isLevelDone = true;
    updateStateOfMainCheckMark();
    (0,_levelsDescription__WEBPACK_IMPORTED_MODULE_3__.changeTextRightSect)();
}
function implementEnterPress() {
    if (levels[currentLevel].answers.includes(answerTask.value)) {
        flyImg();
        setTimeout(() => {
            let markSideBoxTask = (document.getElementById(levels[currentLevel].checkMarkSideId));
            document.getElementById("input-answer").value = "";
            markSideBoxTask?.classList.add("done");
            addClassToBodyNext();
            levels[currentLevel].isLevelDone = true;
            currentLevel += 1;
            createLevelElements();
            removeClassFromBodyNext();
            (0,_levelsDescription__WEBPACK_IMPORTED_MODULE_3__.changeTextRightSect)();
            delAnswer();
        }, 1000);
        updateStateOfMainCheckMark();
    }
    else {
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
    if (currentLevel === 10 &&
        levels[currentLevel].answers.includes(answerTask.value)) {
        implementEnterPressLastLevel();
        showMessageIfAllLevelsDone();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && currentLevel < 10) {
        implementEnterPress();
        showMessageIfAllLevelsDone();
    }
    if (event.code === "Enter" &&
        currentLevel === 10 &&
        levels[currentLevel].answers.includes(answerTask.value)) {
        implementEnterPressLastLevel();
        showMessageIfAllLevelsDone();
    }
});
function saveLocalStorage() {
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
    let symbolHelp = (document.querySelector(`.${_levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_2__[currentLevel].classHelp}`));
    symbolHelp.classList.add("active");
});
function delAnswer() {
    answerTask.classList.remove("fly-answer");
    answerTask.value = "";
}


/***/ }),

/***/ "./src/levelsDescription.ts":
/*!**********************************!*\
  !*** ./src/levelsDescription.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeTextRightSect: () => (/* binding */ changeTextRightSect)
/* harmony export */ });
/* harmony import */ var _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levelsDescriptions.json */ "./src/levelsDescriptions.json");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.ts");


let topicTask = document.querySelector(".topic-task");
let taskNameText = document.querySelector(".task");
let symbolTask = document.querySelector(".symbol-task");
let descriptionTask = document.querySelector(".description-task");
let exampleWord = document.querySelector(".example-word");
let exampleFirst = document.querySelector(".example-first");
let exampleSecond = document.querySelector(".example-second");
let progress = document.querySelector("#progress");
function changeTextRightSect() {
    topicTask.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].topic_task;
    taskNameText.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].task;
    symbolTask.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].symbol_task;
    descriptionTask.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].description_task;
    exampleWord.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].example_word;
    exampleFirst.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].example_first;
    exampleSecond.innerHTML = _levelsDescriptions_json__WEBPACK_IMPORTED_MODULE_0__[_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel].example_second;
    progress.value = 10 * (_index__WEBPACK_IMPORTED_MODULE_1__.currentLevel + 1);
}


/***/ }),

/***/ "./src/levelsMenu.ts":
/*!***************************!*\
  !*** ./src/levelsMenu.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   btnRessetProgress: () => (/* binding */ btnRessetProgress),
/* harmony export */   levelsOfMenu: () => (/* binding */ levelsOfMenu),
/* harmony export */   markLevelsOfMenu: () => (/* binding */ markLevelsOfMenu)
/* harmony export */ });
let menuButton = document.querySelector(".mark-main");
let sideBox = document.querySelector(".side-box");
let levelsOfMenu = Array.from(document.querySelectorAll(".task-of-menu"));
let btnRessetProgress = document.querySelector(".btn-reset-progress");
let markLevelsOfMenu = Array.from(document.querySelectorAll(".check-mark"));
menuButton?.addEventListener("click", function () {
    menuButton?.classList.toggle("active");
    sideBox?.classList.toggle("active");
});


/***/ }),

/***/ "./src/allLevels.json":
/*!****************************!*\
  !*** ./src/allLevels.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"mainClass":"task1","taskName":"Select the strawberries","images":[{"src":"assets/strawberry.svg","class":"strawberry1","tooltip":"&lt;strawberry/&gt;"},{"src":"assets/strawberry.svg","class":"strawberry2","tooltip":"&lt;strawberry/&gt;"}],"html_code":[{"html":"&lt;strawberry/&gt;"},{"html":"&lt;strawberry/&gt;"}],"curLevel":"1","answers":["strawberry","strawberry:first-child, srawberry:nth-child(2)"],"checkMarkSideId":"mark-one","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-1"},{"mainClass":"task2","taskName":"Select the mushrooms","images":[{"src":"assets/mushroom.svg","class":"mushroom1","tooltip":"&lt;mushroom/&gt;"},{"src":"assets/plate.svg","class":"plate","tooltip":"&lt;plate/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom2","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;mushroom/&gt;"},{"html":"&lt;plate/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"2","answers":["mushroom","mushroom:first-child, mushroom:nth-child(2)"],"checkMarkSideId":"mark-two","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-2"},{"mainClass":"task3","taskName":"Select the fly-agaric mushroom","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom id=\\"fly-agaric\\"/&gt;"},{"src":"assets/plate.svg","class":"plate","tooltip":"&lt;plate/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;mushroom id=\\"fly-agaric\\"/&gt;"},{"html":"&lt;plate/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"3","answers":["#fly-agaric","mushroom#fly-agaric","mushroom:first-child"],"checkMarkSideId":"mark-three","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-3"},{"mainClass":"task4","taskName":"Select 3rd beetle","images":[{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle/&gt;<br>"},{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle/&gt;<br>"},{"src":"assets/beetle.svg","class":"beetle3","tooltip":"&lt;beetle/&gt;<br>"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;beetle/&gt;"},{"html":"&lt;beetle/&gt;"},{"html":"&lt;beetle/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"4","answers":["beetle:nth-child(3)"],"checkMarkSideId":"mark-four","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-4"},{"mainClass":"task5","taskName":"Select worms that eat mushrooms","images":[{"src":"assets/worms.svg","class":"worm-big","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}}],"html_code":[{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}}],"curLevel":"5","answers":["worm.eating","mushroom worm",".eating"],"checkMarkSideId":"mark-five","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-5"},{"mainClass":"task6","taskName":"Select all worms that eat mushrooms","images":[{"src":"assets/worms.svg","class":"worm-big","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating/&gt;"}},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom id=\\"fly-agaric\\"/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating/&gt;"}},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm-small","tooltip":"&lt;worm class=\\"eating/&gt;"}}],"html_code":[{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;mushroom id=\\"fly-agaric\\"/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}}],"curLevel":"6","answers":["mushroom *","mushroom .eating","mushroom worm","mushroom worm.eating"],"checkMarkSideId":"mark-six","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-6"},{"mainClass":"task7","taskName":"Select all worms that eat mushrooms","images":[{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle class=\\"eating\\"/&gt;"}},{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"small-worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}},{"src":"assets/worms.svg","class":"big-worm","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"small-worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}}],"html_code":[{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle class=\\"eating\\"/&gt;"}},{"html":"&lt;worm class=\\"eating\\"/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}}],"curLevel":"7","answers":["mushroom worm.eating"],"checkMarkSideId":"mark-seven","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-7"},{"mainClass":"task8","taskName":"Select all strawberries and mushrooms","images":[{"src":"assets/beetle.svg","class":"large-beetle","tooltip":"&lt;large-beetle/&gt;"},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/beetle.svg","class":"small-beetle-on-table","tooltip":"&lt;small-beetle/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}}],"html_code":[{"html":"&lt;large-beetle/&gt;"},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;small-beetle/&gt;"}},{"html":"&lt;small-beetle/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;small-beetle/&gt;"}},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;small-beetle/&gt;"}}],"curLevel":"8","answers":["strawberry, mushroom","mushroom, strawberry"],"checkMarkSideId":"mark-eight","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-8"},{"mainClass":"task9","taskName":"Select everything on the table","images":[{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;"},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom class=\\"fly-agaric\\"/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}},{"src":"assets/beetle.svg","class":"small-beetle-on-table","tooltip":"&lt;small-beetle/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}}],"html_code":[{"html":"&lt;strawberry/&gt;"},{"html":"&lt;mushroom class=\\"fly-agaric\\"/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"small\\"/&gt;"}},{"html":"&lt;small-beetle/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;small-beetle/&gt;"}},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;worm class=\\"small\\"/&gt;"}}],"curLevel":"9","answers":["*","strawberry, mushroom, small-beetle, worm"],"checkMarkSideId":"mark-nine","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-9"},{"mainClass":"task10","taskName":"Select the worm and the beetle that eat mushrooms","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom class=\\"fly-agaric\\"/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;beetle id=\\"small\\"/&gt;"}},{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle/&gt;"},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}}],"html_code":[{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle id=\\"small\\"/&gt;"}},{"html":"&lt;beetle/&gt;"},{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm/&gt"}}],"curLevel":"10","answers":["mushroom *","mushroom beetle, mushroom worm","#small, worm","mushroom beetle, worm"],"checkMarkSideId":"mark-ten","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-10"},{"mainClass":"task11","taskName":"Select the beetles beside the mushroom","images":[{"src":"assets/beetle.svg","class":"small-beetle-table","tooltip":"&lt;beetle class=\\"small\\"/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/beetle.svg","class":"beetle-r","tooltip":"&lt;beetle/&gt;"},{"src":"assets/beetle.svg","class":"beetle-table-r","tooltip":"&lt;beetle class=\\"small\\"/&gt;"},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;beetle class=\\"small\\"/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle class=\\"small\\"/&gt;"}},{"html":"&lt;beetle/&gt;"},{"html":"&lt;beetle class=\\"small\\"/&gt;"},{"html":"&lt;fly-agaric/&gt","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle class=\\"small\\"/&gt;"}},{"html":"&lt;mushroom/&gt;"}],"curLevel":"11","answers":["mushroom ~ beetle, beetle ~ .small","mushroom ~ beetle, beetle ~ beetle","mushroom ~ beetle, beetle ~ beetle.small"],"checkMarkSideId":"mark-eleven","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-11"}]');

/***/ }),

/***/ "./src/levelsDescriptions.json":
/*!*************************************!*\
  !*** ./src/levelsDescriptions.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"classHelp":"help1","topic_task":"Type Selector","task":"Select elements by their type","symbol_task":"A","description_task":"Selects all elements of type <mark><strong>A</strong></mark>. Type refers to the type of tag, so <mark>&lt;div&gt;</mark>,<mark>&lt;p&gt;</mark> and <mark>&lt;ul&gt;</mark> are all different element types.","example_word":"Examples","example_first":"<mark>div</mark> selects all <mark>&lt;div&gt;</mark> elements.","example_second":"<mark>p</mark> selects all <mark>&lt;p&gt;</mark> elements."},{"classHelp":"help2","topic_task":"Type Selector","task":"Select elements by their type","symbol_task":"A","description_task":"Selects all elements of type <mark><strong>A</strong></mark>. Type refers to the type of tag, so <mark>&lt;div&gt;</mark>,<mark>&lt;p&gt;</mark> and <mark>&lt;ul&gt;</mark> are all different element types.","example_word":"Examples","example_first":"<mark>div</mark> selects all <mark>&lt;div&gt;</mark> elements.","example_second":"<mark>p</mark> selects all <mark>&lt;p&gt;</mark> elements."},{"classHelp":"help3","topic_task":"ID Selector","task":"Select elements with an ID","symbol_task":"<mark>#id</mark>","description_task":"Selects all element with a specific <mark><strong>id</strong></mark>. You can also combine the ID selector with the type selector.","example_word":"Examples","example_first":"<mark>#cool</mark> selects any element with <mark>id=\\"cool\\"</mark> elements.","example_second":"<mark>ul#long</mark> selects <mark>&lt;ul id=\\"long\\"&gt;</mark> elements."},{"classHelp":"help4","topic_task":"Nth Child ","task":"Select an element by its order in another element","symbol_task":"<mark>:nth-child()</mark>","description_task":"Selects <mark>nth</mark> () child element in another element.","example_word":"Examples","example_first":"<mark>:nth-child(6)</mark>selects every element that is the 8th child of another element.","example_second":"<mark>div p:nth-child(5)</mark> selects the second p in every <mark>div</mark>"},{"classHelp":"help5","topic_task":"Combine the Class Selector","task":"","symbol_task":"<mark>A.className</mark>","description_task":"You can combine the class selector with other selectors, like the type selector.","example_word":"Examples","example_first":"<mark>ul.important</mark> selects all <mark>ul</mark> elements that have <mark>class=\\"important\\"</mark>","example_second":"<mark>#big.wide</mark> selects all elements with <mark>id=\\"big\\"</mark> that also have <mark>class=\\"wide\\"</mark>"},{"classHelp":"help6","topic_task":"Combine the Universal Selector","task":"Select all worms that eat mushrooms","symbol_task":"<mark>A *</mark>","description_task":"This selects all elements inside of <mark>A</mark>","example_word":"Examples","example_first":"<mark>p *</mark> selects every element inside all <mark>&lt;p&gt;</mark> elements.","example_second":"<mark>ul.fancy *</mark> selects every element inside all <mark>&lt;ul class=\\"eating\\"&gt;</mark>"},{"classHelp":"help7","topic_task":"Combine the Class Selector","task":"","symbol_task":"<mark>A B.className</mark>","description_task":"You can combine the class selector with other selectors, like the type selector.","example_word":"Examples","example_first":"<mark>p *</mark> selects every element inside all <mark>&lt;p&gt;</mark> elements.","example_second":"<mark>ul.fancy *</mark> selects every element inside all <mark>&lt;ul class=\\"eating\\"&gt;</mark>"},{"classHelp":"help8","topic_task":"Comma Combinator","task":"Combine, selectors, with... commas!","symbol_task":"<mark>A, B</mark>","description_task":"Thanks to Shatner technology, this selects all <mark>A</mark> and <mark>B</mark> elements. You can combine any selectors this way, and you can specify more than two.","example_word":"Examples","example_first":"<mark>p .good</mark> selects all <mark>&lt;p&gt;</mark> elements as well as all elements with <mark>class=\\"good\\"</mark>.","example_second":"<mark>a, p, div</mark> selects all <mark>&lt;a&gt;</mark>, <mark>&lt;p&gt;</mark> and <mark>&lt;div&gt;</mark> elements"},{"classHelp":"help9","topic_task":"The Universal Selector","task":"You can select everything!","symbol_task":"<mark>*</mark>","description_task":"You can select all elements with the universal selector!","example_word":"Examples","example_first":"<mark>p *</mark> selects any element inside all <mark>&lt;p&gt;</mark> elements","example_second":""},{"classHelp":"help10","topic_task":"Descendant Selector","task":"Select an element inside another element","symbol_task":"A B","description_task":"Selects all <mark><strong>B</strong></mark> inside of <mark><strong>A</strong></mark>. <mark><strong>B</strong></mark> is called a descendant because it is inside of another element.","example_word":"Examples","example_first":"<mark>p strong</mark> selects all <mark>&lt;strong&gt;</mark> elements that are inside of any <mark>&lt;p&gt;</mark>.","example_second":"<mark>#fancy span</mark> selects any span elements that are inside of the element with <mark>id=\\"fancy\\"</mark>"},{"classHelp":"help11","topic_task":"General Sibling Selector","task":"Select elements that follows another element","symbol_task":"<mark>A B</mark>","description_task":"You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.","example_word":"Examples","example_first":"<mark>A ~ B</mark> selects all <mark>&lt;B&gt;</mark> that follow a <mark>&lt;A&gt;</mark>.","example_second":""}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHbEYsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtJQUNwQyxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDVkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9sZXZlbHNEZXNjcmlwdGlvbi50cyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9sZXZlbHNNZW51LnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBsZXZlbHNGcm9tSnNvbiBmcm9tIFwiLi9hbGxMZXZlbHMuanNvblwiO1xyXG5pbXBvcnQgbGV2ZWxzRGVzY3JpcHRpb25zIGZyb20gXCIuL2xldmVsc0Rlc2NyaXB0aW9ucy5qc29uXCI7XHJcbmltcG9ydCB7IGNoYW5nZVRleHRSaWdodFNlY3QgfSBmcm9tIFwiLi9sZXZlbHNEZXNjcmlwdGlvblwiO1xyXG5pbXBvcnQgeyBsZXZlbHNPZk1lbnUgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IGJ0blJlc3NldFByb2dyZXNzIH0gZnJvbSBcIi4vbGV2ZWxzTWVudVwiO1xyXG5pbXBvcnQgeyBtYXJrTGV2ZWxzT2ZNZW51IH0gZnJvbSBcIi4vbGV2ZWxzTWVudVwiO1xyXG5pbXBvcnQgeyBIdG1sQ29kZSwgSW1hZ2UsIExldmVsLCBMZXZlbERlc2NyaXB0aW9uIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBsZXQgY3VycmVudExldmVsOiBudW1iZXIgPSAwO1xyXG5sZXQgbGV2ZWxzOiBMZXZlbFtdID0gW107XHJcblxyXG5jb25zdCByaWdodEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0LWJ1dHRvblwiKTtcclxuY29uc3QgbGVmdEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnQtYnV0dG9uXCIpO1xyXG5jb25zdCB3aW5NZXNzYWdlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luLW1lc3NhZ2VcIik7XHJcbmNvbnN0IGJ1dHRvbkhlbHAgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24taGVscFwiKTtcclxuY29uc3QgYWRkQ2xhc3NCb2R5ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9keVwiKTtcclxuY29uc3QgdGFza05hbWUgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIik7XHJcbmNvbnN0IGh0bWxDb250ZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHRtbC1jb250ZW50XCIpO1xyXG5jb25zdCBjdXJyZW50TGV2ZWxFbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtbGV2ZWxcIik7XHJcblxyXG5jb25zdCBhbnN3ZXJUYXNrID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1hbnN3ZXJcIik7XHJcbmNvbnN0IGJ1dHRvbkVudGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLWVudGVyXCIpO1xyXG5jb25zdCBhbGxUYWJsZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLXdyYXBwZXJcIik7XHJcbmNvbnN0IGltZ1RhYmxlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLXRhYmxlXCIpO1xyXG5jb25zdCBjaGVrTWFya1Rhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVjay1tYXJrXCIpO1xyXG5cclxuY3VycmVudExldmVsID0gK0pTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpbmRleEFyck9mVGFza1wiKSB8fCBcIjBcIik7XHJcbmxldmVscyA9XHJcbiAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFsbExldmVsc1wiKSB8fCBcIm51bGxcIikgfHwgbGV2ZWxzRnJvbUpzb247XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpOiB2b2lkIHtcclxuICBjaGVrTWFya1Rhc2s/LmNsYXNzTGlzdC5yZW1vdmUoXCJkb25lXCIpO1xyXG4gIGlmIChsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSkge1xyXG4gICAgY2hla01hcmtUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICB9XHJcbn1cclxubG9hZFBhZ2UoKTtcclxuXHJcbmZ1bmN0aW9uIGFkZENsYXNzVG9Cb2R5TmV4dCgpOiB2b2lkIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsICsgMV0ubWFpbkNsYXNzKTtcclxufVxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvQm9keVByZXYoKTogdm9pZCB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5hZGQobGV2ZWxzW2N1cnJlbnRMZXZlbCAtIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NGcm9tQm9keU5leHQoKTogdm9pZCB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5yZW1vdmUobGV2ZWxzW2N1cnJlbnRMZXZlbCAtIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NGcm9tQm9keVByZXYoKTogdm9pZCB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5yZW1vdmUobGV2ZWxzW2N1cnJlbnRMZXZlbCArIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuXHJcbmxldmVsc09mTWVudS5mb3JFYWNoKChlbGVtOiBFbGVtZW50KSA9PiB7XHJcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5yZW1vdmUobGV2ZWxzW2N1cnJlbnRMZXZlbF0ubWFpbkNsYXNzKTtcclxuICAgIGN1cnJlbnRMZXZlbCA9IGxldmVscy5maW5kSW5kZXgoXHJcbiAgICAgIChsZXY6IExldmVsLCBpOiBudW1iZXIpID0+IGVsZW0uY2xhc3NOYW1lID09PSBsZXYubGV2ZWxJbk1lbnVcclxuICAgICk7XHJcbiAgICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsXS5tYWluQ2xhc3MpO1xyXG4gICAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICAgIGNyZWF0ZUxldmVsRWxlbWVudHMoKTtcclxuICAgIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5idG5SZXNzZXRQcm9ncmVzcz8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgbGV2ZWxzLmZvckVhY2goKG9iajogTGV2ZWwpID0+IHtcclxuICAgIG9iai5pc0xldmVsRG9uZSA9IGZhbHNlO1xyXG4gICAgb2JqLmlzTGV2ZWxEb25lV2l0aEhlbHAgPSBmYWxzZTtcclxuICB9KTtcclxuICBtYXJrTGV2ZWxzT2ZNZW51LmZvckVhY2goKGVsZW06IEVsZW1lbnQpID0+IHtcclxuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImRvbmVcIik7XHJcbiAgfSk7XHJcbiAgbGV2ZWxzRGVzY3JpcHRpb25zLmZvckVhY2goKG9iajogTGV2ZWxEZXNjcmlwdGlvbiwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xldmVsc0Rlc2NyaXB0aW9uc1tpXS5jbGFzc0hlbHB9YClcclxuICAgICk7XHJcbiAgICBzeW1ib2xIZWxwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcblxyXG4gIHdpbk1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaGlnaGxpZ2h0SHRtbEltZyhwaWN0dXJlOiBIVE1MRWxlbWVudCwgdGV4dEhUTUw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc3QgcG9wdXAgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBcIik7XHJcbiAgcGljdHVyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LmFkZChcInNoYWRvd1wiKTtcclxuICAgIHRleHRIVE1MLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHQxXCIpO1xyXG4gICAgcG9wdXA/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbiAgcGljdHVyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFkb3dcIik7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG5cclxuICB0ZXh0SFRNTC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGV4dEhUTUwuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodDFcIik7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5hZGQoXCJzaGFkb3dcIik7XHJcbiAgICBwb3B1cD8uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICB0ZXh0SFRNTC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWRvd1wiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMZXZlbFBpY3R1cmVzKCk6IEhUTUxFbGVtZW50W10gIHtcclxuICBsZXQgYXJyYXlQaWN0dXJlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gIGltZ1RhYmxlPy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pbWFnZXMuZm9yRWFjaCgocGljdHVyZU9iajogSW1hZ2UpID0+IHtcclxuICAgIGNvbnN0IHBpY3R1cmUgPSBjcmVhdGVQaWN0dXJlKHBpY3R1cmVPYmopO1xyXG4gICAgYXJyYXlQaWN0dXJlcy5wdXNoKHBpY3R1cmUpO1xyXG4gICAgaWYgKHBpY3R1cmVPYmoubmVzdGVkSW1nKSB7XHJcbiAgICAgIGNvbnN0IG5lc3RlZCA9IGNyZWF0ZVBpY3R1cmUocGljdHVyZU9iai5uZXN0ZWRJbWcsIHRydWUpO1xyXG4gICAgICBwaWN0dXJlLmFwcGVuZENoaWxkKG5lc3RlZCk7XHJcbiAgICAgIGFycmF5UGljdHVyZXMucHVzaChuZXN0ZWQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBhcnJheVBpY3R1cmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQaWN0dXJlKG9iajogSW1hZ2UsIG5lc3RlZCA9IGZhbHNlKTogSFRNTEVsZW1lbnQge1xyXG4gIGxldCBpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgaWYgKCFuZXN0ZWQpIHtcclxuICAgIGltZ1RhYmxlPy5hcHBlbmRDaGlsZChpbWdXcmFwcGVyKTtcclxuICAgIGltZ1dyYXBwZXIuY2xhc3NOYW1lID0gXCJwb3NpdGlvbi1yZWxhdGl2ZVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbWdXcmFwcGVyLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tYWJzb2x1dGVcIjtcclxuICB9XHJcbiAgbGV0IHBpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gIHBpY3R1cmUuY2xhc3NOYW1lID0gb2JqLmNsYXNzO1xyXG4gIHBpY3R1cmUuc3JjID0gb2JqLnNyYztcclxuICBpbWdXcmFwcGVyPy5hcHBlbmRDaGlsZChwaWN0dXJlKTtcclxuICBsZXQgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHBvcFVwLmNsYXNzTmFtZSA9IFwicG9wdXBcIjtcclxuICBwb3BVcC5pbm5lckhUTUwgPSBvYmoudG9vbHRpcDtcclxuICBpbWdXcmFwcGVyLmFwcGVuZENoaWxkKHBvcFVwKTtcclxuICByZXR1cm4gaW1nV3JhcHBlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSHRtbEJsb2NrcygpOiBIVE1MRWxlbWVudFtdIHtcclxuICBjb25zdCBhcnJFbGVtOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgaHRtbENvbnRlbnQ/LnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gIGxldmVsc1tjdXJyZW50TGV2ZWxdLmh0bWxfY29kZS5mb3JFYWNoKCh0YWdPYmo6IEh0bWxDb2RlLCBpOm51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgZGl2SHRtbEVsZW1lbnQgPSBjcmVhdGVIdG1sQmxvY2sodGFnT2JqKTtcclxuICAgIGFyckVsZW0ucHVzaChkaXZIdG1sRWxlbWVudCk7XHJcbiAgICBpZiAodGFnT2JqLmh0bWxfbmVzdGVkKSB7XHJcbiAgICAgIGNvbnN0IGh0bWxOZXN0ZWQgPSBjcmVhdGVIdG1sQmxvY2sodGFnT2JqLmh0bWxfbmVzdGVkLCB0cnVlKTtcclxuICAgICAgZGl2SHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbE5lc3RlZCk7XHJcbiAgICAgIGFyckVsZW0ucHVzaChodG1sTmVzdGVkKTtcclxuICAgICAgbGV0IGNsb3NlZFRhZyA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxyXG4gICAgICAgIGxldmVsc1tjdXJyZW50TGV2ZWxdLmh0bWxfY29kZVtpXS5odG1sX2Nsb3NlXHJcbiAgICAgICk7XHJcbiAgICAgIGRpdkh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlZFRhZyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFyckVsZW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0bWxCbG9jayhvYmo6IEh0bWxDb2RlLCBodG1sX25lc3RlZCA9IGZhbHNlKTogSFRNTEVsZW1lbnQge1xyXG4gIGxldCBzdHJIdG1sQ29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgc3RySHRtbENvZGUuY2xhc3NOYW1lID0gXCJzdHItaHRtbC1jb2RlXCI7XHJcbiAgc3RySHRtbENvZGUuaW5uZXJIVE1MID0gb2JqLmh0bWw7XHJcbiAgaWYgKCFodG1sX25lc3RlZCkge1xyXG4gICAgaHRtbENvbnRlbnQuYXBwZW5kQ2hpbGQoc3RySHRtbENvZGUpO1xyXG4gIH1cclxuICByZXR1cm4gc3RySHRtbENvZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxldmVsRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgbGV0IHBpY3R1cmVzRWxBcnIgPSBjcmVhdGVMZXZlbFBpY3R1cmVzKCk7XHJcbiAgbGV0IGh0bWxFbEFyciA9IGNyZWF0ZUh0bWxCbG9ja3MoKTtcclxuICBwaWN0dXJlc0VsQXJyLmZvckVhY2goKHBpY3RFbDogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGhpZ2hsaWdodEh0bWxJbWcocGljdEVsLCBodG1sRWxBcnJbaW5kZXhdKTtcclxuICB9KTtcclxuICB0YXNrTmFtZS5pbm5lckhUTUwgPSBsZXZlbHNbY3VycmVudExldmVsXS50YXNrTmFtZTtcclxuICBjdXJyZW50TGV2ZWxFbC5pbm5lckhUTUwgPSBsZXZlbHNbY3VycmVudExldmVsXS5jdXJMZXZlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmx5SW1nKCk6IHZvaWQge1xyXG4gIGNvbnN0IGFsbFBpY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvc2l0aW9uLXJlbGF0aXZlXCIpO1xyXG4gIGFsbFBpY3QuZm9yRWFjaCgoaW1nT2ZUYWJsZTogRWxlbWVudCkgPT4ge1xyXG4gICAgaW1nT2ZUYWJsZS5jbGFzc0xpc3QuYWRkKFwiZmx5LWltZ1wiKTtcclxuICB9KTtcclxuIH1cclxuXHJcbnJpZ2h0QnRuPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGlmIChjdXJyZW50TGV2ZWwgPCAxMCkge1xyXG4gICAgYWRkQ2xhc3NUb0JvZHlOZXh0KCk7XHJcbiAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgZGVsQW5zd2VyKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmxlZnRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCAhPT0gMCkge1xyXG4gICAgYWRkQ2xhc3NUb0JvZHlQcmV2KCk7XHJcbiAgICBjdXJyZW50TGV2ZWwgLT0gMTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICByZW1vdmVDbGFzc0Zyb21Cb2R5UHJldigpO1xyXG4gICAgZGVsQW5zd2VyKCk7XHJcbiAgfVxyXG59KTtcclxuZnVuY3Rpb24gbG9hZFBhZ2UoKTogdm9pZCB7XHJcbiAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsXS5tYWluQ2xhc3MpO1xyXG4gIGNyZWF0ZUxldmVsRWxlbWVudHMoKTtcclxuICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgbGV2ZWxzLmZvckVhY2goKG9iajogTGV2ZWwsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKG9iai5pc0xldmVsRG9uZSkge1xyXG4gICAgICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7bGV2ZWxzRGVzY3JpcHRpb25zW2ldLmNsYXNzSGVscH1gKVxyXG4gICAgICApO1xyXG4gICAgICBzeW1ib2xIZWxwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqLmlzTGV2ZWxEb25lV2l0aEhlbHApIHtcclxuICAgICAgbGV0IG1hcmtTaWRlQm94VGFzayA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2ldLmNoZWNrTWFya1NpZGVJZClcclxuICAgICAgKTtcclxuICAgICAgbWFya1NpZGVCb3hUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd01lc3NhZ2VJZkFsbExldmVsc0RvbmUoKTogdm9pZCB7XHJcbiAgaWYgKGxldmVscy5ldmVyeSgodmFsOiBMZXZlbCkgPT4gdmFsLmlzTGV2ZWxEb25lKSkge1xyXG4gICAgd2luTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW1wbGVtZW50RW50ZXJQcmVzc0xhc3RMZXZlbCgpOiB2b2lkIHtcclxuICBmbHlJbWcoKTtcclxuICBsZXQgbWFya1NpZGVCb3hUYXNrID0gPEhUTUxFbGVtZW50PihcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxldmVsc1tjdXJyZW50TGV2ZWxdLmNoZWNrTWFya1NpZGVJZClcclxuICApO1xyXG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0LWFuc3dlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XHJcbiAgbWFya1NpZGVCb3hUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSA9IHRydWU7XHJcbiAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbn1cclxuZnVuY3Rpb24gaW1wbGVtZW50RW50ZXJQcmVzcygpOiB2b2lkIHtcclxuICBpZiAobGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2Vycy5pbmNsdWRlcyhhbnN3ZXJUYXNrLnZhbHVlKSkge1xyXG4gICAgZmx5SW1nKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbGV0IG1hcmtTaWRlQm94VGFzayA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2N1cnJlbnRMZXZlbF0uY2hlY2tNYXJrU2lkZUlkKVxyXG4gICAgICApO1xyXG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dC1hbnN3ZXJcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xyXG4gICAgICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgICBhZGRDbGFzc1RvQm9keU5leHQoKTtcclxuICAgICAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaXNMZXZlbERvbmUgPSB0cnVlO1xyXG4gICAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICAgIGRlbEFuc3dlcigpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGxUYWJsZS5jbGFzc0xpc3QuYWRkKFwic2hha2VcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgYWxsVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWtlXCIpO1xyXG4gICAgfSwgMTIwMCk7XHJcbiAgfVxyXG59XHJcbmJ1dHRvbkVudGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICBjdXJyZW50TGV2ZWwgPT09IDEwICYmXHJcbiAgICBsZXZlbHNbY3VycmVudExldmVsXS5hbnN3ZXJzLmluY2x1ZGVzKGFuc3dlclRhc2sudmFsdWUpXHJcbiAgKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzTGFzdExldmVsKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiICYmIGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICBldmVudC5jb2RlID09PSBcIkVudGVyXCIgJiZcclxuICAgIGN1cnJlbnRMZXZlbCA9PT0gMTAgJiZcclxuICAgIGxldmVsc1tjdXJyZW50TGV2ZWxdLmFuc3dlcnMuaW5jbHVkZXMoYW5zd2VyVGFzay52YWx1ZSlcclxuICApIHtcclxuICAgIGltcGxlbWVudEVudGVyUHJlc3NMYXN0TGV2ZWwoKTtcclxuICAgIHNob3dNZXNzYWdlSWZBbGxMZXZlbHNEb25lKCk7XHJcbiAgfVxyXG59KTtcclxuZnVuY3Rpb24gc2F2ZUxvY2FsU3RvcmFnZSgpOiB2b2lkIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIsIFN0cmluZyhjdXJyZW50TGV2ZWwpKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFsbExldmVsc1wiLCBKU09OLnN0cmluZ2lmeShsZXZlbHMpKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIHNhdmVMb2NhbFN0b3JhZ2UoKTtcclxufSk7XHJcblxyXG5idXR0b25IZWxwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc05hbWUgPSBcImZseS1hbnN3ZXJcIjtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gbGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2Vyc1swXTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZVdpdGhIZWxwID0gdHJ1ZTtcclxuICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5jbGFzc0hlbHB9YClcclxuICApO1xyXG4gIHN5bWJvbEhlbHAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBkZWxBbnN3ZXIoKTogdm9pZCB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwiZmx5LWFuc3dlclwiKTtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gXCJcIjtcclxufVxyXG4iLCJpbXBvcnQgbGV2ZWxzRGVzY3JpcHRpb25zIGZyb20gJy4vbGV2ZWxzRGVzY3JpcHRpb25zLmpzb24nO1xyXG5pbXBvcnQge2N1cnJlbnRMZXZlbH0gZnJvbSAnLi9pbmRleCdcclxuXHJcbmxldCB0b3BpY1Rhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3BpYy10YXNrXCIpO1xyXG5sZXQgdGFza05hbWVUZXh0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza1wiKTtcclxubGV0IHN5bWJvbFRhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zeW1ib2wtdGFza1wiKTtcclxubGV0IGRlc2NyaXB0aW9uVGFzayA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uLXRhc2tcIik7XHJcbmxldCBleGFtcGxlV29yZCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtd29yZFwiKTtcclxubGV0IGV4YW1wbGVGaXJzdCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtZmlyc3RcIik7XHJcbmxldCBleGFtcGxlU2Vjb25kID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhhbXBsZS1zZWNvbmRcIik7XHJcbmxldCBwcm9ncmVzcyA9IDxIVE1MUHJvZ3Jlc3NFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVGV4dFJpZ2h0U2VjdCgpOiB2b2lkIHtcclxuICAgIHRvcGljVGFzay5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS50b3BpY190YXNrO1xyXG4gICAgdGFza05hbWVUZXh0LmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnRhc2s7XHJcbiAgICBzeW1ib2xUYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnN5bWJvbF90YXNrO1xyXG4gICAgZGVzY3JpcHRpb25UYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmRlc2NyaXB0aW9uX3Rhc2s7XHJcbiAgICBleGFtcGxlV29yZC5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5leGFtcGxlX3dvcmQ7XHJcbiAgICBleGFtcGxlRmlyc3QuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV9maXJzdDtcclxuICAgIGV4YW1wbGVTZWNvbmQuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV9zZWNvbmQ7XHJcbiAgICBwcm9ncmVzcy52YWx1ZSA9IDEwICogKGN1cnJlbnRMZXZlbCArIDEpO1xyXG4gIH0iLCJsZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFyay1tYWluXCIpO1xyXG5sZXQgc2lkZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZS1ib3hcIik7XHJcbmV4cG9ydCBsZXQgbGV2ZWxzT2ZNZW51ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stb2YtbWVudVwiKSlcclxuZXhwb3J0IGxldCBidG5SZXNzZXRQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXJlc2V0LXByb2dyZXNzXCIpO1xyXG5leHBvcnQgbGV0IG1hcmtMZXZlbHNPZk1lbnUgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hlY2stbWFya1wiKSlcclxuXHJcblxyXG5tZW51QnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIG1lbnVCdXR0b24/LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICBzaWRlQm94Py5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG5cclxuXHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9