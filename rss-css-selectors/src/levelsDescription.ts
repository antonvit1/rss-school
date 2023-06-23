import levelsDescriptions from './levelsDescriptions.json';
import {currentLevel} from './index'

let topicTask = <HTMLElement>document.querySelector(".topic-task");
let taskNameText = <HTMLElement>document.querySelector(".task");
let symbolTask = <HTMLElement>document.querySelector(".symbol-task");
let descriptionTask = <HTMLElement>document.querySelector(".description-task");
let exampleWord = <HTMLElement>document.querySelector(".example-word");
let exampleFirst = <HTMLElement>document.querySelector(".example-first");
let exampleSecond = <HTMLElement>document.querySelector(".example-second");
let progress = <HTMLProgressElement>document.querySelector("#progress");

export function changeTextRightSect() {
    topicTask.innerHTML = levelsDescriptions[currentLevel].topic_task;
    taskNameText.innerHTML = levelsDescriptions[currentLevel].task;
    symbolTask.innerHTML = levelsDescriptions[currentLevel].symbol_task;
    descriptionTask.innerHTML = levelsDescriptions[currentLevel].description_task;
    exampleWord.innerHTML = levelsDescriptions[currentLevel].example_word;
    exampleFirst.innerHTML = levelsDescriptions[currentLevel].example_first;
    exampleSecond.innerHTML = levelsDescriptions[currentLevel].example_second;
    progress.value = 10 * (currentLevel + 1);
  }