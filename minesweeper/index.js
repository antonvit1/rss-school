let countBomb = 10;
let flag = 0;
const arrayFieldSize = [10, 15, 25];
const arrayComplexity = ["Easy", "Medium", "Hard"];
const body = document.querySelector("body");
body.classList = "body";
const wrapperComplexity = document.createElement("div");
wrapperComplexity.className = "complexity-wrapper";
body.appendChild(wrapperComplexity);

arrayComplexity.forEach((value) => {
  const complexity = document.createElement("input");
  const textComplexity = document.createElement("label");
  complexity.type = "radio";
  complexity.className = "buttonComplexity";
  textComplexity.innerHTML = value;
  wrapperComplexity.appendChild(complexity);
  wrapperComplexity.appendChild(textComplexity);
});

let arrayOfCell = Array(countBomb * countBomb).fill(" ");

const divCell = document.createElement("div");
divCell.className = "all-cells";

body.appendChild(divCell);
arrayOfCell.forEach((element) => {
  let buttonCell = document.createElement("button");
  buttonCell.className = "cell";
  buttonCell.innerHTML = element;
  divCell.appendChild(buttonCell);

  buttonCell.addEventListener("contextmenu", () => {
    if (buttonCell.innerHTML === "🚩") {
      buttonCell.innerHTML = " ";
    } else if (buttonCell.innerHTML !== "🚩") {
      buttonCell.innerHTML = "🚩";
    }
  });

});
const arrayOfDomButton = Array.from(document.querySelectorAll(".cell"));
arrayOfDomButton.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (arrayOfDomButton.every(cell => cell === " ")){
        cell.innerHTML = "2";
        }
          })
});
