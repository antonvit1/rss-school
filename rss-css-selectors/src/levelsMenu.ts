import {currentLevel} from './index'
import levels from './allLevels.json';

let menuButton = document.querySelector(".mark-main");
let sideBox = document.querySelector(".side-box");
export let levelsOfMenu = Array.from(document.querySelectorAll(".task-of-menu"))
export let btnRessetProgress = document.querySelector(".btn-reset-progress");
export let markLevelsOfMenu = Array.from(document.querySelectorAll(".check-mark"))


menuButton?.addEventListener("click", function () {
  menuButton?.classList.toggle("active");
    sideBox?.classList.toggle("active");
  });



