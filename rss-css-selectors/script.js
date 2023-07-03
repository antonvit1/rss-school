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
let rightBtn = document.querySelector(".right-button");
let leftBtn = document.querySelector(".left-button");
let winMessage = document.querySelector(".win-message");
let buttonHelp = document.querySelector(".button-help");
let addClassBody = document.querySelector(".body");
let taskName = document.querySelector(".task-name");
let htmlContent = document.querySelector(".html-content");
let currentLevelEl = document.querySelector(".current-level");
let answerTask = document.querySelector("#input-answer");
let buttonEnter = document.querySelector(".img-enter");
let allTable = document.querySelector(".table-wrapper");
let imgTable = document.querySelector(".img-table");
let chekMarkTask = document.querySelector(".check-mark");
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
    let allpict = document.querySelectorAll(".position-relative");
    allpict.forEach((imgOfTable) => {
        imgOfTable.classList.add("fly-img");
    });
    return allpict;
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
function checkIfAllLevelsDone() {
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
        checkIfAllLevelsDone();
    }
    if (currentLevel === 10 &&
        levels[currentLevel].answers.includes(answerTask.value)) {
        implementEnterPressLastLevel();
        checkIfAllLevelsDone();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && currentLevel < 10) {
        implementEnterPress();
        checkIfAllLevelsDone();
    }
    if (event.code === "Enter" &&
        currentLevel === 10 &&
        levels[currentLevel].answers.includes(answerTask.value)) {
        implementEnterPressLastLevel();
        checkIfAllLevelsDone();
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

module.exports = JSON.parse('[{"mainClass":"task1","taskName":"Select the strawberry","images":[{"src":"assets/strawberry.svg","class":"strawberry1","tooltip":"&lt;strawberry/&gt;"},{"src":"assets/strawberry.svg","class":"strawberry2","tooltip":"&lt;strawberry/&gt;"}],"html_code":[{"html":"&lt;strawberry/&gt;"},{"html":"&lt;strawberry/&gt;"}],"curLevel":"1","answers":["strawberry"],"checkMarkSideId":"mark-one","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-1"},{"mainClass":"task2","taskName":"Select the mushroom","images":[{"src":"assets/mushroom.svg","class":"mushroom1","tooltip":"&lt;mushroom/&gt;"},{"src":"assets/plate.svg","class":"plate","tooltip":"&lt;plate/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom2","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;mushroom/&gt;"},{"html":"&lt;plate/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"2","answers":["mushroom"],"checkMarkSideId":"mark-two","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-2"},{"mainClass":"task3","taskName":"Select the 3rd beetle","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom id=\\"fly-agaric\\"/&gt;"},{"src":"assets/plate.svg","class":"plate","tooltip":"&lt;plate/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;mushroom id=\\"fly-agaric\\"/&gt;"},{"html":"&lt;plate/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"3","answers":["#fly-agaric"],"checkMarkSideId":"mark-three","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-3"},{"mainClass":"task4","taskName":"Select 3rd beetle","images":[{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle/&gt;<br>"},{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle/&gt;<br>"},{"src":"assets/beetle.svg","class":"beetle3","tooltip":"&lt;beetle/&gt;<br>"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;beetle/&gt;"},{"html":"&lt;beetle/&gt;"},{"html":"&lt;beetle/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"4","answers":["beetle:nth-child(3)"],"checkMarkSideId":"mark-four","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-4"},{"mainClass":"task5","taskName":"Select worms eats a mushroom","images":[{"src":"assets/worms.svg","class":"worm-big","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}}],"html_code":[{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}}],"curLevel":"5","answers":["worm.eating","mushroom worm"],"checkMarkSideId":"mark-five","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-5"},{"mainClass":"task6","taskName":"Select the all worms eating a mashroom","images":[{"src":"assets/worms.svg","class":"berry","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating/&gt;"}},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom id=\\"fly-agaric\\"/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating/&gt;"}},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating/&gt;"}}],"html_code":[{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;mushroom id=\\"fly-agaric\\"/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}}],"curLevel":"6","answers":["mushroom *",".eating"],"checkMarkSideId":"mark-six","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-6"},{"mainClass":"task7","taskName":"Select all worm in the mushroom","images":[{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"small-worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}},{"src":"assets/worms.svg","class":"big-worm","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"small-worm","tooltip":"&lt;worm class=\\"eating\\"/&gt;"}}],"html_code":[{"html":"&lt;worm class=\\"eating\\"/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}},{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"eating\\"/&gt;"}}],"curLevel":"7","answers":["mushroom worm.eating"],"checkMarkSideId":"mark-seven","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-7"},{"mainClass":"task8","taskName":"Select all the strawberrys and mushrooms","images":[{"src":"assets/beetle.svg","class":"large-beetle","tooltip":"&lt;large-beetle/&gt;"},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/beetle.svg","class":"small-beetle-on-table","tooltip":"&lt;small-beetle/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}}],"html_code":[{"html":"&lt;large-beetle/&gt;"},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;small-beetle/&gt;"}},{"html":"&lt;small-beetle/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;small-beetle/&gt;"}},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;small-beetle/&gt;"}}],"curLevel":"8","answers":["strawberry, mushroom, strawberry"],"checkMarkSideId":"mark-eight","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-8"},{"mainClass":"task9","taskName":"Select everything on the table","images":[{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;"},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom class=\\"fly-agaric\\"/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}},{"src":"assets/beetle.svg","class":"small-beetle-on-table","tooltip":"&lt;small-beetle/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/strawberry.svg","class":"strawberry","tooltip":"&lt;strawberry/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}}],"html_code":[{"html":"&lt;strawberry/&gt;"},{"html":"&lt;mushroom class=\\"fly-agaric\\"/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm class=\\"small\\"/&gt;"}},{"html":"&lt;small-beetle/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;small-beetle/&gt;"}},{"html":"&lt;strawberry/&gt;","html_close":"</strawberry>","html_nested":{"html":"&lt;worm class=\\"small\\"/&gt;"}}],"curLevel":"9","answers":["*","strawberry, mushroom, small-beetle, worm"],"checkMarkSideId":"mark-nine","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-9"},{"mainClass":"task10","taskName":"Select the worm and the beetle eats a mushroom","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom class=\\"fly-agaric\\"/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;beetle id=\\"small\\"/&gt;"}},{"src":"assets/beetle.svg","class":"beetle","tooltip":"&lt;beetle/&gt;"},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}}],"html_code":[{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle id=\\"small\\"/&gt;"}},{"html":"&lt;beetle/&gt;"},{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;worm/&gt"}}],"curLevel":"10","answers":["mushroom *","mushroom beetle, mushroom worm","#small, worm","mushroom beetle, worm"],"checkMarkSideId":"mark-ten","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-10"},{"mainClass":"task11","taskName":"Select the beetles beside the mushroom","images":[{"src":"assets/beetle.svg","class":"small-beetle-table","tooltip":"&lt;beetle class=\\"small\\"/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/beetle.svg","class":"beetle-r","tooltip":"&lt;beetle/&gt;"},{"src":"assets/beetle.svg","class":"beetle-table-r","tooltip":"&lt;beetle class=\\"small\\"/&gt;"},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;","nestedImg":{"src":"assets/beetle.svg","class":"small-beetle","tooltip":"&lt;small-beetle/&gt;"}},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;beetle class=\\"small\\"/&gt;"},{"html":"&lt;mushroom/&gt;","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle class=\\"small\\"/&gt;"}},{"html":"&lt;beetle/&gt;"},{"html":"&lt;beetle class=\\"small\\"/&gt;"},{"html":"&lt;fly-agaric/&gt","html_close":"</mushroom>","html_nested":{"html":"&lt;beetle class=\\"small\\"/&gt;"}},{"html":"&lt;mushroom/&gt;"}],"curLevel":"11","answers":["mushroom ~ beetle, beetle ~ .small","mushroom ~ beetle, beetle ~ beetle"],"checkMarkSideId":"mark-eleven","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-11"}]');

/***/ }),

