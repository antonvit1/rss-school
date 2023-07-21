import {
    contentWrapperToGarage,
    btnPrev,
    btnNext,
    headerSection,
    pageName,
    pageNumber,
    defaultCarBrends,
    defaultCarModels,
} from './main-elements'
import { createTablewinnersResult } from './winners'
import { Car } from './types'

const imgCar = require('!svg-inline-loader?classPrefix!./assets/car.svg')
const imgFlag = require('!svg-inline-loader?classPrefix!./assets/flag.svg')

const arrayOfCars: Car[] = []
const amountGenerateCarsToBtn: number = 99
const amountOfCarOnPage: number = 7
let currentPage: number = 1
let selectedCarId: number | null = null

// let amountAllCars: number = 0

loadGaragePage()

function loadGaragePage() {
    createFormForCreatingCar()
    createFormForUpdatingCar()
    createMainBtns()
    getCars()
    createTablewinnersResult()
    pageNumber.innerHTML = `Page#${currentPage}`
}

export function createFormForCreatingCar() {
    const creatingCarForm = <HTMLElement>document.createElement('div')
    creatingCarForm.className = 'creating-car-form'
    headerSection.appendChild(creatingCarForm)
    const inputCarName = <HTMLInputElement>document.createElement('input')
    inputCarName.className = 'field-input-creat-car'
    inputCarName.type = 'text'
    creatingCarForm.appendChild(inputCarName)
    const colorOfCarInput = <HTMLInputElement>document.createElement('input')
    colorOfCarInput.className = 'add-car-color'
    colorOfCarInput.type = 'color'
    creatingCarForm.appendChild(colorOfCarInput)
    const btnCreate = <HTMLElement>document.createElement('button')
    btnCreate.className = 'button-create-car'
    btnCreate.innerHTML = 'Create'
    creatingCarForm.appendChild(btnCreate)

    btnCreate.addEventListener('click', function () {
        addNewCar(inputCarName.value, colorOfCarInput.value)
    })
}

export function createFormForUpdatingCar() {
    const updatingCarForm = <HTMLElement>document.createElement('div')
    updatingCarForm.className = 'field-update-car'
    headerSection.appendChild(updatingCarForm)
    const inputUpdateCarName = <HTMLInputElement>document.createElement('input')
    inputUpdateCarName.className = 'field-input-update-car'
    inputUpdateCarName.type = 'text'
    updatingCarForm.appendChild(inputUpdateCarName)
    const carColorUpdateInput = <HTMLInputElement>(
        document.createElement('input')
    )
    carColorUpdateInput.className = 'update-car-color'
    carColorUpdateInput.type = 'color'
    updatingCarForm.appendChild(carColorUpdateInput)
    const btnUpdate = <HTMLElement>document.createElement('button')
    btnUpdate.className = 'button-update-car'
    btnUpdate.innerHTML = 'Update'
    updatingCarForm.appendChild(btnUpdate)

    btnUpdate.addEventListener('click', function () {
        if (selectedCarId) {
            updateCar(
                inputUpdateCarName.value,
                carColorUpdateInput.value,
                selectedCarId
            )
            selectedCarId = null
        }
    })
}

export function createMainBtns() {
    const btnsWrapper = <HTMLElement>document.createElement('div')
    btnsWrapper.className = 'btns-race-reset-generate'
    headerSection.appendChild(btnsWrapper)
    const btnStartRace = <HTMLElement>document.createElement('button')
    btnStartRace.className = 'btn-race'
    btnStartRace.innerHTML = 'Race'
    btnsWrapper.appendChild(btnStartRace)
    const btnReset = <HTMLElement>document.createElement('button')
    btnReset.className = 'btn-reset'
    btnReset.innerHTML = 'Reset'
    btnsWrapper.appendChild(btnReset)
    const btnGenerateCars = <HTMLElement>document.createElement('button')
    btnGenerateCars.className = 'btn-generate-cars'
    btnGenerateCars.innerHTML = 'Generate Cars'
    btnsWrapper.appendChild(btnGenerateCars)
    btnGenerateCars.addEventListener('click', function () {
        for (let i = 0; i <= amountGenerateCarsToBtn; i++) {
            addNewCarWithoutGetCar(
                `${
                    defaultCarBrends[
                        Math.round(Math.random() * defaultCarBrends.length)
                    ]
                } ${
                    defaultCarModels[
                        Math.round(Math.random() * defaultCarBrends.length)
                    ]
                }`,
                `#${Math.random().toString(16).slice(3, 9)}`
            )
        }
        updateGarageContent()
    })
    const btnStartCar = <HTMLElement>document.querySelector('.btn-start-car')
    btnStartRace.addEventListener('click', function () {
        arrayOfCars.forEach((car) => {
            startCarEngine(car.id)
            // btnStartCar.setAttribute('disabled', '')
        })
    })
    btnReset.addEventListener('click', function () {
        arrayOfCars.forEach((car) => {
            stopCarEngine(car.id)
            // btnStartCar.removeAttribute('disabled')
        })
    })
}

