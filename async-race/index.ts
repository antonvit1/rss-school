import './style.css'

const body = <HTMLElement>document.querySelector('body')

const bodyWrapper = <HTMLElement>document.createElement('div')
bodyWrapper.className = 'body-wrapper'
body.appendChild(bodyWrapper)

const header = <HTMLElement>document.createElement('header')
header.className = 'header'
bodyWrapper.appendChild(header)

const btnToGarage = <HTMLElement>document.createElement('button')
btnToGarage.className = 'button-garage'
btnToGarage.innerHTML = 'To Garage'
header.appendChild(btnToGarage)
const btnToWinner = <HTMLElement>document.createElement('button')
btnToWinner.className = 'button-winner'
btnToWinner.innerHTML = 'To Winner'
header.appendChild(btnToWinner)

const sectionCreateCar = <HTMLElement>document.createElement('section')
sectionCreateCar.className = 'section-create-car'
bodyWrapper.appendChild(sectionCreateCar)

const fieldCreateCar = <HTMLElement>document.createElement('div')
fieldCreateCar.className = 'field-create-car'
sectionCreateCar.appendChild(fieldCreateCar)
const fieldUpdateCare = <HTMLElement>document.createElement('div')
fieldUpdateCare.className = 'field-update-car'
sectionCreateCar.appendChild(fieldUpdateCare)
const btnsRaceResetGenerate = <HTMLElement>document.createElement('div')
btnsRaceResetGenerate.className = 'field-create-car'
sectionCreateCar.appendChild(btnsRaceResetGenerate)

const inputCarName = <HTMLInputElement>document.createElement('input')
inputCarName.className = 'field-input-creat-car'
inputCarName.type = 'text'
fieldCreateCar.appendChild(inputCarName)
const addColorCar = <HTMLInputElement>document.createElement('input')
addColorCar.className = 'add-car-color'
addColorCar.type = 'color'
fieldCreateCar.appendChild(addColorCar)
const btnCreate = <HTMLElement>document.createElement('button')
btnCreate.className = 'button-create-car'
btnCreate.innerHTML = 'Create'
fieldCreateCar.appendChild(btnCreate)

const inputUpdateCarName = <HTMLInputElement>document.createElement('input')
inputUpdateCarName.className = 'field-input-update-car'
inputUpdateCarName.type = 'text'
fieldUpdateCare.appendChild(inputUpdateCarName)
const updateColorCar = <HTMLInputElement>document.createElement('input')
updateColorCar.className = 'update-car-color'
updateColorCar.type = 'color'
fieldUpdateCare.appendChild(updateColorCar)
const btnUpdate = <HTMLElement>document.createElement('button')
btnUpdate.className = 'button-update-car'
btnUpdate.innerHTML = 'Update'
fieldUpdateCare.appendChild(btnUpdate)

const btnStartRace = <HTMLElement>document.createElement('button')
btnStartRace.className = 'btn-race'
btnStartRace.innerHTML = 'Race'
btnsRaceResetGenerate.appendChild(btnStartRace)
const btnStartReset = <HTMLElement>document.createElement('button')
btnStartReset.className = 'btn-reset'
btnStartReset.innerHTML = 'Reset'
btnsRaceResetGenerate.appendChild(btnStartReset)
const btnGenerateCars = <HTMLElement>document.createElement('button')
btnGenerateCars.className = 'btn-generate-cars'
btnGenerateCars.innerHTML = 'Generate Cars'
btnsRaceResetGenerate.appendChild(btnGenerateCars)

const wrapperPageName = <HTMLElement>document.createElement('div')
wrapperPageName.className = 'wrapper-page-name'
bodyWrapper.appendChild(wrapperPageName)

const pageName = <HTMLElement>document.createElement('div')
pageName.className = 'page-name'
pageName.innerHTML = 'Garage (100)'
wrapperPageName.appendChild(pageName)
const pageNumber = <HTMLElement>document.createElement('div')
pageNumber.className = 'page-number'
pageNumber.innerHTML = 'Page #1'
wrapperPageName.appendChild(pageNumber)

const fieldRoad = <HTMLElement>document.createElement('section')
fieldRoad.className = 'field-road'
bodyWrapper.appendChild(fieldRoad)

function newCarCreat() {
    const wrapperCar = <HTMLElement>document.createElement('div')
    wrapperCar.className = 'wrapper-car'
    fieldRoad.appendChild(wrapperCar)
    const wrapperCarButton = <HTMLElement>document.createElement('div')
    wrapperCarButton.className = 'wrapper-car-button'
    wrapperCar.appendChild(wrapperCarButton)
    const btnSelect = <HTMLElement>document.createElement('button')
    btnSelect.className = 'btn-select'
    btnSelect.innerHTML = 'Select'
    wrapperCarButton.appendChild(btnSelect)
    const btnRemove = <HTMLElement>document.createElement('button')
    btnRemove.className = 'btn-remove'
    btnRemove.innerHTML = 'Remove'
    wrapperCarButton.appendChild(btnRemove)
    const carName = <HTMLElement>document.createElement('div')
    carName.className = 'car-name'
    carName.innerHTML = 'BMW 7'
    wrapperCarButton.appendChild(carName)
    const wrapperBtnCarFlag = <HTMLElement>document.createElement('div');
    wrapperBtnCarFlag.className = "wrapper-btn-car-flag"
    wrapperCar.appendChild(wrapperBtnCarFlag);
    const wrapperStartReturnbtn = <HTMLElement>document.createElement('div')
    wrapperStartReturnbtn.className = 'btn-start-return'
    wrapperBtnCarFlag.appendChild(wrapperStartReturnbtn)
    const btnStartCar = <HTMLElement>document.createElement('button')
    btnStartCar.className = 'btn-start-car'
    btnStartCar.innerHTML = 'S'
    wrapperStartReturnbtn.appendChild(btnStartCar)
    const btnrReturnCar = <HTMLElement>document.createElement('button')
    btnrReturnCar.className = 'btn-return-car'
    btnrReturnCar.innerHTML = 'R'
    wrapperStartReturnbtn.appendChild(btnrReturnCar)
    const imgCar = document.createElement('svg');

}
newCarCreat()