/***/ "./src/levelsDescriptions.json":
/*!*************************************!*\
  !*** ./src/levelsDescriptions.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"classHelp":"help1","topic_task":"Type Selector","task":"Select elements by their type","symbol_task":"A","description_task":"Selects all elements of type <mark><strong>A</strong></mark>. Type refers to the type of tag, so <mark>&lt;div&gt;</mark>,<mark>&lt;p&gt;</mark> and <mark>&lt;ul&gt;</mark> are all different element types.","example_word":"Examples","example_first":"<mark>div</mark> selects all <mark>&lt;div&gt;</mark> elements.","example_second":"<mark>p</mark> selects all <mark>&lt;p&gt;</mark> elements."},{"classHelp":"help2","topic_task":"Type Selector","task":"Select elements by their type","symbol_task":"A","description_task":"Selects all elements of type <mark><strong>A</strong></mark>. Type refers to the type of tag, so <mark>&lt;div&gt;</mark>,<mark>&lt;p&gt;</mark> and <mark>&lt;ul&gt;</mark> are all different element types.","example_word":"Examples","example_first":"<mark>div</mark> selects all <mark>&lt;div&gt;</mark> elements.","example_second":"<mark>p</mark> selects all <mark>&lt;p&gt;</mark> elements."},{"classHelp":"help3","topic_task":"ID Selector","task":"Select elements with an ID","symbol_task":"<mark>#id</mark>","description_task":"Selects all element with a specific <mark><strong>id</strong></mark>. You can also combine the ID selector with the type selector.","example_word":"Examples","example_first":"<mark>#cool</mark> selects any element with <mark>id=\\"cool\\"</mark> elements.","example_second":"<mark>ul#long</mark> selects <mark>&lt;ul id=\\"long\\"&gt;</mark> elements."},{"classHelp":"help4","topic_task":"Nth Child ","task":"Select an element by its order in another element","symbol_task":"<mark>:nth-child()</mark>","description_task":"Selects <mark>nth</mark> () child element in another element.","example_word":"Examples","example_first":"<mark>:nth-child(6)</mark>selects every element that is the 8th child of another element.","example_second":"<mark>div p:nth-child(5)</mark> selects the second p in every <mark>div</mark>"},{"classHelp":"help5","topic_task":"Combine the Class Selector","task":"","symbol_task":"<mark>A.className</mark>","description_task":"You can combine the class selector with other selectors, like the type selector.","example_word":"Examples","example_first":"<mark>ul.important</mark> selects all <mark>ul</mark> elements that have <mark>class=\\"important\\"</mark>","example_second":"<mark>#big.wide</mark> selects all elements with <mark>id=\\"big\\"</mark> that also have <mark>class=\\"wide\\"</mark>"},{"classHelp":"help6","topic_task":"Combine the Universal Selector","task":"Select the all worms eating a mashroom","symbol_task":"<mark>A *</mark>","description_task":"This selects all elements inside of <mark>A</mark>","example_word":"Examples","example_first":"<mark>p *</mark> selects every element inside all <mark>&lt;p&gt;</mark> elements.","example_second":"<mark>ul.fancy *</mark> selects every element inside all <mark>&lt;ul class=\\"eating\\"&gt;</mark>"},{"classHelp":"help7","topic_task":"Combine the Class Selector","task":"","symbol_task":"<mark>A B.className</mark>","description_task":"You can combine the class selector with other selectors, like the type selector.","example_word":"Examples","example_first":"<mark>p *</mark> selects every element inside all <mark>&lt;p&gt;</mark> elements.","example_second":"<mark>ul.fancy *</mark> selects every element inside all <mark>&lt;ul class=\\"eating\\"&gt;</mark>"},{"classHelp":"help8","topic_task":"Comma Combinator","task":"Combine, selectors, with... commas!","symbol_task":"<mark>A, B</mark>","description_task":"Thanks to Shatner technology, this selects all <mark>A</mark> and <mark>B</mark> elements. You can combine any selectors this way, and you can specify more than two.","example_word":"Examples","example_first":"<mark>p .good</mark> selects all <mark>&lt;p&gt;</mark> elements as well as all elements with <mark>class=\\"good\\"</mark>.","example_second":"<mark>a, p, div</mark> selects all <mark>&lt;a&gt;</mark>, <mark>&lt;p&gt;</mark> and <mark>&lt;div&gt;</mark> elements"},{"classHelp":"help9","topic_task":"The Universal Selector","task":"You can select everything!","symbol_task":"<mark>*</mark>","description_task":"You can select all elements with the universal selector!","example_word":"Examples","example_first":"<mark>p *</mark> selects any element inside all <mark>&lt;p&gt;</mark> elements","example_second":""},{"classHelp":"help10","topic_task":"Descendant Selector","task":"Select an element inside another element","symbol_task":"A B","description_task":"Selects all <mark><strong>B</strong></mark> inside of <mark><strong>A</strong></mark>. <mark><strong>B</strong></mark> is called a descendant because it is inside of another element.","example_word":"Examples","example_first":"<mark>p strong</mark> selects all <mark>&lt;strong&gt;</mark> elements that are inside of any <mark>&lt;p&gt;</mark>.","example_second":"<mark>#fancy span</mark> selects any span elements that are inside of the element with <mark>id=\\"fancy\\"</mark>"},{"classHelp":"help11","topic_task":"General Sibling Selector","task":"Select elements that follows another element","symbol_task":"<mark>A B</mark>","description_task":"You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.","example_word":"Examples","example_first":"<mark>A ~ B</mark> selects all <mark>&lt;B&gt;</mark> that follow a <mark>&lt;A&gt;</mark>.","example_second":""}]');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO0FBQ3RFLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHbEYsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtJQUNwQyxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDYkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9sZXZlbHNEZXNjcmlwdGlvbi50cyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy8uL3NyYy9sZXZlbHNNZW51LnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBsZXZlbHNGcm9tSnNvbiBmcm9tIFwiLi9hbGxMZXZlbHMuanNvblwiO1xyXG5pbXBvcnQgbGV2ZWxzRGVzY3JpcHRpb25zIGZyb20gXCIuL2xldmVsc0Rlc2NyaXB0aW9ucy5qc29uXCI7XHJcbmltcG9ydCB7IGNoYW5nZVRleHRSaWdodFNlY3QgfSBmcm9tIFwiLi9sZXZlbHNEZXNjcmlwdGlvblwiO1xyXG5pbXBvcnQgeyBsZXZlbHNPZk1lbnUgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IGJ0blJlc3NldFByb2dyZXNzIH0gZnJvbSBcIi4vbGV2ZWxzTWVudVwiO1xyXG5pbXBvcnQgeyBtYXJrTGV2ZWxzT2ZNZW51IH0gZnJvbSBcIi4vbGV2ZWxzTWVudVwiO1xyXG5pbXBvcnQgeyBIdG1sQ29kZSwgSW1hZ2UsIExldmVsIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBsZXQgY3VycmVudExldmVsOiBudW1iZXIgPSAwO1xyXG5sZXQgbGV2ZWxzOiBMZXZlbFtdID0gW107XHJcblxyXG5sZXQgcmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0LWJ1dHRvblwiKTtcclxubGV0IGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnQtYnV0dG9uXCIpO1xyXG5sZXQgd2luTWVzc2FnZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbi1tZXNzYWdlXCIpO1xyXG5sZXQgYnV0dG9uSGVscCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1oZWxwXCIpO1xyXG5sZXQgYWRkQ2xhc3NCb2R5ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9keVwiKTtcclxubGV0IHRhc2tOYW1lID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG5sZXQgaHRtbENvbnRlbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odG1sLWNvbnRlbnRcIik7XHJcbmxldCBjdXJyZW50TGV2ZWxFbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtbGV2ZWxcIik7XHJcblxyXG5sZXQgYW5zd2VyVGFzayA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtYW5zd2VyXCIpO1xyXG5sZXQgYnV0dG9uRW50ZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZW50ZXJcIik7XHJcbmxldCBhbGxUYWJsZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLXdyYXBwZXJcIik7XHJcbmxldCBpbWdUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLXRhYmxlXCIpO1xyXG5sZXQgY2hla01hcmtUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVjay1tYXJrXCIpO1xyXG5jdXJyZW50TGV2ZWwgPSArSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIpIHx8IFwiMFwiKTtcclxubGV2ZWxzID1cclxuICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWxsTGV2ZWxzXCIpIHx8IFwibnVsbFwiKSB8fCBsZXZlbHNGcm9tSnNvbjtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCkge1xyXG4gIGNoZWtNYXJrVGFzaz8uY2xhc3NMaXN0LnJlbW92ZShcImRvbmVcIik7XHJcbiAgaWYgKGxldmVsc1tjdXJyZW50TGV2ZWxdLmlzTGV2ZWxEb25lKSB7XHJcbiAgICBjaGVrTWFya1Rhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gIH1cclxufVxyXG5sb2FkUGFnZSgpO1xyXG5cclxuZnVuY3Rpb24gYWRkQ2xhc3NUb0JvZHlOZXh0KCkge1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWwgKyAxXS5tYWluQ2xhc3MpO1xyXG59XHJcbmZ1bmN0aW9uIGFkZENsYXNzVG9Cb2R5UHJldigpIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LmFkZChsZXZlbHNbY3VycmVudExldmVsIC0gMV0ubWFpbkNsYXNzKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LnJlbW92ZShsZXZlbHNbY3VycmVudExldmVsIC0gMV0ubWFpbkNsYXNzKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVDbGFzc0Zyb21Cb2R5UHJldigpIHtcclxuICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LnJlbW92ZShsZXZlbHNbY3VycmVudExldmVsICsgMV0ubWFpbkNsYXNzKTtcclxufVxyXG5cclxubGV2ZWxzT2ZNZW51LmZvckVhY2goKGVsZW0pID0+IHtcclxuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBhZGRDbGFzc0JvZHkuY2xhc3NMaXN0LnJlbW92ZShsZXZlbHNbY3VycmVudExldmVsXS5tYWluQ2xhc3MpO1xyXG4gICAgY3VycmVudExldmVsID0gbGV2ZWxzLmZpbmRJbmRleChcclxuICAgICAgKGxldiwgaSkgPT4gZWxlbS5jbGFzc05hbWUgPT09IGxldi5sZXZlbEluTWVudVxyXG4gICAgKTtcclxuICAgIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWxdLm1haW5DbGFzcyk7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgY2hhbmdlVGV4dFJpZ2h0U2VjdCgpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmJ0blJlc3NldFByb2dyZXNzPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGxldmVscy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgIG9iai5pc0xldmVsRG9uZSA9IGZhbHNlO1xyXG4gICAgb2JqLmlzTGV2ZWxEb25lV2l0aEhlbHAgPSBmYWxzZTtcclxuICB9KTtcclxuICBtYXJrTGV2ZWxzT2ZNZW51LmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImRvbmVcIik7XHJcbiAgfSk7XHJcbiAgbGV2ZWxzRGVzY3JpcHRpb25zLmZvckVhY2goKG9iaiwgaSkgPT4ge1xyXG4gICAgbGV0IHN5bWJvbEhlbHAgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtsZXZlbHNEZXNjcmlwdGlvbnNbaV0uY2xhc3NIZWxwfWApXHJcbiAgICApO1xyXG4gICAgc3ltYm9sSGVscC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIHdpbk1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBoaWdobGlnaHRIdG1sSW1nKHBpY3R1cmU6IEhUTUxFbGVtZW50LCB0ZXh0SFRNTDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zdCBwb3B1cCA9IHBpY3R1cmUucXVlcnlTZWxlY3RvcihcIi5wb3B1cFwiKTtcclxuICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5hZGQoXCJzaGFkb3dcIik7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIHBpY3R1cmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFkb3dcIik7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG5cclxuICB0ZXh0SFRNTC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LmFkZChcInNoYWRvd1wiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIHRleHRIVE1MLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGV4dEhUTUwuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodDFcIik7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFkb3dcIik7XHJcbiAgICBwb3B1cD8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGV2ZWxQaWN0dXJlcygpIHtcclxuICBsZXQgYXJyYXlQaWN0dXJlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gIGltZ1RhYmxlPy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pbWFnZXMuZm9yRWFjaCgocGljdHVyZU9iaikgPT4ge1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGNyZWF0ZVBpY3R1cmUocGljdHVyZU9iaik7XHJcbiAgICBhcnJheVBpY3R1cmVzLnB1c2gocGljdHVyZSk7XHJcbiAgICBpZiAocGljdHVyZU9iai5uZXN0ZWRJbWcpIHtcclxuICAgICAgY29uc3QgbmVzdGVkID0gY3JlYXRlUGljdHVyZShwaWN0dXJlT2JqLm5lc3RlZEltZywgdHJ1ZSk7XHJcbiAgICAgIHBpY3R1cmUuYXBwZW5kQ2hpbGQobmVzdGVkKTtcclxuICAgICAgYXJyYXlQaWN0dXJlcy5wdXNoKG5lc3RlZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFycmF5UGljdHVyZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBpY3R1cmUob2JqOiBJbWFnZSwgbmVzdGVkID0gZmFsc2UpIHtcclxuICBsZXQgaW1nV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGlmICghbmVzdGVkKSB7XHJcbiAgICBpbWdUYWJsZT8uYXBwZW5kQ2hpbGQoaW1nV3JhcHBlcik7XHJcbiAgICBpbWdXcmFwcGVyLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tcmVsYXRpdmVcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgaW1nV3JhcHBlci5jbGFzc05hbWUgPSBcInBvc2l0aW9uLWFic29sdXRlXCI7XHJcbiAgfVxyXG4gIGxldCBwaWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICBwaWN0dXJlLmNsYXNzTmFtZSA9IG9iai5jbGFzcztcclxuICBwaWN0dXJlLnNyYyA9IG9iai5zcmM7XHJcbiAgaW1nV3JhcHBlcj8uYXBwZW5kQ2hpbGQocGljdHVyZSk7XHJcbiAgbGV0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwb3BVcC5jbGFzc05hbWUgPSBcInBvcHVwXCI7XHJcbiAgcG9wVXAuaW5uZXJIVE1MID0gb2JqLnRvb2x0aXA7XHJcbiAgaW1nV3JhcHBlci5hcHBlbmRDaGlsZChwb3BVcCk7XHJcbiAgcmV0dXJuIGltZ1dyYXBwZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0bWxCbG9ja3MoKSB7XHJcbiAgY29uc3QgYXJyRWxlbTogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gIGh0bWxDb250ZW50Py5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5odG1sX2NvZGUuZm9yRWFjaCgodGFnT2JqLCBpKSA9PiB7XHJcbiAgICBjb25zdCBkaXZIdG1sRWxlbWVudCA9IGNyZWF0ZUh0bWxCbG9jayh0YWdPYmopO1xyXG4gICAgYXJyRWxlbS5wdXNoKGRpdkh0bWxFbGVtZW50KTtcclxuICAgIGlmICh0YWdPYmouaHRtbF9uZXN0ZWQpIHtcclxuICAgICAgY29uc3QgaHRtbE5lc3RlZCA9IGNyZWF0ZUh0bWxCbG9jayh0YWdPYmouaHRtbF9uZXN0ZWQsIHRydWUpO1xyXG4gICAgICBkaXZIdG1sRWxlbWVudC5hcHBlbmRDaGlsZChodG1sTmVzdGVkKTtcclxuICAgICAgYXJyRWxlbS5wdXNoKGh0bWxOZXN0ZWQpO1xyXG4gICAgICBsZXQgY2xvc2VkVGFnID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXHJcbiAgICAgICAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaHRtbF9jb2RlW2ldLmh0bWxfY2xvc2VcclxuICAgICAgKTtcclxuICAgICAgZGl2SHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VkVGFnKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gYXJyRWxlbTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSHRtbEJsb2NrKG9iajogSHRtbENvZGUsIGh0bWxfbmVzdGVkID0gZmFsc2UpIHtcclxuICBsZXQgc3RySHRtbENvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHN0ckh0bWxDb2RlLmNsYXNzTmFtZSA9IFwic3RyLWh0bWwtY29kZVwiO1xyXG4gIHN0ckh0bWxDb2RlLmlubmVySFRNTCA9IG9iai5odG1sO1xyXG4gIGlmICghaHRtbF9uZXN0ZWQpIHtcclxuICAgIGh0bWxDb250ZW50LmFwcGVuZENoaWxkKHN0ckh0bWxDb2RlKTtcclxuICB9XHJcbiAgcmV0dXJuIHN0ckh0bWxDb2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMZXZlbEVsZW1lbnRzKCkge1xyXG4gIGxldCBwaWN0dXJlc0VsQXJyID0gY3JlYXRlTGV2ZWxQaWN0dXJlcygpO1xyXG4gIGxldCBodG1sRWxBcnIgPSBjcmVhdGVIdG1sQmxvY2tzKCk7XHJcbiAgcGljdHVyZXNFbEFyci5mb3JFYWNoKChwaWN0RWwsIGluZGV4KSA9PiB7XHJcbiAgICBoaWdobGlnaHRIdG1sSW1nKHBpY3RFbCwgaHRtbEVsQXJyW2luZGV4XSk7XHJcbiAgfSk7XHJcbiAgdGFza05hbWUuaW5uZXJIVE1MID0gbGV2ZWxzW2N1cnJlbnRMZXZlbF0udGFza05hbWU7XHJcbiAgY3VycmVudExldmVsRWwuaW5uZXJIVE1MID0gbGV2ZWxzW2N1cnJlbnRMZXZlbF0uY3VyTGV2ZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZseUltZygpIHtcclxuICBsZXQgYWxscGljdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9zaXRpb24tcmVsYXRpdmVcIik7XHJcbiAgYWxscGljdC5mb3JFYWNoKChpbWdPZlRhYmxlKSA9PiB7XHJcbiAgICBpbWdPZlRhYmxlLmNsYXNzTGlzdC5hZGQoXCJmbHktaW1nXCIpO1xyXG4gIH0pO1xyXG4gIHJldHVybiBhbGxwaWN0O1xyXG59XHJcblxyXG5yaWdodEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICBpZiAoY3VycmVudExldmVsIDwgMTApIHtcclxuICAgIGFkZENsYXNzVG9Cb2R5TmV4dCgpO1xyXG4gICAgY3VycmVudExldmVsICs9IDE7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgY2hhbmdlVGV4dFJpZ2h0U2VjdCgpO1xyXG4gICAgcmVtb3ZlQ2xhc3NGcm9tQm9keU5leHQoKTtcclxuICAgIGRlbEFuc3dlcigpO1xyXG4gIH1cclxufSk7XHJcblxyXG5sZWZ0QnRuPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGlmIChjdXJyZW50TGV2ZWwgIT09IDApIHtcclxuICAgIGFkZENsYXNzVG9Cb2R5UHJldigpO1xyXG4gICAgY3VycmVudExldmVsIC09IDE7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgY2hhbmdlVGV4dFJpZ2h0U2VjdCgpO1xyXG4gICAgcmVtb3ZlQ2xhc3NGcm9tQm9keVByZXYoKTtcclxuICAgIGRlbEFuc3dlcigpO1xyXG4gIH1cclxufSk7XHJcbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xyXG4gIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5hZGQobGV2ZWxzW2N1cnJlbnRMZXZlbF0ubWFpbkNsYXNzKTtcclxuICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgY2hhbmdlVGV4dFJpZ2h0U2VjdCgpO1xyXG4gIGxldmVscy5mb3JFYWNoKChvYmosIGkpID0+IHtcclxuICAgIGlmIChvYmouaXNMZXZlbERvbmUpIHtcclxuICAgICAgbGV0IHN5bWJvbEhlbHAgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xldmVsc0Rlc2NyaXB0aW9uc1tpXS5jbGFzc0hlbHB9YClcclxuICAgICAgKTtcclxuICAgICAgc3ltYm9sSGVscC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5pc0xldmVsRG9uZVdpdGhIZWxwKSB7XHJcbiAgICAgIGxldCBtYXJrU2lkZUJveFRhc2sgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxldmVsc1tpXS5jaGVja01hcmtTaWRlSWQpXHJcbiAgICAgICk7XHJcbiAgICAgIG1hcmtTaWRlQm94VGFzaz8uY2xhc3NMaXN0LmFkZChcImRvbmVcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSWZBbGxMZXZlbHNEb25lKCkge1xyXG4gIGlmIChsZXZlbHMuZXZlcnkoKHZhbCkgPT4gdmFsLmlzTGV2ZWxEb25lKSkge1xyXG4gICAgd2luTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW1wbGVtZW50RW50ZXJQcmVzc0xhc3RMZXZlbCgpIHtcclxuICBmbHlJbWcoKTtcclxuICBsZXQgbWFya1NpZGVCb3hUYXNrID0gPEhUTUxFbGVtZW50PihcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxldmVsc1tjdXJyZW50TGV2ZWxdLmNoZWNrTWFya1NpZGVJZClcclxuICApO1xyXG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0LWFuc3dlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XHJcbiAgbWFya1NpZGVCb3hUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSA9IHRydWU7XHJcbiAgdXBkYXRlU3RhdGVPZk1haW5DaGVja01hcmsoKTtcclxuICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbn1cclxuZnVuY3Rpb24gaW1wbGVtZW50RW50ZXJQcmVzcygpIHtcclxuICBpZiAobGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2Vycy5pbmNsdWRlcyhhbnN3ZXJUYXNrLnZhbHVlKSkge1xyXG4gICAgZmx5SW1nKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbGV0IG1hcmtTaWRlQm94VGFzayA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2N1cnJlbnRMZXZlbF0uY2hlY2tNYXJrU2lkZUlkKVxyXG4gICAgICApO1xyXG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dC1hbnN3ZXJcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xyXG4gICAgICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgICBhZGRDbGFzc1RvQm9keU5leHQoKTtcclxuICAgICAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaXNMZXZlbERvbmUgPSB0cnVlO1xyXG4gICAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICAgIGRlbEFuc3dlcigpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgICB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGxUYWJsZS5jbGFzc0xpc3QuYWRkKFwic2hha2VcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgYWxsVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWtlXCIpO1xyXG4gICAgfSwgMTIwMCk7XHJcbiAgfVxyXG59XHJcbmJ1dHRvbkVudGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgICBjaGVja0lmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICBjdXJyZW50TGV2ZWwgPT09IDEwICYmXHJcbiAgICBsZXZlbHNbY3VycmVudExldmVsXS5hbnN3ZXJzLmluY2x1ZGVzKGFuc3dlclRhc2sudmFsdWUpXHJcbiAgKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzTGFzdExldmVsKCk7XHJcbiAgICBjaGVja0lmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiICYmIGN1cnJlbnRMZXZlbCA8IDEwKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgICBjaGVja0lmQWxsTGV2ZWxzRG9uZSgpO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICBldmVudC5jb2RlID09PSBcIkVudGVyXCIgJiZcclxuICAgIGN1cnJlbnRMZXZlbCA9PT0gMTAgJiZcclxuICAgIGxldmVsc1tjdXJyZW50TGV2ZWxdLmFuc3dlcnMuaW5jbHVkZXMoYW5zd2VyVGFzay52YWx1ZSlcclxuICApIHtcclxuICAgIGltcGxlbWVudEVudGVyUHJlc3NMYXN0TGV2ZWwoKTtcclxuICAgIGNoZWNrSWZBbGxMZXZlbHNEb25lKCk7XHJcbiAgfVxyXG59KTtcclxuZnVuY3Rpb24gc2F2ZUxvY2FsU3RvcmFnZSgpIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIsIFN0cmluZyhjdXJyZW50TGV2ZWwpKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFsbExldmVsc1wiLCBKU09OLnN0cmluZ2lmeShsZXZlbHMpKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIHNhdmVMb2NhbFN0b3JhZ2UoKTtcclxufSk7XHJcblxyXG5idXR0b25IZWxwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc05hbWUgPSBcImZseS1hbnN3ZXJcIjtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gbGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2Vyc1swXTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZVdpdGhIZWxwID0gdHJ1ZTtcclxuICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5jbGFzc0hlbHB9YClcclxuICApO1xyXG4gIHN5bWJvbEhlbHAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBkZWxBbnN3ZXIoKSB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwiZmx5LWFuc3dlclwiKTtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gXCJcIjtcclxufVxyXG4iLCJpbXBvcnQgbGV2ZWxzRGVzY3JpcHRpb25zIGZyb20gJy4vbGV2ZWxzRGVzY3JpcHRpb25zLmpzb24nO1xyXG5pbXBvcnQge2N1cnJlbnRMZXZlbH0gZnJvbSAnLi9pbmRleCdcclxuXHJcbmxldCB0b3BpY1Rhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3BpYy10YXNrXCIpO1xyXG5sZXQgdGFza05hbWVUZXh0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza1wiKTtcclxubGV0IHN5bWJvbFRhc2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zeW1ib2wtdGFza1wiKTtcclxubGV0IGRlc2NyaXB0aW9uVGFzayA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uLXRhc2tcIik7XHJcbmxldCBleGFtcGxlV29yZCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtd29yZFwiKTtcclxubGV0IGV4YW1wbGVGaXJzdCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4YW1wbGUtZmlyc3RcIik7XHJcbmxldCBleGFtcGxlU2Vjb25kID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhhbXBsZS1zZWNvbmRcIik7XHJcbmxldCBwcm9ncmVzcyA9IDxIVE1MUHJvZ3Jlc3NFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVGV4dFJpZ2h0U2VjdCgpIHtcclxuICAgIHRvcGljVGFzay5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS50b3BpY190YXNrO1xyXG4gICAgdGFza05hbWVUZXh0LmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnRhc2s7XHJcbiAgICBzeW1ib2xUYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnN5bWJvbF90YXNrO1xyXG4gICAgZGVzY3JpcHRpb25UYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmRlc2NyaXB0aW9uX3Rhc2s7XHJcbiAgICBleGFtcGxlV29yZC5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5leGFtcGxlX3dvcmQ7XHJcbiAgICBleGFtcGxlRmlyc3QuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV9maXJzdDtcclxuICAgIGV4YW1wbGVTZWNvbmQuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZXhhbXBsZV9zZWNvbmQ7XHJcbiAgICBwcm9ncmVzcy52YWx1ZSA9IDEwICogKGN1cnJlbnRMZXZlbCArIDEpO1xyXG4gIH0iLCJpbXBvcnQge2N1cnJlbnRMZXZlbH0gZnJvbSAnLi9pbmRleCdcclxuaW1wb3J0IGxldmVscyBmcm9tICcuL2FsbExldmVscy5qc29uJztcclxuXHJcbmxldCBtZW51QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXJrLW1haW5cIik7XHJcbmxldCBzaWRlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLWJveFwiKTtcclxuZXhwb3J0IGxldCBsZXZlbHNPZk1lbnUgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1vZi1tZW51XCIpKVxyXG5leHBvcnQgbGV0IGJ0blJlc3NldFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tcmVzZXQtcHJvZ3Jlc3NcIik7XHJcbmV4cG9ydCBsZXQgbWFya0xldmVsc09mTWVudSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGVjay1tYXJrXCIpKVxyXG5cclxuXHJcbm1lbnVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgbWVudUJ1dHRvbj8uY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgIHNpZGVCb3g/LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcblxyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=