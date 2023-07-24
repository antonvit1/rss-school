
import {btnToWinner, btnToGarage, headerSection, contentWrapperToGarage, contentWrapperToWinner, pageName, pageNumber, pageNameToWinner, pageNumberToWinner} from './main-elements'
import { createFormForCreatingCar, createFormForUpdatingCar, createMainBtns } from './garage/garage'
import { renderPageWinners } from './winners/winners'


btnToWinner.addEventListener('click', function () {

    if (!contentWrapperToGarage.classList.contains("active")){
    headerSection.innerHTML = ''
    contentWrapperToGarage.classList.add("active")
    contentWrapperToWinner.classList.add("active")
    btnToGarage.classList.remove('active')
    btnToWinner.classList.add('active')
      }


      renderPageWinners()

      pageName.classList.add('active')
      pageNumber.classList.add('active')
      pageNameToWinner.classList.add('active')
      pageNumberToWinner.classList.add('active')

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
        pageName.classList.remove('active')
        pageNumber.classList.remove('active')
        pageNameToWinner.classList.remove('active')
        pageNumberToWinner.classList.remove('active')

})


