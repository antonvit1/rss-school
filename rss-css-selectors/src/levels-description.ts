import levelsDescriptions from "./levelsDescriptions.json";
import { currentLevel } from "./index";

const topicTask = <HTMLElement>document.querySelector(".topic-task");
const taskNameText = <HTMLElement>document.querySelector(".task");
const symbolTask = <HTMLElement>document.querySelector(".symbol-task");
const descriptionTask = <HTMLElement>(
  document.querySelector(".description-task")
);
const exampleWord = <HTMLElement>document.querySelector(".example-word");
const exampleFirst = <HTMLElement>document.querySelector(".example-first");
const exampleSecond = <HTMLElement>document.querySelector(".example-second");
const progress = <HTMLProgressElement>document.querySelector("#progress");

export function changeTextRightSect(): void {
  topicTask.innerHTML = levelsDescriptions[currentLevel].topic_task;
  taskNameText.innerHTML = levelsDescriptions[currentLevel].task;
  symbolTask.innerHTML = levelsDescriptions[currentLevel].symbol_task;
  descriptionTask.innerHTML = levelsDescriptions[currentLevel].description_task;
  exampleWord.innerHTML = levelsDescriptions[currentLevel].example_word;
  exampleFirst.innerHTML = levelsDescriptions[currentLevel].example_first;
  exampleSecond.innerHTML = levelsDescriptions[currentLevel].example_second;
  progress.value = 10 * (currentLevel + 1);
}
