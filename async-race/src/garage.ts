import { fieldRoad } from './main-elements'

import { sectionCreateCar } from './main-elements'
import { Car } from './types'
const imgCar = require('!svg-inline-loader?classPrefix!./assets/car.svg')
const imgFlag = require('!svg-inline-loader?classPrefix!./assets/flag.svg')


const arrayOfCars: Car[] = []

export function creatFieldsForCreatCar() {
    const fieldCreateCar = <HTMLElement>document.createElement('div')
    fieldCreateCar.className = 'field-create-car'
    sectionCreateCar.appendChild(fieldCreateCar)
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
console.log(addColorCar.value);

    btnCreate.addEventListener('click', function () {
        saveCarInArray()
        newCarCreat()



        inputCarName.value = ''

    })
}
creatFieldsForCreatCar()

export function creatFieldsForUpdateCar() {
    const fieldUpdateCare = <HTMLElement>document.createElement('div')
    fieldUpdateCare.className = 'field-update-car'
    sectionCreateCar.appendChild(fieldUpdateCare)
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

    btnUpdate.addEventListener('click', function() {

    })

}
creatFieldsForUpdateCar()

export function creatMainBtns() {
    const btnsRaceResetGenerate = <HTMLElement>document.createElement('div')
    btnsRaceResetGenerate.className = 'btns-race-reset-generate'
    sectionCreateCar.appendChild(btnsRaceResetGenerate)
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
}
creatMainBtns()

function createButtonsForCar() {
    const inputCarName = <HTMLInputElement>(
        document.querySelector('.field-input-creat-car')
    )
    const inputUpdateCarName = <HTMLInputElement>(
        document.querySelector('.field-input-update-car')
    )
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
    carName.innerHTML = inputCarName?.value || ''
    wrapperCarButton.appendChild(carName)
    const wrapperBtnCarFlag = <HTMLElement>document.createElement('div')
    wrapperBtnCarFlag.className = 'wrapper-btn-car-flag'
    wrapperCar.appendChild(wrapperBtnCarFlag)

    btnRemove.addEventListener('click', function () {
        wrapperCar.remove()
    })
    btnSelect.addEventListener('click', function () {
        inputUpdateCarName.value = carName.innerHTML


    })
    return wrapperBtnCarFlag
}

export function newCarCreat() {
    const addColorCar = <HTMLInputElement>document.querySelector(".add-car-color")

    const wrapperBtnCarFlag = createButtonsForCar()
    const wrapperRoadCar = <HTMLElement>document.createElement('div')
    wrapperRoadCar.className = 'wrapper-road-car'
    wrapperBtnCarFlag.appendChild(wrapperRoadCar)
    const wrapperStartReturnbtn = <HTMLElement>document.createElement('div')
    wrapperStartReturnbtn.className = 'wrap-btn-start-return'
    wrapperRoadCar.appendChild(wrapperStartReturnbtn)
    const btnStartCar = <HTMLElement>document.createElement('button')
    btnStartCar.className = 'btn-start-car'
    btnStartCar.innerHTML = 'S'
    wrapperStartReturnbtn.appendChild(btnStartCar)
    const btnrReturnCar = <HTMLElement>document.createElement('button')
    btnrReturnCar.className = 'btn-return-car'
    btnrReturnCar.innerHTML = 'R'
    wrapperStartReturnbtn.appendChild(btnrReturnCar)

    const imgAuto = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    imgAuto.innerHTML = imgCar;
    imgAuto.classList.add('car')
    // imgAuto.setAttribute("fill", addColorCar.value)
    const path = <SVGPathElement>imgAuto.querySelector('path')
    path.style.fill = addColorCar.value;
    wrapperStartReturnbtn.appendChild(imgAuto)

    const imgFinishFlag = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    imgFinishFlag.innerHTML = imgFlag;
    imgFinishFlag.classList.add('flag');
    wrapperRoadCar.appendChild(imgFinishFlag)
}

function saveCarInArray() {
    const carName = <HTMLInputElement>document.querySelector(".field-input-creat-car")
    const addColorCar = <HTMLInputElement>document.querySelector(".add-car-color")
    arrayOfCars.push({brend: `${carName.value}`, color: `${addColorCar.value}`})


}
function getCars() {
    fetch("http://127.0.0.1:3000/garage/")
.then(response => response.json())
.then(data => console.log(data))
}
getCars()