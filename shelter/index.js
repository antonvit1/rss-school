

let iconBurgerMenu = document.querySelector(".icon-burger-menu");
let burgerMenu = document.querySelector(".burger-menu");
let body = document.querySelector("body");
let bodyWrapper = document.querySelector(".body-wrapper");
let startScreen = document.querySelector(".start-screen");
let aboutThe = document.querySelector(".about-the");
let jenifer = document.querySelector("#jennifer");
let jeniferDog = document.querySelector("#jennifer-dog");
let openClosePopup = document.querySelector(".open-close-popup");
let ourFriendsPets = document.querySelector(".our-friends-pets");
let help = document.querySelector(".help");
let inAdditionDonation = document.querySelector(".in-addition-donation");

iconBurgerMenu.addEventListener("click", function () {
  iconBurgerMenu.classList.toggle("active");
  burgerMenu.classList.toggle("active");
  body.classList.toggle("active");
  startScreen.classList.toggle("active");
  aboutThe.classList.toggle("active");
});
function changeBurgerState() {
  iconBurgerMenu.classList.remove("active");
  burgerMenu.classList.remove("active");
  body.classList.remove("active");
  startScreen.classList.remove("active");
  aboutThe.classList.remove("active");
}

burgerMenu.addEventListener("click", function () {
  changeBurgerState();
});
startScreen.addEventListener("click", function () {
  changeBurgerState();
});
aboutThe.addEventListener("click", function () {
  changeBurgerState();
});

jenifer.addEventListener("click", function () {
  jeniferDog.classList.toggle("active");
  bodyWrapper.classList.toggle("active");
  document.body.style.overflow = "hidden";
});
openClosePopup.addEventListener("click", function () {
  jeniferDog.classList.remove("active");
  body.classList.remove("active");
  bodyWrapper.classList.remove("active");
  document.body.style.overflow = "";
});