function createSectionForCar(car: Car) {
    const wrapperCar = <HTMLElement>document.createElement('div')
    wrapperCar.className = 'wrapper-car'
    wrapperCar.id = `car-${car.id}`
    contentWrapperToGarage.appendChild(wrapperCar)
    createButtonsForCar(wrapperCar, car)
    createBtnsStartStopCarName(car, wrapperCar)
    createNewCar(car, wrapperCar)
}

function createButtonsForCar(wrapperCar: HTMLElement, car: Car) {
    const carColorUpdateInput = <HTMLInputElement>(
        document.querySelector('.update-car-color')
    )
    const inputUpdateCarName = <HTMLInputElement>(
        document.querySelector('.field-input-update-car')
    )
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

    btnRemove.addEventListener('click', function () {
        deleteCar(car.id)
    })
    btnSelect.addEventListener('click', function () {
        inputUpdateCarName.value = car.name
        carColorUpdateInput.value = car.color
        selectedCarId = car.id
    })
}
function createBtnsStartStopCarName(car: Car, wrapperCar: HTMLElement) {
    const wrapperStartReturnbtns = <HTMLElement>document.createElement('div')
    wrapperStartReturnbtns.className = 'wrap-btn-start-return'
    wrapperCar.appendChild(wrapperStartReturnbtns)
    const btnStartCar = <HTMLElement>document.createElement('button')
    btnStartCar.className = 'btn-start-car'
    btnStartCar.innerHTML = 'Start'
    wrapperStartReturnbtns.appendChild(btnStartCar)
    const btnReturnCar = <HTMLElement>document.createElement('button')
    btnReturnCar.className = 'btn-return-car'
    btnReturnCar.innerHTML = 'Return'
    wrapperStartReturnbtns.appendChild(btnReturnCar)
    const carName = <HTMLElement>document.createElement('div')
    carName.className = 'car-name'
    carName.innerHTML = car.name + ` ${car.id}`
    wrapperStartReturnbtns.appendChild(carName)

    btnStartCar.addEventListener('click', function () {
        startCarEngine(car.id)
        btnStartCar.setAttribute('disabled', '')
    })
    btnReturnCar.addEventListener('click', function () {
        stopCarEngine(car.id)
        btnStartCar.removeAttribute('disabled')
    })
}

export function createNewCar(car: Car, wrapperCar: HTMLElement) {
    const wrapperCarFlag = <HTMLElement>document.createElement('div')
    wrapperCarFlag.className = 'wrapper-btn-car-flag'
    wrapperCar.appendChild(wrapperCarFlag)
    const wrapperRoadCar = <HTMLElement>document.createElement('div')
    wrapperRoadCar.className = 'wrapper-road-car'
    wrapperCarFlag.appendChild(wrapperRoadCar)
    const wrapperSvgCar = <HTMLElement>document.createElement('div')
    wrapperSvgCar.className = 'wrapper-svg-car'
    wrapperCarFlag.appendChild(wrapperSvgCar)
    const imgAuto = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    imgAuto.innerHTML = imgCar
    imgAuto.classList.add('car')
    const path = <SVGPathElement>imgAuto.querySelector('path')
    path.style.fill = car.color
    wrapperSvgCar.appendChild(imgAuto)

    const imgFinishFlag = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    imgFinishFlag.innerHTML = imgFlag
    imgFinishFlag.classList.add('flag')
    wrapperRoadCar.appendChild(imgFinishFlag)
}

