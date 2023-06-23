import {currentLevel} from './index'
import levels from './allLevels.json';

let chekMarkTask = document.querySelector(".check-mark");
let markMain = document.querySelector(".mark-main");
let sideBox = document.querySelector(".side-box");
export let levelsOfMenu = Array.from(document.querySelectorAll(".task-of-menu"))
export let btnRessetProgress = document.querySelector(".btn-reset-progress");
export let markLevelsOfMenu = Array.from(document.querySelectorAll(".check-mark"))

markMain?.addEventListener("click", function () {
    markMain?.classList.toggle("active");
    sideBox?.classList.toggle("active");
  });

export function updateStateOfMainCheckMark() {
  chekMarkTask?.classList.remove("done");
  if (levels[currentLevel].isLevelDone) {
    chekMarkTask?.classList.add("done");
  }
}


