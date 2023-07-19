
import {btnToWinner, btnToGarage, headerSection, contentWrapperToGarage, contentWrapperToWinner} from './main-elements'
import { createFormForCreatingCar, createFormForUpdatingCar, createMainBtns } from './garage'


btnToWinner.addEventListener('click', function () {
    if (!contentWrapperToGarage.classList.contains("active")){
    headerSection.innerHTML = ''
    contentWrapperToGarage.classList.add("active")
    contentWrapperToWinner.classList.add("active")
    btnToGarage.classList.remove('active')
    btnToWinner.classList.add('active')

    }
})
btnToGarage.addEventListener('click', function () {

    if (contentWrapperToGarage.classList.contains("active")) {
    contentWrapperToGarage.classList.remove("active")
    contentWrapperToWinner.classList.remove("active")
    createFormForCreatingCar()
    createFormForUpdatingCar()
    createMainBtns()
    btnToGarage.classList.add('active')
    btnToWinner.classList.remove('active')
    }

})


