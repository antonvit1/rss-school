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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNWTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL2xldmVsc0Rlc2NyaXB0aW9uLnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL2xldmVsc01lbnUudHMiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuaW1wb3J0IGxldmVsc0Zyb21Kc29uIGZyb20gXCIuL2FsbExldmVscy5qc29uXCI7XHJcbmltcG9ydCBsZXZlbHNEZXNjcmlwdGlvbnMgZnJvbSBcIi4vbGV2ZWxzRGVzY3JpcHRpb25zLmpzb25cIjtcclxuaW1wb3J0IHsgY2hhbmdlVGV4dFJpZ2h0U2VjdCB9IGZyb20gXCIuL2xldmVsc0Rlc2NyaXB0aW9uXCI7XHJcbmltcG9ydCB7IGxldmVsc09mTWVudSB9IGZyb20gXCIuL2xldmVsc01lbnVcIjtcclxuaW1wb3J0IHsgYnRuUmVzc2V0UHJvZ3Jlc3MgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IG1hcmtMZXZlbHNPZk1lbnUgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IEh0bWxDb2RlLCBJbWFnZSwgTGV2ZWwsIExldmVsRGVzY3JpcHRpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGxldCBjdXJyZW50TGV2ZWw6IG51bWJlciA9IDA7XHJcbmxldCBsZXZlbHM6IExldmVsW10gPSBbXTtcclxuXHJcbmNvbnN0IHJpZ2h0QnRuID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmlnaHQtYnV0dG9uXCIpO1xyXG5jb25zdCBsZWZ0QnRuID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVmdC1idXR0b25cIik7XHJcbmNvbnN0IHdpbk1lc3NhZ2UgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW4tbWVzc2FnZVwiKTtcclxuY29uc3QgYnV0dG9uSGVscCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1oZWxwXCIpO1xyXG5jb25zdCBhZGRDbGFzc0JvZHkgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2R5XCIpO1xyXG5jb25zdCB0YXNrTmFtZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKTtcclxuY29uc3QgaHRtbENvbnRlbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odG1sLWNvbnRlbnRcIik7XHJcbmNvbnN0IGN1cnJlbnRMZXZlbEVsID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1sZXZlbFwiKTtcclxuXHJcbmNvbnN0IGFuc3dlclRhc2sgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LWFuc3dlclwiKTtcclxuY29uc3QgYnV0dG9uRW50ZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZW50ZXJcIik7XHJcbmNvbnN0IGFsbFRhYmxlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtd3JhcHBlclwiKTtcclxuY29uc3QgaW1nVGFibGUgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctdGFibGVcIik7XHJcbmNvbnN0IGNoZWtNYXJrVGFzayA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrLW1hcmtcIik7XHJcblxyXG5jdXJyZW50TGV2ZWwgPSArSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIpIHx8IFwiMFwiKTtcclxubGV2ZWxzID1cclxuICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWxsTGV2ZWxzXCIpIHx8IFwibnVsbFwiKSB8fCBsZXZlbHNGcm9tSnNvbjtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk6IHZvaWQge1xyXG4gIGNoZWtNYXJrVGFzaz8uY2xhc3NMaXN0LnJlbW92ZShcImRvbmVcIik7XHJcbiAgaWYgKGxldmVsc1tjdXJyZW50TGV2ZWxdLmlzTGV2ZWxEb25lKSB7XHJcbiAgICBjaGVrTWFya1Rhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gIH1cclxufVxyXG5sb2FkUGFnZSgpO1xyXG5cclxuZnVuY3Rpb24gYWRkQ2xhc3NUb0JvZHlOZXh0KCk6IHZvaWQge1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWwgKyAxXS5tYWluQ2xhc3MpO1xyXG59XHJcbmZ1bmN0aW9uIGFkZENsYXNzVG9Cb2R5UHJldigpOiB2b2lkIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsIC0gMV0ubWFpbkNsYXNzKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpOiB2b2lkIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LnJlbW92ZShsZXZlbHNbY3VycmVudExldmVsIC0gMV0ubWFpbkNsYXNzKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVDbGFzc0Zyb21Cb2R5UHJldigpOiB2b2lkIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LnJlbW92ZShsZXZlbHNbY3VycmVudExldmVsICsgMV0ubWFpbkNsYXNzKTtcclxufVxyXG5cclxubGV2ZWxzT2ZNZW51LmZvckVhY2goKGVsZW06IEVsZW1lbnQpID0+IHtcclxuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LnJlbW92ZShsZXZlbHNbY3VycmVudExldmVsXS5tYWluQ2xhc3MpO1xyXG4gICAgY3VycmVudExldmVsID0gbGV2ZWxzLmZpbmRJbmRleChcclxuICAgICAgKGxldjogTGV2ZWwsIGk6IG51bWJlcikgPT4gZWxlbS5jbGFzc05hbWUgPT09IGxldi5sZXZlbEluTWVudVxyXG4gICAgKTtcclxuICAgIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWxdLm1haW5DbGFzcyk7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgY2hhbmdlVGV4dFJpZ2h0U2VjdCgpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmJ0blJlc3NldFByb2dyZXNzPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICBsZXZlbHMuZm9yRWFjaCgob2JqOiBMZXZlbCkgPT4ge1xyXG4gICAgb2JqLmlzTGV2ZWxEb25lID0gZmFsc2U7XHJcbiAgICBvYmouaXNMZXZlbERvbmVXaXRoSGVscCA9IGZhbHNlO1xyXG4gIH0pO1xyXG4gIG1hcmtMZXZlbHNPZk1lbnUuZm9yRWFjaCgoZWxlbTogRWxlbWVudCkgPT4ge1xyXG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZG9uZVwiKTtcclxuICB9KTtcclxuICBsZXZlbHNEZXNjcmlwdGlvbnMuZm9yRWFjaCgob2JqOiBMZXZlbERlc2NyaXB0aW9uLCBpOiBudW1iZXIpID0+IHtcclxuICAgIGxldCBzeW1ib2xIZWxwID0gPEhUTUxFbGVtZW50PihcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7bGV2ZWxzRGVzY3JpcHRpb25zW2ldLmNsYXNzSGVscH1gKVxyXG4gICAgKTtcclxuICAgIHN5bWJvbEhlbHAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuXHJcbiAgd2luTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBoaWdobGlnaHRIdG1sSW1nKHBpY3R1cmU6IEhUTUxFbGVtZW50LCB0ZXh0SFRNTDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zdCBwb3B1cCA9IHBpY3R1cmUucXVlcnlTZWxlY3RvcihcIi5wb3B1cFwiKTtcclxuICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgcGljdHVyZS5jbGFzc0xpc3QuYWRkKFwic2hhZG93XCIpO1xyXG4gICAgdGV4dEhUTUwuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodDFcIik7XHJcbiAgICBwb3B1cD8uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWRvd1wiKTtcclxuICAgIHRleHRIVE1MLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHQxXCIpO1xyXG4gICAgcG9wdXA/LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcblxyXG4gIHRleHRIVE1MLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LmFkZChcInNoYWRvd1wiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIHRleHRIVE1MLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRleHRIVE1MLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHQxXCIpO1xyXG4gICAgcGljdHVyZS5jbGFzc0xpc3QucmVtb3ZlKFwic2hhZG93XCIpO1xyXG4gICAgcG9wdXA/LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxldmVsUGljdHVyZXMoKTogSFRNTEVsZW1lbnRbXSAge1xyXG4gIGxldCBhcnJheVBpY3R1cmVzOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgaW1nVGFibGU/LnJlcGxhY2VDaGlsZHJlbigpO1xyXG4gIGxldmVsc1tjdXJyZW50TGV2ZWxdLmltYWdlcy5mb3JFYWNoKChwaWN0dXJlT2JqOiBJbWFnZSkgPT4ge1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGNyZWF0ZVBpY3R1cmUocGljdHVyZU9iaik7XHJcbiAgICBhcnJheVBpY3R1cmVzLnB1c2gocGljdHVyZSk7XHJcbiAgICBpZiAocGljdHVyZU9iai5uZXN0ZWRJbWcpIHtcclxuICAgICAgY29uc3QgbmVzdGVkID0gY3JlYXRlUGljdHVyZShwaWN0dXJlT2JqLm5lc3RlZEltZywgdHJ1ZSk7XHJcbiAgICAgIHBpY3R1cmUuYXBwZW5kQ2hpbGQobmVzdGVkKTtcclxuICAgICAgYXJyYXlQaWN0dXJlcy5wdXNoKG5lc3RlZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFycmF5UGljdHVyZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBpY3R1cmUob2JqOiBJbWFnZSwgbmVzdGVkID0gZmFsc2UpOiBIVE1MRWxlbWVudCB7XHJcbiAgbGV0IGltZ1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBpZiAoIW5lc3RlZCkge1xyXG4gICAgaW1nVGFibGU/LmFwcGVuZENoaWxkKGltZ1dyYXBwZXIpO1xyXG4gICAgaW1nV3JhcHBlci5jbGFzc05hbWUgPSBcInBvc2l0aW9uLXJlbGF0aXZlXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIGltZ1dyYXBwZXIuY2xhc3NOYW1lID0gXCJwb3NpdGlvbi1hYnNvbHV0ZVwiO1xyXG4gIH1cclxuICBsZXQgcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgcGljdHVyZS5jbGFzc05hbWUgPSBvYmouY2xhc3M7XHJcbiAgcGljdHVyZS5zcmMgPSBvYmouc3JjO1xyXG4gIGltZ1dyYXBwZXI/LmFwcGVuZENoaWxkKHBpY3R1cmUpO1xyXG4gIGxldCBwb3BVcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcG9wVXAuY2xhc3NOYW1lID0gXCJwb3B1cFwiO1xyXG4gIHBvcFVwLmlubmVySFRNTCA9IG9iai50b29sdGlwO1xyXG4gIGltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xyXG4gIHJldHVybiBpbWdXcmFwcGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIdG1sQmxvY2tzKCk6IEhUTUxFbGVtZW50W10ge1xyXG4gIGNvbnN0IGFyckVsZW06IEhUTUxFbGVtZW50W10gPSBbXTtcclxuICBodG1sQ29udGVudD8ucmVwbGFjZUNoaWxkcmVuKCk7XHJcbiAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaHRtbF9jb2RlLmZvckVhY2goKHRhZ09iajogSHRtbENvZGUsIGk6bnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBkaXZIdG1sRWxlbWVudCA9IGNyZWF0ZUh0bWxCbG9jayh0YWdPYmopO1xyXG4gICAgYXJyRWxlbS5wdXNoKGRpdkh0bWxFbGVtZW50KTtcclxuICAgIGlmICh0YWdPYmouaHRtbF9uZXN0ZWQpIHtcclxuICAgICAgY29uc3QgaHRtbE5lc3RlZCA9IGNyZWF0ZUh0bWxCbG9jayh0YWdPYmouaHRtbF9uZXN0ZWQsIHRydWUpO1xyXG4gICAgICBkaXZIdG1sRWxlbWVudC5hcHBlbmRDaGlsZChodG1sTmVzdGVkKTtcclxuICAgICAgYXJyRWxlbS5wdXNoKGh0bWxOZXN0ZWQpO1xyXG4gICAgICBsZXQgY2xvc2VkVGFnID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXHJcbiAgICAgICAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaHRtbF9jb2RlW2ldLmh0bWxfY2xvc2VcclxuICAgICAgKTtcclxuICAgICAgZGl2SHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VkVGFnKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gYXJyRWxlbTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSHRtbEJsb2NrKG9iajogSHRtbENvZGUsIGh0bWxfbmVzdGVkID0gZmFsc2UpOiBIVE1MRWxlbWVudCB7XHJcbiAgbGV0IHN0ckh0bWxDb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBzdHJIdG1sQ29kZS5jbGFzc05hbWUgPSBcInN0ci1odG1sLWNvZGVcIjtcclxuICBzdHJIdG1sQ29kZS5pbm5lckhUTUwgPSBvYmouaHRtbDtcclxuICBpZiAoIWh0bWxfbmVzdGVkKSB7XHJcbiAgICBodG1sQ29udGVudC5hcHBlbmRDaGlsZChzdHJIdG1sQ29kZSk7XHJcbiAgfVxyXG4gIHJldHVybiBzdHJIdG1sQ29kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGV2ZWxFbGVtZW50cygpOiB2b2lkIHtcclxuICBsZXQgcGljdHVyZXNFbEFyciA9IGNyZWF0ZUxldmVsUGljdHVyZXMoKTtcclxuICBsZXQgaHRtbEVsQXJyID0gY3JlYXRlSHRtbEJsb2NrcygpO1xyXG4gIHBpY3R1cmVzRWxBcnIuZm9yRWFjaCgocGljdEVsOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaGlnaGxpZ2h0SHRtbEltZyhwaWN0RWwsIGh0bWxFbEFycltpbmRleF0pO1xyXG4gIH0pO1xyXG4gIHRhc2tOYW1lLmlubmVySFRNTCA9IGxldmVsc1tjdXJyZW50TGV2ZWxdLnRhc2tOYW1lO1xyXG4gIGN1cnJlbnRMZXZlbEVsLmlubmVySFRNTCA9IGxldmVsc1tjdXJyZW50TGV2ZWxdLmN1ckxldmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmbHlJbWcoKTogdm9pZCB7XHJcbiAgY29uc3QgYWxsUGljdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9zaXRpb24tcmVsYXRpdmVcIik7XHJcbiAgYWxsUGljdC5mb3JFYWNoKChpbWdPZlRhYmxlOiBFbGVtZW50KSA9PiB7XHJcbiAgICBpbWdPZlRhYmxlLmNsYXNzTGlzdC5hZGQoXCJmbHktaW1nXCIpO1xyXG4gIH0pO1xyXG4gfVxyXG5cclxucmlnaHRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBhZGRDbGFzc1RvQm9keU5leHQoKTtcclxuICAgIGN1cnJlbnRMZXZlbCArPSAxO1xyXG4gICAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICAgIGNyZWF0ZUxldmVsRWxlbWVudHMoKTtcclxuICAgIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxuICAgIHJlbW92ZUNsYXNzRnJvbUJvZHlOZXh0KCk7XHJcbiAgICBkZWxBbnN3ZXIoKTtcclxuICB9XHJcbn0pO1xyXG5cclxubGVmdEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICBpZiAoY3VycmVudExldmVsICE9PSAwKSB7XHJcbiAgICBhZGRDbGFzc1RvQm9keVByZXYoKTtcclxuICAgIGN1cnJlbnRMZXZlbCAtPSAxO1xyXG4gICAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICAgIGNyZWF0ZUxldmVsRWxlbWVudHMoKTtcclxuICAgIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxuICAgIHJlbW92ZUNsYXNzRnJvbUJvZHlQcmV2KCk7XHJcbiAgICBkZWxBbnN3ZXIoKTtcclxuICB9XHJcbn0pO1xyXG5mdW5jdGlvbiBsb2FkUGFnZSgpOiB2b2lkIHtcclxuICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWxdLm1haW5DbGFzcyk7XHJcbiAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxuICBsZXZlbHMuZm9yRWFjaCgob2JqOiBMZXZlbCwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAob2JqLmlzTGV2ZWxEb25lKSB7XHJcbiAgICAgIGxldCBzeW1ib2xIZWxwID0gPEhUTUxFbGVtZW50PihcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtsZXZlbHNEZXNjcmlwdGlvbnNbaV0uY2xhc3NIZWxwfWApXHJcbiAgICAgICk7XHJcbiAgICAgIHN5bWJvbEhlbHAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIGlmIChvYmouaXNMZXZlbERvbmVXaXRoSGVscCkge1xyXG4gICAgICBsZXQgbWFya1NpZGVCb3hUYXNrID0gPEhUTUxFbGVtZW50PihcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsZXZlbHNbaV0uY2hlY2tNYXJrU2lkZUlkKVxyXG4gICAgICApO1xyXG4gICAgICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpOiB2b2lkIHtcclxuICBpZiAobGV2ZWxzLmV2ZXJ5KCh2YWw6IExldmVsKSA9PiB2YWwuaXNMZXZlbERvbmUpKSB7XHJcbiAgICB3aW5NZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbXBsZW1lbnRFbnRlclByZXNzTGFzdExldmVsKCk6IHZvaWQge1xyXG4gIGZseUltZygpO1xyXG4gIGxldCBtYXJrU2lkZUJveFRhc2sgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2N1cnJlbnRMZXZlbF0uY2hlY2tNYXJrU2lkZUlkKVxyXG4gICk7XHJcbiAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYW5zd2VyXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcclxuICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gIGxldmVsc1tjdXJyZW50TGV2ZWxdLmlzTGV2ZWxEb25lID0gdHJ1ZTtcclxuICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxufVxyXG5mdW5jdGlvbiBpbXBsZW1lbnRFbnRlclByZXNzKCk6IHZvaWQge1xyXG4gIGlmIChsZXZlbHNbY3VycmVudExldmVsXS5hbnN3ZXJzLmluY2x1ZGVzKGFuc3dlclRhc2sudmFsdWUpKSB7XHJcbiAgICBmbHlJbWcoKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBsZXQgbWFya1NpZGVCb3hUYXNrID0gPEhUTUxFbGVtZW50PihcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsZXZlbHNbY3VycmVudExldmVsXS5jaGVja01hcmtTaWRlSWQpXHJcbiAgICAgICk7XHJcbiAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0LWFuc3dlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIG1hcmtTaWRlQm94VGFzaz8uY2xhc3NMaXN0LmFkZChcImRvbmVcIik7XHJcbiAgICAgIGFkZENsYXNzVG9Cb2R5TmV4dCgpO1xyXG4gICAgICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSA9IHRydWU7XHJcbiAgICAgIGN1cnJlbnRMZXZlbCArPSAxO1xyXG4gICAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICAgIHJlbW92ZUNsYXNzRnJvbUJvZHlOZXh0KCk7XHJcbiAgICAgIGNoYW5nZVRleHRSaWdodFNlY3QoKTtcclxuICAgICAgZGVsQW5zd2VyKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsbFRhYmxlLmNsYXNzTGlzdC5hZGQoXCJzaGFrZVwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBhbGxUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwic2hha2VcIik7XHJcbiAgICB9LCAxMjAwKTtcclxuICB9XHJcbn1cclxuYnV0dG9uRW50ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICBpZiAoY3VycmVudExldmVsIDwgMTApIHtcclxuICAgIGltcGxlbWVudEVudGVyUHJlc3MoKTtcclxuICAgIHNob3dNZXNzYWdlSWZBbGxMZXZlbHNEb25lKCk7XHJcbiAgfVxyXG4gIGlmIChjdXJyZW50TGV2ZWwgPT09IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzTGFzdExldmVsKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiICYmIGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgICBzaG93TWVzc2FnZUlmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICBldmVudC5jb2RlID09PSBcIkVudGVyXCIgJiZcclxuICAgIGN1cnJlbnRMZXZlbCA9PT0gMTApIHtcclxuICAgIGltcGxlbWVudEVudGVyUHJlc3NMYXN0TGV2ZWwoKTtcclxuICAgIHNob3dNZXNzYWdlSWZBbGxMZXZlbHNEb25lKCk7XHJcbiAgfVxyXG59KTtcclxuZnVuY3Rpb24gc2F2ZUxvY2FsU3RvcmFnZSgpOiB2b2lkIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIsIFN0cmluZyhjdXJyZW50TGV2ZWwpKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFsbExldmVsc1wiLCBKU09OLnN0cmluZ2lmeShsZXZlbHMpKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIHNhdmVMb2NhbFN0b3JhZ2UoKTtcclxufSk7XHJcblxyXG5idXR0b25IZWxwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc05hbWUgPSBcImZseS1hbnN3ZXJcIjtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gbGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2Vyc1swXTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZVdpdGhIZWxwID0gdHJ1ZTtcclxuICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5jbGFzc0hlbHB9YClcclxuICApO1xyXG4gIHN5bWJvbEhlbHAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBkZWxBbnN3ZXIoKTogdm9pZCB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwiZmx5LWFuc3dlclwiKTtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gXCJcIjtcclxufVxyXG4iLCJpbXBvcnQgbGV2ZWxzRGVzY3JpcHRpb25zIGZyb20gJy4vbGV2ZWxzRGVzY3JpcHRpb25zLmpzb24nO1xyXG5pbXBvcnQge2N1cnJlbnRMZXZlbH0gZnJvbSAnLi9pbmRleCdcclxuXHJcbmxldCB0b3BpY1Rhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3BpYy10YXNrXCIpO1xyXG5sZXQgdGFza05hbWVUZXh0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza1wiKTtcclxubGV0IHN5bWJvbFRhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zeW1ib2wtdGFza1wiKTtcclxubGV0IGRlc2NyaXB0aW9uVGFzayA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uLXRhc2tcIik7XHJcbmxldCBleGFtcGxlV29yZCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtd29yZFwiKTtcclxubGV0IGV4YW1wbGVGaXJzdCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtZmlyc3RcIik7XHJcbmxldCBleGFtcGxlU2Vjb25kID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhhbXBsZS1zZWNvbmRcIik7XHJcbmxldCBwcm9ncmVzcyA9IDxIVE1MUHJvZ3Jlc3NFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVGV4dFJpZ2h0U2VjdCgpOiB2b2lkIHtcclxuICAgIHRvcGljVGFzay5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS50b3BpY190YXNrO1xyXG4gICAgdGFza05hbWVUZXh0LmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnRhc2s7XHJcbiAgICBzeW1ib2xUYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnN5bWJvbF90YXNrO1xyXG4gICAgZGVzY3JpcHRpb25UYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmRlc2NyaXB0aW9uX3Rhc2s7XHJcbiAgICBleGFtcGxlV29yZC5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5leGFtcGxlX3dvcmQ7XHJcbiAgICBleGFtcGxlRmlyc3QuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV9maXJzdDtcclxuICAgIGV4YW1wbGVTZWNvbmQuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV9zZWNvbmQ7XHJcbiAgICBwcm9ncmVzcy52YWx1ZSA9IDEwICogKGN1cnJlbnRMZXZlbCArIDEpO1xyXG4gIH0iLCJsZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFyay1tYWluXCIpO1xyXG5sZXQgc2lkZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZS1ib3hcIik7XHJcbmV4cG9ydCBsZXQgbGV2ZWxzT2ZNZW51ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stb2YtbWVudVwiKSlcclxuZXhwb3J0IGxldCBidG5SZXNzZXRQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXJlc2V0LXByb2dyZXNzXCIpO1xyXG5leHBvcnQgbGV0IG1hcmtMZXZlbHNPZk1lbnUgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hlY2stbWFya1wiKSlcclxuXHJcblxyXG5tZW51QnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIG1lbnVCdXR0b24/LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICBzaWRlQm94Py5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG5cclxuXHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9