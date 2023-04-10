const arrPets = [
  {
    id: "jennifer",
    name: "Jennifer",
    img: "assets/pets-jennifer.png",
    type: "Dog",
    breed: " - Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "sophia",
    name: "Sophia",
    img: "assets/pets-dog-sophia.png",
    type: "Dog",
    breed: " - Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "woody",
    name: "Woody",
    img: "assets/pets-woody.png",
    type: "Dog",
    breed: " - Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
  },
  {
    id: "scarlett",
    name: "Scarlett",
    img: "assets/pets-scarlet.png",
    type: "Dog",
    breed: " - Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "katrine",
    name: "Katrine",
    img: "assets/pets-katrine.png",
    type: "Cat",
    breed: " - British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "timmy",
    name: "Timmy",
    img: "assets/pets-timmy.png",
    type: "Cat",
    breed: " - British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"],
  },
  {
    id: "freddie",
    name: "Freddie",
    img: "assets/pets-freddie.png",
    type: "Cat",
    breed: " - British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "charly",
    name: "Charly",
    img: "assets/pets-charly.png",
    type: "Dog",
    breed: " - Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
  },
];

let iconBurgerMenu = document.querySelector(".icon-burger-menu");
let burgerMenu = document.querySelector(".burger-menu");
let body = document.querySelector("body");
let bodyWrapper = document.querySelector(".body-wrapper");
let startScreen = document.querySelector(".start-screen");
let aboutThe = document.querySelector(".about-the");
let jenifer = document.querySelector("#jennifer");
let jeniferDog = document.querySelector("#jennifer-dog");
let closePopup = document.querySelector(".open-close-popup");
let ourFriendsPets = document.querySelector(".our-friends-pets");
let help = document.querySelector(".help");
let inAdditionDonation = document.querySelector(".in-addition-donation");
let katrine = document.querySelector("#katrine");
let woody = document.querySelector("#woody");
// burgerMenu
iconBurgerMenu.addEventListener("click", function () {
  iconBurgerMenu.classList.toggle("active");
  burgerMenu.classList.toggle("active");
  document.body.style.overflow = "hidden";
  bodyWrapper.classList.toggle("active");
});
function changeBurgerState() {
  iconBurgerMenu.classList.remove("active");
  burgerMenu.classList.remove("active");
  document.body.style.overflow = "";
  bodyWrapper.classList.remove("active");
}

burgerMenu.addEventListener("click", function () {
  changeBurgerState();
});
bodyWrapper.addEventListener("click", function () {
  changeBurgerState();
});
// PopUp
let arrCardPets = document.querySelectorAll(".card-pets");
let arr2 = Array.from(arrCardPets);

arr2.forEach((elem) => {
  elem.addEventListener("click", function () {
    jeniferDog.classList.toggle("active");
    bodyWrapper.classList.toggle("active");
    document.body.style.overflow = "hidden";
    changePetsCard(elem.id);
  });
});

function changePetsCard(a) {
  i = arrPets.findIndex((elem) => elem.id === a);
  document.querySelector(".name-animal-popup").textContent = arrPets[i].name;
  document.querySelector(".img-animal-popup").src = arrPets[i].img;
  document.querySelector(".who-is-animal-popup").textContent =
    arrPets[i].type + arrPets[i].breed;
  document.querySelector(".discription-animal-popup").textContent =
    arrPets[i].description;
  document.querySelector("#age").textContent = arrPets[i].age;
  document.querySelector("#inoculations").textContent = arrPets[i].inoculations;
  document.querySelector("#diseases").textContent = arrPets[i].diseases;
  document.querySelector("#parasites").textContent = arrPets[i].parasites;
}

function closePopUpCard() {
  jeniferDog.classList.remove("active");
  bodyWrapper.classList.remove("active");
  document.body.style.overflow = "";
}
closePopup.addEventListener("click", function () {
  closePopUpCard();
});
// slider
let buttonSliderPrev = document.querySelector(".prev-button-slider");
let buttonSliderNext = document.querySelector(".next-button-slider");
let buttonCheck = 0;
let newCards = [];
let prevCards = [];
let nextCards = [];

window.addEventListener("load", function (event) {
  updateCards();
});

function changeTextPictureCardSlider(i, elem) {
  elem.id = arrPets[i].id;
  elem.querySelector(".img-pets-in-slider").src = arrPets[i].img;
  elem.querySelector(".pet-name-card").textContent = arrPets[i].name;
}

function updateCards() {
  let currentCards = [...newCards];
  newCards = [];

  arr2.forEach((elem, index) => {
    let indexRandom = Math.floor(Math.random() * 8);
    while (
      newCards.includes(indexRandom) ||
      currentCards.includes(indexRandom)
    ) {
      indexRandom = Math.floor(Math.random() * 8);
    }
    newCards.push(indexRandom);
    changeTextPictureCardSlider(indexRandom, elem);
  });
}
function updateOnOldCard(prevNextCards) {
  newCards = [];
  arr2.forEach((elem, index) => {
    newCards.push(prevNextCards[index]);
    changeTextPictureCardSlider(prevNextCards[index], elem);
  });
}

buttonSliderPrev.addEventListener("click", function () {
  prevCards = [...newCards];
  if (buttonCheck === 0 || buttonCheck === 1) {
    updateCards();
  } else {
    updateOnOldCard(nextCards);
  }
  buttonCheck = 1;
});
buttonSliderNext.addEventListener("click", function () {
  nextCards = [...newCards];

  if (buttonCheck === 0 || buttonCheck === 2) {
    updateCards();
  } else {
    updateOnOldCard(prevCards);
  }
  buttonCheck = 2;
});
console.log(`Реализация burger menu на обеих страницах: +26 \n
Реализация слайдера-карусели на странице Main: +32\n
Реализация пагинации на странице Pets: +36\n
Реализация попап на обеих страницах: +12`);