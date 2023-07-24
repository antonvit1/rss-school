import {
    btnToWinner as buttonToWinner,
    btnToGarage as buttonToGarage,
    headerSection,
    contentWrapperToGarage,
    contentWrapperToWinner,
    pageName,
    pageNumber,
    pageNameToWinner,
    pageNumberToWinner,
} from './main-elements'
import {
    createFormForCreatingCar,
    createFormForUpdatingCar,
    createMainBtns,
} from './garage/garage'
import { renderPageWinners } from './winners/winners'

buttonToWinner.addEventListener('click', function () {
    if (!contentWrapperToGarage.classList.contains('active')) {
        headerSection.innerHTML = ''
        contentWrapperToGarage.classList.add('active')
        contentWrapperToWinner.classList.add('active')
        buttonToGarage.classList.remove('active')
        buttonToWinner.classList.add('active')
    }
    pageName.classList.add('active')
    pageNumber.classList.add('active')
    pageNameToWinner.classList.add('active')
    pageNumberToWinner.classList.add('active')

    renderPageWinners()
})
buttonToGarage.addEventListener('click', function () {
    if (contentWrapperToGarage.classList.contains('active')) {
        contentWrapperToGarage.classList.remove('active')
        contentWrapperToWinner.classList.remove('active')
        createFormForCreatingCar()
        createFormForUpdatingCar()
        createMainBtns()
        buttonToGarage.classList.add('active')
        buttonToWinner.classList.remove('active')
    }
    pageName.classList.remove('active')
    pageNumber.classList.remove('active')
    pageNameToWinner.classList.remove('active')
    pageNumberToWinner.classList.remove('active')
})
