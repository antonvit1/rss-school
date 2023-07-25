import {
    btnToWinner as buttonToWinner,
    btnToGarage as buttonToGarage,
    btnPrev,
    btnNext,
    btnPrevWinners,
    btnNextWinner,
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
    loadGaragePage,
    saveInLocalStorageGarage
} from './garage/garage'
import { renderPageWinners } from './winners/winners'

let screenPage = localStorage.getItem('screen') || 'Garage'
if (screenPage === 'Garage') {
    loadGarage()
} else {
    loadWinners()
}

buttonToWinner.addEventListener('click', function () {
    loadWinners()
})
buttonToGarage.addEventListener('click', function () {
    loadGarage()
})

window.addEventListener('beforeunload', function () {

    this.localStorage.setItem('screen', screenPage)
})
function loadWinners() {
    saveInLocalStorageGarage()
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
    btnPrev.classList.add('active')
    btnNext.classList.add('active')
    btnPrevWinners.classList.add('active')
    btnNextWinner.classList.add('active')
    renderPageWinners()
    screenPage = 'Winner'
}
function loadGarage() {
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
    btnPrev.classList.remove('active')
    btnNext.classList.remove('active')
    btnPrevWinners.classList.remove('active')
    btnNextWinner.classList.remove('active')
    screenPage = 'Garage'
       loadGaragePage()
}
