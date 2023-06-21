import "./style.css";

const arrayTask = [
  {
    mainClass: "task1",
    class_highlight1: "highlight1",
    shadowImg: "shadow",
    taskName: "Select the plate",
    img1: "plate1",
    src1: "assets/plate.svg",
    img2: "plate2",
    src2: "assets/plate.svg",
    img3: "",
    src3: "",
    html_str2: "&lt;plate/&gt;<br>",
    html_str4: "&lt;div/&gt;",
    html_str5: "",
    curLevel: "1",
    topic_task: "ID Selector",
    answer: "plate",
    markSideBoxTask: "mark-one"
    // changeColorMark:
  },
  {
    mainClass: "task2",
    class_highlight1: "highlight1",
    shadowImg: "shadow",
    taskName: "Select the mushroom",
    img1: "mushroom1",
    src1: "assets/mushroom.svg",
    img2: "plate",
    src2: "assets/plate.svg",
    img3: "mushroom2",
    src3: "assets/mushroom.svg",
    html_str2: "&lt;mushroom/&gt;<br>",
    html_str4: "&lt;mushroom/&gt;<br>",
    html_str5: "&lt;div/&gt;",
    curLevel: "2",
    topic_task: "ID Selector",
    answer: "mushroom",
    markSideBoxTask: "mark-two"
  },
  {
    mainClass: "task3",
    class_highlight1: "highlight1",
    shadowImg: "shadow",
    taskName: "Select the fancy plate",
    img1: "plate-fancy",
    src1: "assets/plate-svgrepo.svg",
    img2: "plate",
    src2: "assets/plate.svg",
    img3: "mushroom",
    src3: "assets/mushroom.svg",
    html_str2: '&lt;plate id="fancy"/&gt;<br>',
    html_str4: "&lt;mushroom/&gt;<br>",
    html_str5: "&lt;div/&gt;",
    curLevel: "3",
    topic_task: "ID Selector",
    task: "Select elements with an ID",
    symble_task: "#id",
    description_task:
      "Selects the element with a specific <mark><strong>id</strong></mark>. You can also combine the ID selector with the type selector.",
    example_first:
      '<mark>#cool</mark> selects any element with <mark>id="cool"</mark>',
    example_second:
      '<mark>ul#long</mark> selects ul <mark>&lt;id="long"&gt;</mark>',
      answer: "#plate",
      markSideBoxTask: "mark-three"
  },
];

let indexOfArrayTask = 0;
let markMain = document.querySelector(".mark-main");
let sideBox = document.querySelector(".side-box");
let rightBtn = document.querySelector(".right-button");
let leftBtn = document.querySelector(".left-button");

let addClassBody = <HTMLElement>document.querySelector(".body");
let taskName = <HTMLElement>document.querySelector(".task-name");
let htmlCodeStr2 = <HTMLElement>document.querySelector(".html_str2");
let htmlCodeStr3 = <HTMLElement>document.querySelector(".html_str3");
let htmlCodeStr4 = <HTMLElement>document.querySelector(".html_str4");
let htmlCodeStr5 = <HTMLElement>document.querySelector(".html_str5");
let currentLevel = <HTMLElement>document.querySelector(".current-level");
let progress = <HTMLProgressElement>document.querySelector("#progress");

let imgTable = document.querySelector(".img-table");


markMain?.addEventListener("click", function () {
  markMain?.classList.toggle("active");
  sideBox?.classList.toggle("active");
});

addClassBody.classList.add(arrayTask[indexOfArrayTask].mainClass);
changePictureHtmlTableTask();

function addClassToBodyNext() {
    addClassBody.classList.add(arrayTask[indexOfArrayTask + 1].mainClass);
}
function addClassToBodyPrev() {
    addClassBody.classList.add(arrayTask[indexOfArrayTask - 1].mainClass);
}

function removeClassFromBodyNext() {
    addClassBody.classList.remove(arrayTask[indexOfArrayTask - 1].mainClass);
}

