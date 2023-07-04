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
    if (event.code === "Enter" &&
        currentLevel === 10) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDVkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9sZXZlbHNEZXNjcmlwdGlvbi50cyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9sZXZlbHNNZW51LnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBsZXZlbHNGcm9tSnNvbiBmcm9tIFwiLi9hbGxMZXZlbHMuanNvblwiO1xyXG5pbXBvcnQgbGV2ZWxzRGVzY3JpcHRpb25zIGZyb20gXCIuL2xldmVsc0Rlc2NyaXB0aW9ucy5qc29uXCI7XHJcbmltcG9ydCB7IGNoYW5nZVRleHRSaWdodFNlY3QgfSBmcm9tIFwiLi9sZXZlbHNEZXNjcmlwdGlvblwiO1xyXG5pbXBvcnQgeyBsZXZlbHNPZk1lbnUgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IGJ0blJlc3NldFByb2dyZXNzIH0gZnJvbSBcIi4vbGV2ZWxzTWVudVwiO1xyXG5pbXBvcnQgeyBtYXJrTGV2ZWxzT2ZNZW51IH0gZnJvbSBcIi4vbGV2ZWxzTWVudVwiO1xyXG5pbXBvcnQgeyBIdG1sQ29kZSwgSW1hZ2UsIExldmVsLCBMZXZlbERlc2NyaXB0aW9uIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBsZXQgY3VycmVudExldmVsOiBudW1iZXIgPSAwO1xyXG5sZXQgbGV2ZWxzOiBMZXZlbFtdID0gW107XHJcblxyXG5jb25zdCByaWdodEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0LWJ1dHRvblwiKTtcclxuY29uc3QgbGVmdEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnQtYnV0dG9uXCIpO1xyXG5jb25zdCB3aW5NZXNzYWdlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luLW1lc3NhZ2VcIik7XHJcbmNvbnN0IGJ1dHRvbkhlbHAgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24taGVscFwiKTtcclxuY29uc3QgYWRkQ2xhc3NCb2R5ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9keVwiKTtcclxuY29uc3QgdGFza05hbWUgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIik7XHJcbmNvbnN0IGh0bWxDb250ZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHRtbC1jb250ZW50XCIpO1xyXG5jb25zdCBjdXJyZW50TGV2ZWxFbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtbGV2ZWxcIik7XHJcblxyXG5jb25zdCBhbnN3ZXJUYXNrID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1hbnN3ZXJcIik7XHJcbmNvbnN0IGJ1dHRvbkVudGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLWVudGVyXCIpO1xyXG5jb25zdCBhbGxUYWJsZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLXdyYXBwZXJcIik7XHJcbmNvbnN0IGltZ1RhYmxlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLXRhYmxlXCIpO1xyXG5jb25zdCBjaGVrTWFya1Rhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVjay1tYXJrXCIpO1xyXG5cclxuY3VycmVudExldmVsID0gK0pTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpbmRleEFyck9mVGFza1wiKSB8fCBcIjBcIik7XHJcbmxldmVscyA9XHJcbiAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFsbExldmVsc1wiKSB8fCBcIm51bGxcIikgfHwgbGV2ZWxzRnJvbUpzb247XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpOiB2b2lkIHtcclxuICBjaGVrTWFya1Rhc2s/LmNsYXNzTGlzdC5yZW1vdmUoXCJkb25lXCIpO1xyXG4gIGlmIChsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSkge1xyXG4gICAgY2hla01hcmtUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICB9XHJcbn1cclxubG9hZFBhZ2UoKTtcclxuXHJcbmZ1bmN0aW9uIGFkZENsYXNzVG9Cb2R5TmV4dCgpOiB2b2lkIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsICsgMV0ubWFpbkNsYXNzKTtcclxufVxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvQm9keVByZXYoKTogdm9pZCB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5hZGQobGV2ZWxzW2N1cnJlbnRMZXZlbCAtIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NGcm9tQm9keU5leHQoKTogdm9pZCB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5yZW1vdmUobGV2ZWxzW2N1cnJlbnRMZXZlbCAtIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NGcm9tQm9keVByZXYoKTogdm9pZCB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5yZW1vdmUobGV2ZWxzW2N1cnJlbnRMZXZlbCArIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuXHJcbmxldmVsc09mTWVudS5mb3JFYWNoKChlbGVtOiBFbGVtZW50KSA9PiB7XHJcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5yZW1vdmUobGV2ZWxzW2N1cnJlbnRMZXZlbF0ubWFpbkNsYXNzKTtcclxuICAgIGN1cnJlbnRMZXZlbCA9IGxldmVscy5maW5kSW5kZXgoXHJcbiAgICAgIChsZXY6IExldmVsLCBpOiBudW1iZXIpID0+IGVsZW0uY2xhc3NOYW1lID09PSBsZXYubGV2ZWxJbk1lbnVcclxuICAgICk7XHJcbiAgICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsXS5tYWluQ2xhc3MpO1xyXG4gICAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICAgIGNyZWF0ZUxldmVsRWxlbWVudHMoKTtcclxuICAgIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5idG5SZXNzZXRQcm9ncmVzcz8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgbGV2ZWxzLmZvckVhY2goKG9iajogTGV2ZWwpID0+IHtcclxuICAgIG9iai5pc0xldmVsRG9uZSA9IGZhbHNlO1xyXG4gICAgb2JqLmlzTGV2ZWxEb25lV2l0aEhlbHAgPSBmYWxzZTtcclxuICB9KTtcclxuICBtYXJrTGV2ZWxzT2ZNZW51LmZvckVhY2goKGVsZW06IEVsZW1lbnQpID0+IHtcclxuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImRvbmVcIik7XHJcbiAgfSk7XHJcbiAgbGV2ZWxzRGVzY3JpcHRpb25zLmZvckVhY2goKG9iajogTGV2ZWxEZXNjcmlwdGlvbiwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xldmVsc0Rlc2NyaXB0aW9uc1tpXS5jbGFzc0hlbHB9YClcclxuICAgICk7XHJcbiAgICBzeW1ib2xIZWxwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcblxyXG4gIHdpbk1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaGlnaGxpZ2h0SHRtbEltZyhwaWN0dXJlOiBIVE1MRWxlbWVudCwgdGV4dEhUTUw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc3QgcG9wdXAgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBcIik7XHJcbiAgcGljdHVyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LmFkZChcInNoYWRvd1wiKTtcclxuICAgIHRleHRIVE1MLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHQxXCIpO1xyXG4gICAgcG9wdXA/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbiAgcGljdHVyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFkb3dcIik7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG5cclxuICB0ZXh0SFRNTC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGV4dEhUTUwuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodDFcIik7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5hZGQoXCJzaGFkb3dcIik7XHJcbiAgICBwb3B1cD8uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICB0ZXh0SFRNTC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWRvd1wiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMZXZlbFBpY3R1cmVzKCk6IEhUTUxFbGVtZW50W10gIHtcclxuICBsZXQgYXJyYXlQaWN0dXJlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gIGltZ1RhYmxlPy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pbWFnZXMuZm9yRWFjaCgocGljdHVyZU9iajogSW1hZ2UpID0+IHtcclxuICAgIGNvbnN0IHBpY3R1cmUgPSBjcmVhdGVQaWN0dXJlKHBpY3R1cmVPYmopO1xyXG4gICAgYXJyYXlQaWN0dXJlcy5wdXNoKHBpY3R1cmUpO1xyXG4gICAgaWYgKHBpY3R1cmVPYmoubmVzdGVkSW1nKSB7XHJcbiAgICAgIGNvbnN0IG5lc3RlZCA9IGNyZWF0ZVBpY3R1cmUocGljdHVyZU9iai5uZXN0ZWRJbWcsIHRydWUpO1xyXG4gICAgICBwaWN0dXJlLmFwcGVuZENoaWxkKG5lc3RlZCk7XHJcbiAgICAgIGFycmF5UGljdHVyZXMucHVzaChuZXN0ZWQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBhcnJheVBpY3R1cmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQaWN0dXJlKG9iajogSW1hZ2UsIG5lc3RlZCA9IGZhbHNlKTogSFRNTEVsZW1lbnQge1xyXG4gIGxldCBpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgaWYgKCFuZXN0ZWQpIHtcclxuICAgIGltZ1RhYmxlPy5hcHBlbmRDaGlsZChpbWdXcmFwcGVyKTtcclxuICAgIGltZ1dyYXBwZXIuY2xhc3NOYW1lID0gXCJwb3NpdGlvbi1yZWxhdGl2ZVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbWdXcmFwcGVyLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tYWJzb2x1dGVcIjtcclxuICB9XHJcbiAgbGV0IHBpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gIHBpY3R1cmUuY2xhc3NOYW1lID0gb2JqLmNsYXNzO1xyXG4gIHBpY3R1cmUuc3JjID0gb2JqLnNyYztcclxuICBpbWdXcmFwcGVyPy5hcHBlbmRDaGlsZChwaWN0dXJlKTtcclxuICBsZXQgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHBvcFVwLmNsYXNzTmFtZSA9IFwicG9wdXBcIjtcclxuICBwb3BVcC5pbm5lckhUTUwgPSBvYmoudG9vbHRpcDtcclxuICBpbWdXcmFwcGVyLmFwcGVuZENoaWxkKHBvcFVwKTtcclxuICByZXR1cm4gaW1nV3JhcHBlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSHRtbEJsb2NrcygpOiBIVE1MRWxlbWVudFtdIHtcclxuICBjb25zdCBhcnJFbGVtOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgaHRtbENvbnRlbnQ/LnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gIGxldmVsc1tjdXJyZW50TGV2ZWxdLmh0bWxfY29kZS5mb3JFYWNoKCh0YWdPYmo6IEh0bWxDb2RlLCBpOm51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgZGl2SHRtbEVsZW1lbnQgPSBjcmVhdGVIdG1sQmxvY2sodGFnT2JqKTtcclxuICAgIGFyckVsZW0ucHVzaChkaXZIdG1sRWxlbWVudCk7XHJcbiAgICBpZiAodGFnT2JqLmh0bWxfbmVzdGVkKSB7XHJcbiAgICAgIGNvbnN0IGh0bWxOZXN0ZWQgPSBjcmVhdGVIdG1sQmxvY2sodGFnT2JqLmh0bWxfbmVzdGVkLCB0cnVlKTtcclxuICAgICAgZGl2SHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbE5lc3RlZCk7XHJcbiAgICAgIGFyckVsZW0ucHVzaChodG1sTmVzdGVkKTtcclxuICAgICAgbGV0IGNsb3NlZFRhZyA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxyXG4gICAgICAgIGxldmVsc1tjdXJyZW50TGV2ZWxdLmh0bWxfY29kZVtpXS5odG1sX2Nsb3NlXHJcbiAgICAgICk7XHJcbiAgICAgIGRpdkh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlZFRhZyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFyckVsZW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0bWxCbG9jayhvYmo6IEh0bWxDb2RlLCBodG1sX25lc3RlZCA9IGZhbHNlKTogSFRNTEVsZW1lbnQge1xyXG4gIGxldCBzdHJIdG1sQ29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgc3RySHRtbENvZGUuY2xhc3NOYW1lID0gXCJzdHItaHRtbC1jb2RlXCI7XHJcbiAgc3RySHRtbENvZGUuaW5uZXJIVE1MID0gb2JqLmh0bWw7XHJcbiAgaWYgKCFodG1sX25lc3RlZCkge1xyXG4gICAgaHRtbENvbnRlbnQuYXBwZW5kQ2hpbGQoc3RySHRtbENvZGUpO1xyXG4gIH1cclxuICByZXR1cm4gc3RySHRtbENvZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxldmVsRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgbGV0IHBpY3R1cmVzRWxBcnIgPSBjcmVhdGVMZXZlbFBpY3R1cmVzKCk7XHJcbiAgbGV0IGh0bWxFbEFyciA9IGNyZWF0ZUh0bWxCbG9ja3MoKTtcclxuICBwaWN0dXJlc0VsQXJyLmZvckVhY2goKHBpY3RFbDogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGhpZ2hsaWdodEh0bWxJbWcocGljdEVsLCBodG1sRWxBcnJbaW5kZXhdKTtcclxuICB9KTtcclxuICB0YXNrTmFtZS5pbm5lckhUTUwgPSBsZXZlbHNbY3VycmVudExldmVsXS50YXNrTmFtZTtcclxuICBjdXJyZW50TGV2ZWxFbC5pbm5lckhUTUwgPSBsZXZlbHNbY3VycmVudExldmVsXS5jdXJMZXZlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmx5SW1nKCk6IHZvaWQge1xyXG4gIGNvbnN0IGFsbFBpY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvc2l0aW9uLXJlbGF0aXZlXCIpO1xyXG4gIGFsbFBpY3QuZm9yRWFjaCgoaW1nT2ZUYWJsZTogRWxlbWVudCkgPT4ge1xyXG4gICAgaW1nT2ZUYWJsZS5jbGFzc0xpc3QuYWRkKFwiZmx5LWltZ1wiKTtcclxuICB9KTtcclxuIH1cclxuXHJcbnJpZ2h0QnRuPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGlmIChjdXJyZW50TGV2ZWwgPCAxMCkge1xyXG4gICAgYWRkQ2xhc3NUb0JvZHlOZXh0KCk7XHJcbiAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgZGVsQW5zd2VyKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmxlZnRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCAhPT0gMCkge1xyXG4gICAgYWRkQ2xhc3NUb0JvZHlQcmV2KCk7XHJcbiAgICBjdXJyZW50TGV2ZWwgLT0gMTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICByZW1vdmVDbGFzc0Zyb21Cb2R5UHJldigpO1xyXG4gICAgZGVsQW5zd2VyKCk7XHJcbiAgfVxyXG59KTtcclxuZnVuY3Rpb24gbG9hZFBhZ2UoKTogdm9pZCB7XHJcbiAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsXS5tYWluQ2xhc3MpO1xyXG4gIGNyZWF0ZUxldmVsRWxlbWVudHMoKTtcclxuICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgbGV2ZWxzLmZvckVhY2goKG9iajogTGV2ZWwsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKG9iai5pc0xldmVsRG9uZSkge1xyXG4gICAgICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7bGV2ZWxzRGVzY3JpcHRpb25zW2ldLmNsYXNzSGVscH1gKVxyXG4gICAgICApO1xyXG4gICAgICBzeW1ib2xIZWxwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqLmlzTGV2ZWxEb25lV2l0aEhlbHApIHtcclxuICAgICAgbGV0IG1hcmtTaWRlQm94VGFzayA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2ldLmNoZWNrTWFya1NpZGVJZClcclxuICAgICAgKTtcclxuICAgICAgbWFya1NpZGVCb3hUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd01lc3NhZ2VJZkFsbExldmVsc0RvbmUoKTogdm9pZCB7XHJcbiAgaWYgKGxldmVscy5ldmVyeSgodmFsOiBMZXZlbCkgPT4gdmFsLmlzTGV2ZWxEb25lKSkge1xyXG4gICAgd2luTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW1wbGVtZW50RW50ZXJQcmVzc0xhc3RMZXZlbCgpOiB2b2lkIHtcclxuICBmbHlJbWcoKTtcclxuICBsZXQgbWFya1NpZGVCb3hUYXNrID0gPEhUTUxFbGVtZW50PihcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxldmVsc1tjdXJyZW50TGV2ZWxdLmNoZWNrTWFya1NpZGVJZClcclxuICApO1xyXG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0LWFuc3dlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XHJcbiAgbWFya1NpZGVCb3hUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSA9IHRydWU7XHJcbiAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbn1cclxuZnVuY3Rpb24gaW1wbGVtZW50RW50ZXJQcmVzcygpOiB2b2lkIHtcclxuICBpZiAobGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2Vycy5pbmNsdWRlcyhhbnN3ZXJUYXNrLnZhbHVlKSkge1xyXG4gICAgZmx5SW1nKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbGV0IG1hcmtTaWRlQm94VGFzayA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2N1cnJlbnRMZXZlbF0uY2hlY2tNYXJrU2lkZUlkKVxyXG4gICAgICApO1xyXG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dC1hbnN3ZXJcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xyXG4gICAgICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgICBhZGRDbGFzc1RvQm9keU5leHQoKTtcclxuICAgICAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaXNMZXZlbERvbmUgPSB0cnVlO1xyXG4gICAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICAgIGRlbEFuc3dlcigpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGxUYWJsZS5jbGFzc0xpc3QuYWRkKFwic2hha2VcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgYWxsVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWtlXCIpO1xyXG4gICAgfSwgMTIwMCk7XHJcbiAgfVxyXG59XHJcbmJ1dHRvbkVudGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxuICBpZiAoY3VycmVudExldmVsID09PSAxMCkge1xyXG4gICAgaW1wbGVtZW50RW50ZXJQcmVzc0xhc3RMZXZlbCgpO1xyXG4gICAgc2hvd01lc3NhZ2VJZkFsbExldmVsc0RvbmUoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LmNvZGUgPT09IFwiRW50ZXJcIiAmJiBjdXJyZW50TGV2ZWwgPCAxMCkge1xyXG4gICAgaW1wbGVtZW50RW50ZXJQcmVzcygpO1xyXG4gICAgc2hvd01lc3NhZ2VJZkFsbExldmVsc0RvbmUoKTtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiICYmXHJcbiAgICBjdXJyZW50TGV2ZWwgPT09IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzTGFzdExldmVsKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxufSk7XHJcbmZ1bmN0aW9uIHNhdmVMb2NhbFN0b3JhZ2UoKTogdm9pZCB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbmRleEFyck9mVGFza1wiLCBTdHJpbmcoY3VycmVudExldmVsKSk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhbGxMZXZlbHNcIiwgSlNPTi5zdHJpbmdpZnkobGV2ZWxzKSk7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICBzYXZlTG9jYWxTdG9yYWdlKCk7XHJcbn0pO1xyXG5cclxuYnV0dG9uSGVscC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGFuc3dlclRhc2suY2xhc3NOYW1lID0gXCJmbHktYW5zd2VyXCI7XHJcbiAgYW5zd2VyVGFzay52YWx1ZSA9IGxldmVsc1tjdXJyZW50TGV2ZWxdLmFuc3dlcnNbMF07XHJcbiAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaXNMZXZlbERvbmVXaXRoSGVscCA9IHRydWU7XHJcbiAgbGV0IHN5bWJvbEhlbHAgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7bGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uY2xhc3NIZWxwfWApXHJcbiAgKTtcclxuICBzeW1ib2xIZWxwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZGVsQW5zd2VyKCk6IHZvaWQge1xyXG4gIGFuc3dlclRhc2suY2xhc3NMaXN0LnJlbW92ZShcImZseS1hbnN3ZXJcIik7XHJcbiAgYW5zd2VyVGFzay52YWx1ZSA9IFwiXCI7XHJcbn1cclxuIiwiaW1wb3J0IGxldmVsc0Rlc2NyaXB0aW9ucyBmcm9tICcuL2xldmVsc0Rlc2NyaXB0aW9ucy5qc29uJztcclxuaW1wb3J0IHtjdXJyZW50TGV2ZWx9IGZyb20gJy4vaW5kZXgnXHJcblxyXG5sZXQgdG9waWNUYXNrID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9waWMtdGFza1wiKTtcclxubGV0IHRhc2tOYW1lVGV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tcIik7XHJcbmxldCBzeW1ib2xUYXNrID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ltYm9sLXRhc2tcIik7XHJcbmxldCBkZXNjcmlwdGlvblRhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvbi10YXNrXCIpO1xyXG5sZXQgZXhhbXBsZVdvcmQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5leGFtcGxlLXdvcmRcIik7XHJcbmxldCBleGFtcGxlRmlyc3QgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5leGFtcGxlLWZpcnN0XCIpO1xyXG5sZXQgZXhhbXBsZVNlY29uZCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtc2Vjb25kXCIpO1xyXG5sZXQgcHJvZ3Jlc3MgPSA8SFRNTFByb2dyZXNzRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2dyZXNzXCIpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVRleHRSaWdodFNlY3QoKTogdm9pZCB7XHJcbiAgICB0b3BpY1Rhc2suaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0udG9waWNfdGFzaztcclxuICAgIHRhc2tOYW1lVGV4dC5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS50YXNrO1xyXG4gICAgc3ltYm9sVGFzay5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5zeW1ib2xfdGFzaztcclxuICAgIGRlc2NyaXB0aW9uVGFzay5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5kZXNjcmlwdGlvbl90YXNrO1xyXG4gICAgZXhhbXBsZVdvcmQuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV93b3JkO1xyXG4gICAgZXhhbXBsZUZpcnN0LmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmV4YW1wbGVfZmlyc3Q7XHJcbiAgICBleGFtcGxlU2Vjb25kLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmV4YW1wbGVfc2Vjb25kO1xyXG4gICAgcHJvZ3Jlc3MudmFsdWUgPSAxMCAqIChjdXJyZW50TGV2ZWwgKyAxKTtcclxuICB9IiwibGV0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcmstbWFpblwiKTtcclxubGV0IHNpZGVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGUtYm94XCIpO1xyXG5leHBvcnQgbGV0IGxldmVsc09mTWVudSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLW9mLW1lbnVcIikpXHJcbmV4cG9ydCBsZXQgYnRuUmVzc2V0UHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1yZXNldC1wcm9ncmVzc1wiKTtcclxuZXhwb3J0IGxldCBtYXJrTGV2ZWxzT2ZNZW51ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoZWNrLW1hcmtcIikpXHJcblxyXG5cclxubWVudUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICBtZW51QnV0dG9uPy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgc2lkZUJveD8uY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==