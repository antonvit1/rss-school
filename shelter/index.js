console.log(`Страница Main (60)\n
Проверка верстки +7\n
Вёрстка соответствует макету +35\n
Требования к css +6\n
Интерактивность элементов +12\n
Страница Pets (40)\n
Проверка верстки +7\n
Вёрстка соответствует макету +15\n
Требования к css +4
Интерактивность элементов +14\n`);

let iconBurgerMenu = document.querySelector('.icon-burger-menu');
let burgerMenu = document.querySelector('.burger-menu');

iconBurgerMenu.addEventListener('click',function(){
    iconBurgerMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})
