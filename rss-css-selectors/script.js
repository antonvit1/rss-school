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
levels = JSON.parse(localStorage.getItem("allLevels") || "null") || _allLevels_json__WEBPACK_IMPORTED_MODULE_1__;
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
});
function highlightHtmlImg(picture, textHTML) {
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
    levels[currentLevel].html_code.forEach((tagObj) => {
        const divHtmlElement = createHtmlBlock(tagObj);
        arrElem.push(divHtmlElement);
        if (tagObj.html_nested) {
            const htmlNested = createHtmlBlock(tagObj.html_nested, true);
            divHtmlElement.appendChild(htmlNested);
            arrElem.push(htmlNested);
            let closedTag = document.createTextNode(levels[currentLevel].closedTag1);
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
    if (currentLevel <= 11) {
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
function implementEnterPress() {
    if (answerTask.value === levels[currentLevel].answer) {
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
    implementEnterPress();
});
document.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
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

module.exports = JSON.parse('[{"mainClass":"task1","taskName":"Select the plate","images":[{"src":"assets/strawberry.svg","class":"strawberry1","tooltip":"&lt;strawberry/&gt;"},{"src":"assets/strawberry.svg","class":"strawberry2","tooltip":"&lt;strawberry/&gt;"}],"html_code":[{"html":"&lt;strawberry/&gt;"},{"html":"&lt;strawberry/&gt;"}],"curLevel":"1","answer":"strawberry","checkMarkSideId":"mark-one","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-1"},{"mainClass":"task2","taskName":"Select the mushroom","images":[{"src":"assets/mushroom.svg","class":"mushroom1","tooltip":"&lt;mushroom/&gt;"},{"src":"assets/plate.svg","class":"plate","tooltip":"&lt;plate/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom2","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;mushroom/&gt;"},{"html":"&lt;plate/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"2","answer":"mushroom","checkMarkSideId":"mark-two","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-2"},{"mainClass":"task3","taskName":"Select the fancy plate","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;mushroom id=\\"fly-agaric\\"/&gt;"},{"src":"assets/plate.svg","class":"plate","tooltip":"&lt;plate/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;mushroom id=\\"fly-agaric\\"/&gt;"},{"html":"&lt;plate/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"3","answer":"#fly-agaric","checkMarkSideId":"mark-three","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-3"},{"mainClass":"task4","taskName":"Select the warm eats a mashroom","images":[{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;<br>"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"},{"src":"assets/worms.svg","class":"worm2","tooltip":"&lt;worm/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;"}],"html_code":[{"html":"&lt;worm/&gt;"},{"html":"&lt;mushroom/&gt;"},{"html":"&lt;worm class=\\"eat\\"/&gt;"},{"html":"&lt;mushroom/&gt;"}],"curLevel":"4","answer":".eat","checkMarkSideId":"mark-four","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-4"},{"mainClass":"task5","taskName":"Select the warm eats a mashroom","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}}],"html_code":[{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_nested":{"html":"&lt;worm/&gt;"}},{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_nested":{"html":"&lt;worm/&gt;"}}],"closedTag1":"</mushroom>","curLevel":"5","answer":"mushroom worm","checkMarkSideId":"mark-five","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-5"},{"mainClass":"task6","taskName":"Select the warm eats a mashroom","images":[{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;"},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}},{"src":"assets/fly-agaric.svg","class":"fly-agaric","tooltip":"&lt;fly-agaric/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}},{"src":"assets/mushroom.svg","class":"mushroom","tooltip":"&lt;mushroom/&gt;","nestedImg":{"src":"assets/worms.svg","class":"worm","tooltip":"&lt;worm/&gt;"}}],"html_code":[{"html":"&lt;fly-agaric/&gt"},{"html":"&lt;mushroom/&gt;","html_nested":{"html":"&lt;worm/&gt;"}},{"html":"&lt;fly-agaric/&gt","html_nested":{"html":"&lt;worm/&gt;"}},{"html":"&lt;mushroom/&gt;","html_nested":{"html":"&lt;worm/&gt;"}}],"closedTag1":"</mushroom>","curLevel":"6","answer":"mushroom worm","checkMarkSideId":"mark-six","isLevelDone":false,"isLevelDoneWithHelp":false,"levelInMenu":"task-of-menu level-6"}]');

/***/ }),

/***/ "./src/levelsDescriptions.json":
/*!*************************************!*\
  !*** ./src/levelsDescriptions.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"classHelp":"help1","topic_task":"Type Selector","task":"Select elements by their type","symbol_task":"A","description_task":"Selects all elements of type <mark><strong>A</strong></mark>. Type refers to the type of tag, so <mark>&lt;div&gt;</mark>,<mark>&lt;p&gt;</mark> and <mark>&lt;ul&gt;</mark> are all different element types.","example_word":"Examples","example_first":"<mark>div</mark> selects all <mark>&lt;div&gt;</mark> elements.","example_second":"<mark>p</mark> selects all <mark>&lt;p&gt;</mark> elements."},{"classHelp":"help2","topic_task":"Type Selector","task":"Select elements by their type","symbol_task":"A","description_task":"Selects all elements of type <mark><strong>A</strong></mark>. Type refers to the type of tag, so <mark>&lt;div&gt;</mark>,<mark>&lt;p&gt;</mark> and <mark>&lt;ul&gt;</mark> are all different element types.","example_word":"Examples","example_first":"<mark>div</mark> selects all <mark>&lt;div&gt;</mark> elements.","example_second":"<mark>p</mark> selects all <mark>&lt;p&gt;</mark> elements."},{"classHelp":"help3","topic_task":"ID Selector","task":"Select elements with an ID","symbol_task":"#id","description_task":"Selects all element with a specific <mark><strong>id</strong></mark>. You can also combine the ID selector with the type selector.","example_word":"Examples","example_first":"<mark>#cool</mark> selects any element with <mark>id=\\"cool\\"</mark> elements.","example_second":"<mark>ul#long</mark> selects <mark>&lt;ul id=\\"long\\"&gt;</mark> elements."},{"classHelp":"help4","topic_task":"Descendant Selector","task":"Select an element inside another element","symbol_task":"A B","description_task":"Selects all <mark><strong>B</strong></mark> inside of <mark><strong>A</strong></mark>. <mark><strong>B</strong></mark> is called a descendant because it is inside of another element.","example_word":"Examples","example_first":"<mark>p strong</mark> selects all <mark>&lt;strong&gt;</mark> elements that are inside of any <mark>&lt;p&gt;</mark>.","example_second":"<mark>#fancy span</mark> selects any span elements that are inside of the element with <mark>id=\\"fancy\\"</mark>"},{"classHelp":"help5","topic_task":"Descendant Selector","task":"Select an element inside another element","symbol_task":"A B","description_task":"Selects all <mark><strong>B</strong></mark> inside of <mark><strong>A</strong></mark>. <mark><strong>B</strong></mark> is called a descendant because it is inside of another element.","example_word":"Examples","example_first":"<mark>p strong</mark> selects all <mark>&lt;strong&gt;</mark> elements that are inside of any <mark>&lt;p&gt;</mark>.","example_second":"<mark>#fancy span</mark> selects any span elements that are inside of the element with <mark>id=\\"fancy\\"</mark>"},{"classHelp":"help6","topic_task":"Descendant Selector","task":"Select an element inside another element","symbol_task":"A B","description_task":"Selects all <mark><strong>B</strong></mark> inside of <mark><strong>A</strong></mark>. <mark><strong>B</strong></mark> is called a descendant because it is inside of another element.","example_word":"Examples","example_first":"<mark>p strong</mark> selects all <mark>&lt;strong&gt;</mark> elements that are inside of any <mark>&lt;p&gt;</mark>.","example_second":"<mark>#fancy span</mark> selects any span elements that are inside of the element with <mark>id=\\"fancy\\"</mark>"}]');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL2xldmVsc0Rlc2NyaXB0aW9uLnRzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzLy4vc3JjL2xldmVsc01lbnUudHMiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnNzLWNzcy1zZWxlY3RvcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Jzcy1jc3Mtc2VsZWN0b3JzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9yc3MtY3NzLXNlbGVjdG9ycy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuaW1wb3J0IGxldmVsc0Zyb21Kc29uIGZyb20gXCIuL2FsbExldmVscy5qc29uXCI7XHJcbmltcG9ydCBsZXZlbHNEZXNjcmlwdGlvbnMgZnJvbSBcIi4vbGV2ZWxzRGVzY3JpcHRpb25zLmpzb25cIjtcclxuaW1wb3J0IHsgY2hhbmdlVGV4dFJpZ2h0U2VjdCB9IGZyb20gXCIuL2xldmVsc0Rlc2NyaXB0aW9uXCI7XHJcbmltcG9ydCB7IGxldmVsc09mTWVudSB9IGZyb20gXCIuL2xldmVsc01lbnVcIjtcclxuaW1wb3J0IHsgYnRuUmVzc2V0UHJvZ3Jlc3MgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IG1hcmtMZXZlbHNPZk1lbnUgfSBmcm9tIFwiLi9sZXZlbHNNZW51XCI7XHJcbmltcG9ydCB7IEh0bWxDb2RlLCBJbWFnZSwgTGV2ZWwgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGxldCBjdXJyZW50TGV2ZWw6IG51bWJlciA9IDA7XHJcbmxldCBsZXZlbHM6IExldmVsW10gPSBbXTtcclxuXHJcblxyXG5cclxubGV0IHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodC1idXR0b25cIik7XHJcbmxldCBsZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZWZ0LWJ1dHRvblwiKTtcclxuXHJcbmxldCBidXR0b25IZWxwID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLWhlbHBcIik7XHJcblxyXG5sZXQgYWRkQ2xhc3NCb2R5ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9keVwiKTtcclxubGV0IHRhc2tOYW1lID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG5sZXQgaHRtbENvbnRlbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odG1sLWNvbnRlbnRcIik7XHJcbmxldCBjdXJyZW50TGV2ZWxFbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtbGV2ZWxcIik7XHJcblxyXG5sZXQgYW5zd2VyVGFzayA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtYW5zd2VyXCIpO1xyXG5sZXQgYnV0dG9uRW50ZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZW50ZXJcIik7XHJcbmxldCBhbGxUYWJsZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLXdyYXBwZXJcIik7XHJcbmxldCBpbWdUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLXRhYmxlXCIpO1xyXG5sZXQgY2hla01hcmtUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVjay1tYXJrXCIpO1xyXG5jdXJyZW50TGV2ZWwgPSArSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIpIHx8IFwiMFwiKTtcclxubGV2ZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFsbExldmVsc1wiKSB8fCBcIm51bGxcIikgfHwgbGV2ZWxzRnJvbUpzb247XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpIHtcclxuICBjaGVrTWFya1Rhc2s/LmNsYXNzTGlzdC5yZW1vdmUoXCJkb25lXCIpO1xyXG4gIGlmIChsZXZlbHNbY3VycmVudExldmVsXS5pc0xldmVsRG9uZSkge1xyXG4gICAgY2hla01hcmtUYXNrPy5jbGFzc0xpc3QuYWRkKFwiZG9uZVwiKTtcclxuICB9XHJcbn1cclxuICBsb2FkUGFnZSgpXHJcblxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvQm9keU5leHQoKSB7XHJcbiAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5hZGQobGV2ZWxzW2N1cnJlbnRMZXZlbCArIDFdLm1haW5DbGFzcyk7XHJcbn1cclxuZnVuY3Rpb24gYWRkQ2xhc3NUb0JvZHlQcmV2KCkge1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWwgLSAxXS5tYWluQ2xhc3MpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUNsYXNzRnJvbUJvZHlOZXh0KCkge1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QucmVtb3ZlKGxldmVsc1tjdXJyZW50TGV2ZWwgLSAxXS5tYWluQ2xhc3MpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUNsYXNzRnJvbUJvZHlQcmV2KCkge1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QucmVtb3ZlKGxldmVsc1tjdXJyZW50TGV2ZWwgKyAxXS5tYWluQ2xhc3MpO1xyXG59XHJcblxyXG5sZXZlbHNPZk1lbnUuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGFkZENsYXNzQm9keS5jbGFzc0xpc3QucmVtb3ZlKGxldmVsc1tjdXJyZW50TGV2ZWxdLm1haW5DbGFzcyk7XHJcbiAgICBjdXJyZW50TGV2ZWwgPSBsZXZlbHMuZmluZEluZGV4KFxyXG4gICAgICAobGV2LCBpKSA9PiBlbGVtLmNsYXNzTmFtZSA9PT0gbGV2LmxldmVsSW5NZW51XHJcbiAgICApO1xyXG4gICAgYWRkQ2xhc3NCb2R5LmNsYXNzTGlzdC5hZGQobGV2ZWxzW2N1cnJlbnRMZXZlbF0ubWFpbkNsYXNzKTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYnRuUmVzc2V0UHJvZ3Jlc3M/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV2ZWxzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgb2JqLmlzTGV2ZWxEb25lID0gZmFsc2U7XHJcbiAgICBvYmouaXNMZXZlbERvbmVXaXRoSGVscCA9IGZhbHNlO1xyXG4gIH0pO1xyXG4gIG1hcmtMZXZlbHNPZk1lbnUuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZG9uZVwiKTtcclxuICB9KTtcclxuICBsZXZlbHNEZXNjcmlwdGlvbnMuZm9yRWFjaCgob2JqLCBpKSA9PiB7XHJcbiAgICBsZXQgc3ltYm9sSGVscCA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xldmVsc0Rlc2NyaXB0aW9uc1tpXS5jbGFzc0hlbHB9YClcclxuICAgICk7XHJcbiAgICBzeW1ib2xIZWxwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSlcclxuXHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhpZ2hsaWdodEh0bWxJbWcocGljdHVyZTogSFRNTEVsZW1lbnQsIHRleHRIVE1MOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnN0IHBvcHVwID0gcGljdHVyZS5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwXCIpO1xyXG4gIHBpY3R1cmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5hZGQoXCJzaGFkb3dcIik7XHJcbiAgICB0ZXh0SFRNTC5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0MVwiKTtcclxuICAgIHBvcHVwPy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIHBpY3R1cmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHBpY3R1cmUuY2xhc3NMaXN0LnJlbW92ZShcInNoYWRvd1wiKTtcclxuICAgIHRleHRIVE1MLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHQxXCIpO1xyXG4gICAgcG9wdXA/LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcblxyXG4gIHRleHRIVE1MLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdGV4dEhUTUwuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodDFcIik7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5hZGQoXCJzaGFkb3dcIik7XHJcbiAgICBwb3B1cD8uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICB0ZXh0SFRNTC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdGV4dEhUTUwuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodDFcIik7XHJcbiAgICBwaWN0dXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFkb3dcIik7XHJcbiAgICBwb3B1cD8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGV2ZWxQaWN0dXJlcygpIHtcclxuICBsZXQgYXJyYXlQaWN0dXJlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gIGltZ1RhYmxlPy5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5pbWFnZXMuZm9yRWFjaCgocGljdHVyZU9iaikgPT4ge1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGNyZWF0ZVBpY3R1cmUocGljdHVyZU9iaik7XHJcbiAgICBhcnJheVBpY3R1cmVzLnB1c2gocGljdHVyZSk7XHJcbiAgICBpZiAocGljdHVyZU9iai5uZXN0ZWRJbWcpIHtcclxuICAgICAgY29uc3QgbmVzdGVkID0gY3JlYXRlUGljdHVyZShwaWN0dXJlT2JqLm5lc3RlZEltZywgdHJ1ZSk7XHJcbiAgICAgIHBpY3R1cmUuYXBwZW5kQ2hpbGQobmVzdGVkKTtcclxuICAgICAgYXJyYXlQaWN0dXJlcy5wdXNoKG5lc3RlZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFycmF5UGljdHVyZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBpY3R1cmUob2JqOiBJbWFnZSwgbmVzdGVkID0gZmFsc2UpIHtcclxuICBsZXQgaW1nV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGlmICghbmVzdGVkKSB7XHJcbiAgICBpbWdUYWJsZT8uYXBwZW5kQ2hpbGQoaW1nV3JhcHBlcik7XHJcbiAgICBpbWdXcmFwcGVyLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tcmVsYXRpdmVcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgaW1nV3JhcHBlci5jbGFzc05hbWUgPSBcInBvc2l0aW9uLWFic29sdXRlXCI7XHJcbiAgfVxyXG4gIGxldCBwaWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICBwaWN0dXJlLmNsYXNzTmFtZSA9IG9iai5jbGFzcztcclxuICBwaWN0dXJlLnNyYyA9IG9iai5zcmM7XHJcbiAgaW1nV3JhcHBlcj8uYXBwZW5kQ2hpbGQocGljdHVyZSk7XHJcbiAgbGV0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwb3BVcC5jbGFzc05hbWUgPSBcInBvcHVwXCI7XHJcbiAgcG9wVXAuaW5uZXJIVE1MID0gb2JqLnRvb2x0aXA7XHJcbiAgaW1nV3JhcHBlci5hcHBlbmRDaGlsZChwb3BVcCk7XHJcbiAgcmV0dXJuIGltZ1dyYXBwZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0bWxCbG9ja3MoKSB7XHJcbiAgY29uc3QgYXJyRWxlbTogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gIGh0bWxDb250ZW50Py5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuICBsZXZlbHNbY3VycmVudExldmVsXS5odG1sX2NvZGUuZm9yRWFjaCgodGFnT2JqKSA9PiB7XHJcbiAgICBjb25zdCBkaXZIdG1sRWxlbWVudCA9IGNyZWF0ZUh0bWxCbG9jayh0YWdPYmopO1xyXG4gICAgYXJyRWxlbS5wdXNoKGRpdkh0bWxFbGVtZW50KTtcclxuICAgIGlmICh0YWdPYmouaHRtbF9uZXN0ZWQpIHtcclxuICAgICAgY29uc3QgaHRtbE5lc3RlZCA9IGNyZWF0ZUh0bWxCbG9jayh0YWdPYmouaHRtbF9uZXN0ZWQsIHRydWUpO1xyXG4gICAgICBkaXZIdG1sRWxlbWVudC5hcHBlbmRDaGlsZChodG1sTmVzdGVkKTtcclxuICAgICAgYXJyRWxlbS5wdXNoKGh0bWxOZXN0ZWQpO1xyXG4gICAgICBsZXQgY2xvc2VkVGFnID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGV2ZWxzW2N1cnJlbnRMZXZlbF0uY2xvc2VkVGFnMSk7XHJcbiAgICAgIGRpdkh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlZFRhZyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFyckVsZW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0bWxCbG9jayhvYmo6IEh0bWxDb2RlLCBodG1sX25lc3RlZCA9IGZhbHNlKSB7XHJcbiAgbGV0IHN0ckh0bWxDb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBzdHJIdG1sQ29kZS5jbGFzc05hbWUgPSBcInN0ci1odG1sLWNvZGVcIjtcclxuICBzdHJIdG1sQ29kZS5pbm5lckhUTUwgPSBvYmouaHRtbDtcclxuICBpZiAoIWh0bWxfbmVzdGVkKSB7XHJcbiAgICBodG1sQ29udGVudC5hcHBlbmRDaGlsZChzdHJIdG1sQ29kZSk7XHJcbiAgfVxyXG4gIHJldHVybiBzdHJIdG1sQ29kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGV2ZWxFbGVtZW50cygpIHtcclxuICBsZXQgcGljdHVyZXNFbEFyciA9IGNyZWF0ZUxldmVsUGljdHVyZXMoKTtcclxuICBsZXQgaHRtbEVsQXJyID0gY3JlYXRlSHRtbEJsb2NrcygpO1xyXG4gIHBpY3R1cmVzRWxBcnIuZm9yRWFjaCgocGljdEVsLCBpbmRleCkgPT4ge1xyXG4gICAgaGlnaGxpZ2h0SHRtbEltZyhwaWN0RWwsIGh0bWxFbEFycltpbmRleF0pO1xyXG4gIH0pO1xyXG4gIHRhc2tOYW1lLmlubmVySFRNTCA9IGxldmVsc1tjdXJyZW50TGV2ZWxdLnRhc2tOYW1lO1xyXG4gIGN1cnJlbnRMZXZlbEVsLmlubmVySFRNTCA9IGxldmVsc1tjdXJyZW50TGV2ZWxdLmN1ckxldmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmbHlJbWcoKSB7XHJcbiAgbGV0IGFsbHBpY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvc2l0aW9uLXJlbGF0aXZlXCIpO1xyXG4gIGFsbHBpY3QuZm9yRWFjaCgoaW1nT2ZUYWJsZSkgPT4ge1xyXG4gICAgaW1nT2ZUYWJsZS5jbGFzc0xpc3QuYWRkKFwiZmx5LWltZ1wiKTtcclxuICB9KTtcclxuICByZXR1cm4gYWxscGljdDtcclxufVxyXG5cclxucmlnaHRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCA8PSAxMSkge1xyXG4gICAgYWRkQ2xhc3NUb0JvZHlOZXh0KCk7XHJcbiAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgZGVsQW5zd2VyKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmxlZnRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGN1cnJlbnRMZXZlbCAhPT0gMCkge1xyXG4gICAgYWRkQ2xhc3NUb0JvZHlQcmV2KCk7XHJcbiAgICBjdXJyZW50TGV2ZWwgLT0gMTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgICBjcmVhdGVMZXZlbEVsZW1lbnRzKCk7XHJcbiAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KCk7XHJcbiAgICByZW1vdmVDbGFzc0Zyb21Cb2R5UHJldigpO1xyXG4gICAgZGVsQW5zd2VyKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xyXG51cGRhdGVTdGF0ZU9mTWFpbkNoZWNrTWFyaygpO1xyXG4gIGFkZENsYXNzQm9keS5jbGFzc0xpc3QuYWRkKGxldmVsc1tjdXJyZW50TGV2ZWxdLm1haW5DbGFzcyk7XHJcbiAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gIGNoYW5nZVRleHRSaWdodFNlY3QoKVxyXG4gIGxldmVscy5mb3JFYWNoKChvYmosIGkpID0+IHtcclxuICAgIGlmIChvYmouaXNMZXZlbERvbmUpIHtcclxuICAgICAgbGV0IHN5bWJvbEhlbHAgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xldmVsc0Rlc2NyaXB0aW9uc1tpXS5jbGFzc0hlbHB9YClcclxuICAgICAgKTtcclxuICAgICAgc3ltYm9sSGVscC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5pc0xldmVsRG9uZVdpdGhIZWxwKSB7XHJcbiAgICAgIGxldCBtYXJrU2lkZUJveFRhc2sgPSA8SFRNTEVsZW1lbnQ+KFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxldmVsc1tpXS5jaGVja01hcmtTaWRlSWQpXHJcbiAgICAgICk7XHJcbiAgICAgICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGltcGxlbWVudEVudGVyUHJlc3MoKSB7XHJcbiAgaWYgKGFuc3dlclRhc2sudmFsdWUgPT09IGxldmVsc1tjdXJyZW50TGV2ZWxdLmFuc3dlcikge1xyXG4gICAgZmx5SW1nKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbGV0IG1hcmtTaWRlQm94VGFzayA9IDxIVE1MRWxlbWVudD4oXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGV2ZWxzW2N1cnJlbnRMZXZlbF0uY2hlY2tNYXJrU2lkZUlkKVxyXG4gICAgICApO1xyXG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dC1hbnN3ZXJcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xyXG4gICAgICBtYXJrU2lkZUJveFRhc2s/LmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgICBhZGRDbGFzc1RvQm9keU5leHQoKTtcclxuICAgICAgbGV2ZWxzW2N1cnJlbnRMZXZlbF0uaXNMZXZlbERvbmUgPSB0cnVlO1xyXG4gICAgICBjdXJyZW50TGV2ZWwgKz0gMTtcclxuICAgICAgY3JlYXRlTGV2ZWxFbGVtZW50cygpO1xyXG4gICAgICByZW1vdmVDbGFzc0Zyb21Cb2R5TmV4dCgpO1xyXG4gICAgICBjaGFuZ2VUZXh0UmlnaHRTZWN0KClcclxuICAgICAgZGVsQW5zd2VyKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICAgIHVwZGF0ZVN0YXRlT2ZNYWluQ2hlY2tNYXJrKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsbFRhYmxlLmNsYXNzTGlzdC5hZGQoXCJzaGFrZVwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBhbGxUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwic2hha2VcIik7XHJcbiAgICB9LCAxMjAwKTtcclxuICB9XHJcbiB9XHJcbmJ1dHRvbkVudGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaW1wbGVtZW50RW50ZXJQcmVzcygpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICBpbXBsZW1lbnRFbnRlclByZXNzKCk7XHJcbiAgfVxyXG59KTtcclxuLy8gZnVuY3Rpb24gc2F2ZUxvY2FsU3RvcmFnZSgpIHtcclxuLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImluZGV4QXJyT2ZUYXNrXCIsIFN0cmluZyhjdXJyZW50TGV2ZWwpKTtcclxuLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFsbExldmVsc1wiLCBKU09OLnN0cmluZ2lmeShsZXZlbHMpKTtcclxuLy8gfVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIC8vIHNhdmVMb2NhbFN0b3JhZ2UoKTtcclxufSk7XHJcblxyXG5idXR0b25IZWxwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5zd2VyVGFzay5jbGFzc05hbWUgPSBcImZseS1hbnN3ZXJcIjtcclxuICBhbnN3ZXJUYXNrLnZhbHVlID0gbGV2ZWxzW2N1cnJlbnRMZXZlbF0uYW5zd2VyO1xyXG4gIGxldmVsc1tjdXJyZW50TGV2ZWxdLmlzTGV2ZWxEb25lV2l0aEhlbHAgPSB0cnVlO1xyXG4gIGxldCBzeW1ib2xIZWxwID0gPEhUTUxFbGVtZW50PihcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2xldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmNsYXNzSGVscH1gKVxyXG4gICk7XHJcbiAgc3ltYm9sSGVscC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGRlbEFuc3dlcigpIHtcclxuICBhbnN3ZXJUYXNrLmNsYXNzTGlzdC5yZW1vdmUoXCJmbHktYW5zd2VyXCIpO1xyXG4gIGFuc3dlclRhc2sudmFsdWUgPSBcIlwiO1xyXG59XHJcbiIsImltcG9ydCBsZXZlbHNEZXNjcmlwdGlvbnMgZnJvbSAnLi9sZXZlbHNEZXNjcmlwdGlvbnMuanNvbic7XHJcbmltcG9ydCB7Y3VycmVudExldmVsfSBmcm9tICcuL2luZGV4J1xyXG5cclxubGV0IHRvcGljVGFzayA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvcGljLXRhc2tcIik7XHJcbmxldCB0YXNrTmFtZVRleHQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrXCIpO1xyXG5sZXQgc3ltYm9sVGFzayA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN5bWJvbC10YXNrXCIpO1xyXG5sZXQgZGVzY3JpcHRpb25UYXNrID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb24tdGFza1wiKTtcclxubGV0IGV4YW1wbGVXb3JkID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhhbXBsZS13b3JkXCIpO1xyXG5sZXQgZXhhbXBsZUZpcnN0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhhbXBsZS1maXJzdFwiKTtcclxubGV0IGV4YW1wbGVTZWNvbmQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5leGFtcGxlLXNlY29uZFwiKTtcclxubGV0IHByb2dyZXNzID0gPEhUTUxQcm9ncmVzc0VsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9ncmVzc1wiKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VUZXh0UmlnaHRTZWN0KCkge1xyXG4gICAgdG9waWNUYXNrLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLnRvcGljX3Rhc2s7XHJcbiAgICB0YXNrTmFtZVRleHQuaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0udGFzaztcclxuICAgIHN5bWJvbFRhc2suaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uc3ltYm9sX3Rhc2s7XHJcbiAgICBkZXNjcmlwdGlvblRhc2suaW5uZXJIVE1MID0gbGV2ZWxzRGVzY3JpcHRpb25zW2N1cnJlbnRMZXZlbF0uZGVzY3JpcHRpb25fdGFzaztcclxuICAgIGV4YW1wbGVXb3JkLmlubmVySFRNTCA9IGxldmVsc0Rlc2NyaXB0aW9uc1tjdXJyZW50TGV2ZWxdLmV4YW1wbGVfd29yZDtcclxuICAgIGV4YW1wbGVGaXJzdC5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5leGFtcGxlX2ZpcnN0O1xyXG4gICAgZXhhbXBsZVNlY29uZC5pbm5lckhUTUwgPSBsZXZlbHNEZXNjcmlwdGlvbnNbY3VycmVudExldmVsXS5leGFtcGxlX3NlY29uZDtcclxuICAgIHByb2dyZXNzLnZhbHVlID0gMTAgKiAoY3VycmVudExldmVsICsgMSk7XHJcbiAgfSIsImltcG9ydCB7Y3VycmVudExldmVsfSBmcm9tICcuL2luZGV4J1xyXG5pbXBvcnQgbGV2ZWxzIGZyb20gJy4vYWxsTGV2ZWxzLmpzb24nO1xyXG5cclxubGV0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcmstbWFpblwiKTtcclxubGV0IHNpZGVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGUtYm94XCIpO1xyXG5leHBvcnQgbGV0IGxldmVsc09mTWVudSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLW9mLW1lbnVcIikpXHJcbmV4cG9ydCBsZXQgYnRuUmVzc2V0UHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1yZXNldC1wcm9ncmVzc1wiKTtcclxuZXhwb3J0IGxldCBtYXJrTGV2ZWxzT2ZNZW51ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoZWNrLW1hcmtcIikpXHJcblxyXG5cclxubWVudUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICBtZW51QnV0dG9uPy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgc2lkZUJveD8uY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==