const menuButton = document.querySelector(".mark-main");
const sideBox = document.querySelector(".side-box");
export const levelsOfMenu = [...document.querySelectorAll(".task-of-menu")];
export const buttonRessetProgress = document.querySelector(
  ".btn-reset-progress"
);
export const markLevelsOfMenu = [...document.querySelectorAll(".check-mark")];

menuButton?.addEventListener("click", function () {
  menuButton?.classList.toggle("active");
  sideBox?.classList.toggle("active");
});
