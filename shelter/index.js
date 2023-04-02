console.log(`Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n
Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n
Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n
Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n
Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n
Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n
Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции : +8\n
При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4 \n
Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис  : +8
`);

let iconBurgerMenu = document.querySelector('.icon-burger-menu');
let burgerMenu = document.querySelector('.burger-menu');

iconBurgerMenu.addEventListener('click',function(){
    iconBurgerMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})