function updateGarageContent() {
    contentWrapperToGarage.innerHTML = ''
    getCars()
}
async function addNewCarWithoutGetCar(carName: string, color: string) {
    const response = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        body: JSON.stringify({ name: carName, color: color }),
        headers: { 'Content-Type': 'application/json' },
    })
}
async function addNewCar(carName: string, color: string) {
    const response = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        body: JSON.stringify({ name: carName, color: color }),
        headers: { 'Content-Type': 'application/json' },
    })
    updateGarageContent()
}

async function getCars() {
    const response = await fetch(
        `http://127.0.0.1:3000/garage/?_limit=${amountOfCarOnPage}&_page=${currentPage}`
    )
    const cars: Car[] = await response.json()
    pageNumber.innerHTML = `Page #${currentPage}`
    pageName.innerHTML = `Garage (${response.headers.get('X-Total-Count')})`
    cars.forEach((car: Car) => {
        createSectionForCar(car)
        arrayOfCars.push(car)
    })
}

async function deleteCar(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
    })
    updateGarageContent()
}

async function updateCar(carName: string, color: string, id: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: carName, color: color }),
        headers: { 'Content-Type': 'application/json' },
    })
    updateGarageContent()
}

async function startCarEngine(id: number | null) {
    const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=started`,
        {
            method: 'PATCH',
        }
    )
    const parametrsOfCar = await response.json()
    console.log(
        parametrsOfCar.velocity,
        parametrsOfCar.distance,
        Math.floor((parametrsOfCar.distance / parametrsOfCar.velocity) * 0.1) *
            0.01
    )
    startCarAnimation(id, parametrsOfCar.distance, parametrsOfCar.velocity)

}



 function startCarAnimation(id: number | null, distance: number, speed: number ) {
    const wrapperCar = <HTMLElement>document.querySelector(`#car-${id}`)
    const wrapperSvgCar = <HTMLElement>(
        wrapperCar.querySelector('.wrapper-svg-car')
    )

    let isEngineWorking = true
     switchEngineToDriveMode(id).then((status: boolean) => {

        isEngineWorking = status
     } )

    let lengthOfRoadInPercent: number = 83
    const procentTime: number = 0.01
    let startTime: number = Date.now()

    let timer = setInterval(function () {
        if(!isEngineWorking) {
            clearInterval(timer)
            return
        }
        let timePassed: number = Date.now() - startTime
        if (
            timePassed / ((distance / speed) * procentTime) >=
            lengthOfRoadInPercent
        ) {
            clearInterval(timer)
            return
        }
        draw(timePassed)


    }, 0)
    function draw(timePassed: number) {
        wrapperSvgCar.style.left =
            timePassed / ((distance / speed) * procentTime) + '%'
               }
}

async function stopCarEngine(id: number) {
    const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=stopped`,
        {
            method: 'PATCH',
        }
    )
    const parametrsOfCar = await response.json()
    console.log(parametrsOfCar)

    const wrapperCar = <HTMLElement>document.querySelector(`#car-${id}`)
    const wrapperSvgCar = <HTMLElement>(
        wrapperCar.querySelector('.wrapper-svg-car')
    )
    wrapperSvgCar.style.left = '0'
}

async function switchEngineToDriveMode(id: number | null) {
    try{
    const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
        {
            method: 'PATCH',
        }
    )
        const success = await response.json()
        console.log(success)
        return true
    } catch(e: any) {
        console.log("false");

      return false
           }
    }

    async function getWinners (id: number | null, car: Car) {
const response = await fetch(`http://127.0.0.1:3000/winners`,
     {
        method: "GET"
     }
     )
     const parametrs = await response.json()
     console.log(parametrs);

    }
    async function getWinner(id: number | null, car: Car) {
        const response = await fetch(`http://127.0.0.1:3000/winners/${id}`,
             {
                method: "GET"
             }
             )
             const parametrs = await response.json()
             console.log(parametrs);

            }


btnPrev.addEventListener('click', function () {
    if (currentPage - 1) {
        currentPage -= 1
        updateGarageContent()
    }
})
btnNext.addEventListener('click', function () {
    if (currentPage + 1) {
        currentPage += 1
        updateGarageContent()
    }
})