function removeClassFromBodyPrev() {
    addClassBody.classList.remove(arrayTask[indexOfArrayTask + 1].mainClass);
}
function highlightHtmlImg(picture: any, textHTML: any) {
  picture.addEventListener("mouseover", function () {
      picture.classList.add(arrayTask[indexOfArrayTask].shadowImg);
      textHTML.classList.add(arrayTask[indexOfArrayTask].class_highlight1);
});
picture.addEventListener("mouseout", function () {
  picture.classList.remove(arrayTask[indexOfArrayTask].shadowImg);
  textHTML.classList.remove(arrayTask[indexOfArrayTask].class_highlight1);
});


textHTML.addEventListener("mouseover", function () {
  textHTML.classList.add(arrayTask[indexOfArrayTask].class_highlight1);
  picture.classList.add(arrayTask[indexOfArrayTask].shadowImg);
});
textHTML.addEventListener("mouseout", function () {
  textHTML.classList.remove(arrayTask[indexOfArrayTask].class_highlight1);
  picture.classList.remove(arrayTask[indexOfArrayTask].shadowImg);
});
}
function changePictureHtmlTableTask() {
  let pictureOne = document.createElement("img");
  let pictureTwo = document.createElement("img");
  let pictureThree = document.createElement("img");

  taskName.innerHTML = arrayTask[indexOfArrayTask].taskName;
  htmlCodeStr2.innerHTML = arrayTask[indexOfArrayTask].html_str2;
  htmlCodeStr4.innerHTML = arrayTask[indexOfArrayTask].html_str4;
  htmlCodeStr5.innerHTML = arrayTask[indexOfArrayTask].html_str5;
  currentLevel.innerHTML = arrayTask[indexOfArrayTask].curLevel;
  progress.value = 10 * (indexOfArrayTask + 1);

  imgTable?.replaceChildren();

  pictureOne.className = arrayTask[indexOfArrayTask].img1;
  pictureOne.src = arrayTask[indexOfArrayTask].src1;
  imgTable?.appendChild(pictureOne);


  pictureTwo.className = arrayTask[indexOfArrayTask].img2;
  pictureTwo.src = arrayTask[indexOfArrayTask].src2;
  imgTable?.appendChild(pictureTwo);

  pictureThree.className = arrayTask[indexOfArrayTask].img3;
  pictureThree.src = arrayTask[indexOfArrayTask].src3;
  imgTable?.appendChild(pictureThree);

  highlightHtmlImg(pictureOne, htmlCodeStr2);
  highlightHtmlImg(pictureTwo, htmlCodeStr3);
  highlightHtmlImg(pictureThree, htmlCodeStr4);
}


rightBtn?.addEventListener("click", function () {
  addClassToBodyNext();
  indexOfArrayTask += 1;
  changePictureHtmlTableTask();
  removeClassFromBodyNext();
});

leftBtn?.addEventListener("click", function () {
  addClassToBodyPrev();
  indexOfArrayTask -= 1;
  changePictureHtmlTableTask();
  removeClassFromBodyPrev();
});

let answerTask: any = document.querySelector("#input-answer");
let buttonEnter = <HTMLElement>document.querySelector(".img-enter");
let allTable = <HTMLElement>document.querySelector(".table-wrapper");
let chekMarkTask = <HTMLElement>document.querySelector(".check-mark");
let markSideBoxTask = <HTMLElement>document.getElementById(arrayTask[indexOfArrayTask].markSideBoxTask);
console.log(arrayTask[indexOfArrayTask].markSideBoxTask);

buttonEnter.addEventListener("click", function() {

  if (answerTask.value === arrayTask[indexOfArrayTask].answer) {
    addClassToBodyNext();
    indexOfArrayTask += 1;
    changePictureHtmlTableTask();
    removeClassFromBodyNext();
    chekMarkTask?.classList.add("active");
    markSideBoxTask?.classList.add("active");
    } else {

allTable.classList.add("shake");
setTimeout(() => {
  allTable.classList.remove("shake");
},1200)
    }

})
