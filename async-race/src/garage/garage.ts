import {
    contentWrapperToGarage,
    btnPrev as buttonPrevious,
    btnNext as buttonNext,
    headerSection,
    pageName,
    pageNumber,
    defaultCarBrends,
    defaultCarModels,
} from '../main-elements'
import { renderPageWinners, updateWinnersContent } from '../winners/winners'
import { Car, parametrsOfFinishedCars } from './types'
import {
    addNewCarWithoutGetCarAction,
    addNewCarAction,
    getCarsAction,
    deleteCarAction,
    updateCarAction,
    startCarEngineAction,
    stopCarEngineAction,
    switchEngineToDriveModeAction,
} from './store'
import {
    createWinnerAction,
    deleteWinnerAction,
    getWinnerAction,
    updateWinnerAction,
} from '../winners/storeWinners'
const imgCar = require('!svg-inline-loader?classPrefix!../assets/car.svg')
const imgFlag = require('!svg-inline-loader?classPrefix!../assets/flag.svg')

let arrayOfCars: Car[] = []
export const amountGenerateCarsToBtn = 99
export const amountOfCarOnPage = 7
export let currentPage = +(localStorage.getItem('pageNumber') || 1)
let selectedCarId: number | null = null
let finishedCars: parametrsOfFinishedCars[] = []
let amountOfAllCars: number = 0

export function loadGaragePage() {
    headerSection.innerHTML = ''
    createFormForCreatingCar()
    createFormForUpdatingCar()
    createMainBtns()
    updateGarageContent()
    disabledBtnReturnReset()
}

export function createFormForCreatingCar() {
    const creatingCarForm = <HTMLElement>document.createElement('div')
    creatingCarForm.className = 'creating-car-form'
    headerSection.append(creatingCarForm)
    const inputCarName = <HTMLInputElement>document.createElement('input')
    inputCarName.className = 'field-input-creat-car'
    inputCarName.type = 'text'
    inputCarName.value = localStorage.getItem('inputNameCreate') || ''
    creatingCarForm.append(inputCarName)
    const colorOfCarInput = <HTMLInputElement>document.createElement('input')
    colorOfCarInput.className = 'add-car-color'
    colorOfCarInput.type = 'color'
    colorOfCarInput.value =
        localStorage.getItem('inputColorCreate') || '#000000'
    creatingCarForm.append(colorOfCarInput)
    const buttonCreate = <HTMLElement>document.createElement('button')
    buttonCreate.className = 'button-create-car'
    buttonCreate.innerHTML = 'Create'
    creatingCarForm.append(buttonCreate)

    buttonCreate.addEventListener('click', function () {
        addNewCar(inputCarName.value, colorOfCarInput.value)
        colorOfCarInput.value = '#000000'
        inputCarName.value = ''
    })
}

export function createFormForUpdatingCar() {
    const updatingCarForm = <HTMLElement>document.createElement('div')
    updatingCarForm.className = 'field-update-car'
    headerSection.append(updatingCarForm)
    const inputUpdateCarName = <HTMLInputElement>document.createElement('input')
    inputUpdateCarName.className = 'field-input-update-car'
    inputUpdateCarName.type = 'text'
    inputUpdateCarName.value = localStorage.getItem('updateNameCreate') || ''
    updatingCarForm.append(inputUpdateCarName)
    const carColorUpdateInput = <HTMLInputElement>(
        document.createElement('input')
    )
    carColorUpdateInput.className = 'update-car-color'
    carColorUpdateInput.type = 'color'
    carColorUpdateInput.value =
        localStorage.getItem('updateColorCreate') || '#000000'
    updatingCarForm.append(carColorUpdateInput)
    const buttonUpdate = <HTMLElement>document.createElement('button')
    buttonUpdate.className = 'button-update-car'
    buttonUpdate.innerHTML = 'Update'
    updatingCarForm.append(buttonUpdate)

    buttonUpdate.addEventListener('click', function () {
        if (selectedCarId) {
            updateCar(
                inputUpdateCarName.value,
                carColorUpdateInput.value,
                selectedCarId
            )
            selectedCarId = null
            carColorUpdateInput.value = '#000000'
            inputUpdateCarName.value = ''
        }
    })
}

export function createMainBtns() {
    const btnsWrapper = <HTMLElement>document.createElement('div')
    btnsWrapper.className = 'btns-race-reset-generate'
    headerSection.append(btnsWrapper)
    const buttonStartRace = <HTMLElement>document.createElement('button')
    buttonStartRace.className = 'btn-race'
    buttonStartRace.innerHTML = 'Race'
    btnsWrapper.append(buttonStartRace)
    const buttonReset = <HTMLElement>document.createElement('button')
    buttonReset.className = 'btn-reset'
    buttonReset.innerHTML = 'Reset'
    btnsWrapper.append(buttonReset)
    const buttonGenerateCars = <HTMLElement>document.createElement('button')
    buttonGenerateCars.className = 'btn-generate-cars'
    buttonGenerateCars.innerHTML = 'Generate Cars'
    btnsWrapper.append(buttonGenerateCars)
    buttonGenerateCars.addEventListener('click', function () {
        for (let index = 0; index <= amountGenerateCarsToBtn; index++) {
            addNewCarWithoutGetCarAction(
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
    createEventPressButton(buttonStartRace, buttonReset)
}
function createEventPressButton(
    buttonStartRace: HTMLElement,
    buttonReset: HTMLElement
) {
    buttonStartRace.addEventListener('click', function () {
        const btnsStartCar = [...document.querySelectorAll('.btn-start-car')]

        arrayOfCars.forEach(async (car) => {
            await startEngineOfCar(car.id)
        })
        buttonReset.removeAttribute('disabled')
        buttonStartRace.setAttribute('disabled', 'true')
        for (const element of btnsStartCar) {
            element.setAttribute('disabled', 'true')
        }

        unDisabledBtnReturnReset()
    })
    buttonReset.addEventListener('click', function () {
        finishedCars = []
        const btnsStartCar = [...document.querySelectorAll('.btn-start-car')]
        setInterval(function () {
            buttonStartRace.removeAttribute('disabled')
        }, 1300)
        for (const car of arrayOfCars) {
            stopCarEngine(car.id)
            for (const element of btnsStartCar) {
                element.removeAttribute('disabled')
            }
        }
        removeWinMessage()
    })
}

function createSectionForCar(car: Car) {
    const wrapperCar = <HTMLElement>document.createElement('div')
    wrapperCar.className = 'wrapper-car'
    wrapperCar.id = `car-${car.id}`
    contentWrapperToGarage.append(wrapperCar)
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
    wrapperCar.append(wrapperCarButton)
    const buttonSelect = <HTMLElement>document.createElement('button')
    buttonSelect.className = 'btn-select'
    buttonSelect.innerHTML = 'Select'
    wrapperCarButton.append(buttonSelect)
    const buttonRemove = <HTMLElement>document.createElement('button')
    buttonRemove.className = 'btn-remove'
    buttonRemove.innerHTML = 'Remove'
    wrapperCarButton.append(buttonRemove)

    buttonRemove.addEventListener('click', function () {
        deleteCar(car.id)

    })
    buttonSelect.addEventListener('click', function () {
        inputUpdateCarName.value = car.name
        carColorUpdateInput.value = car.color
        selectedCarId = car.id
    })
}
function createBtnsStartStopCarName(car: Car, wrapperCar: HTMLElement) {
    const wrapperStartReturnbtns = <HTMLElement>document.createElement('div')
    wrapperStartReturnbtns.className = 'wrap-btn-start-return'
    wrapperCar.append(wrapperStartReturnbtns)
    const buttonStartCar = <HTMLElement>document.createElement('button')
    buttonStartCar.className = 'btn-start-car'
    buttonStartCar.innerHTML = 'Start'
    wrapperStartReturnbtns.append(buttonStartCar)
    const buttonReturnCar = <HTMLElement>document.createElement('button')
    buttonReturnCar.className = 'btn-return-car'
    buttonReturnCar.innerHTML = 'Return'
    buttonReturnCar?.setAttribute('disabled', 'true')
    wrapperStartReturnbtns.append(buttonReturnCar)
    const carName = <HTMLElement>document.createElement('div')
    carName.className = 'car-name'
    carName.innerHTML = car.name
    wrapperStartReturnbtns.append(carName)

    buttonStartCar.addEventListener('click', function () {
        startEngineOfCar(car.id)
        buttonStartCar?.setAttribute('disabled', '')
        buttonReturnCar?.removeAttribute('disabled')
    })
    buttonReturnCar.addEventListener('click', function () {
        stopCarEngine(car.id)
        buttonStartCar?.removeAttribute('disabled')
        removeWinMessage()
        buttonReturnCar?.setAttribute('disabled', 'true')
    })
}

export function createNewCar(car: Car, wrapperCar: HTMLElement) {
    const wrapperCarFlag = <HTMLElement>document.createElement('div')
    wrapperCarFlag.className = 'wrapper-btn-car-flag'
    wrapperCar.append(wrapperCarFlag)
    const wrapperRoadCar = <HTMLElement>document.createElement('div')
    wrapperRoadCar.className = 'wrapper-road-car'
    wrapperCarFlag.append(wrapperRoadCar)
    const wrapperSvgCar = <HTMLElement>document.createElement('div')
    wrapperSvgCar.className = 'wrapper-svg-car'
    wrapperCarFlag.append(wrapperSvgCar)
    const imgAuto = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    imgAuto.innerHTML = imgCar
    imgAuto.classList.add('car')
    const path = <SVGPathElement>imgAuto.querySelector('path')
    path.style.fill = car.color
    wrapperSvgCar.append(imgAuto)

    const imgFinishFlag = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    imgFinishFlag.innerHTML = imgFlag
    imgFinishFlag.classList.add('flag')
    wrapperRoadCar.append(imgFinishFlag)
}

export async function updateGarageContent() {
    contentWrapperToGarage.innerHTML = ''
    arrayOfCars = []

    await renderCars()
}

function startCarAnimation(id: number | null, distance: number, speed: number) {
    const wrapperCar = <HTMLElement>document.querySelector(`#car-${id}`)
    const wrapperSvgCar = <HTMLElement>(
        wrapperCar.querySelector('.wrapper-svg-car')
    )
    let isEngineWorking = true
    switchEngineToDriveModeAction(id).then((status: boolean) => {
        isEngineWorking = status
    })
    const lengthOfRoadInPercent = 88
    const procentTime = 0.01
    const startTime: number = Date.now()
    const timer = setInterval(function () {
        if (!isEngineWorking) {
            clearInterval(timer)
            return
        }
        const timePassed: number = Date.now() - startTime
        if (timePassed / ((distance / speed) * procentTime) >=
            lengthOfRoadInPercent
        ) {
            if (id) {
                finishedCars.push({ id, time: distance / speed })
                determineOFWinner()
            }
            if (finishedCars.length === 1) {
                createMessageAboutWinner(id, +(Math.floor((distance / speed) * 0.1) * 0.01).toFixed(2))
            }
            clearInterval(timer)
            const buttonReset = <HTMLElement>(
                document.querySelector('.btn-reset')
            )
            buttonReset?.removeAttribute('disabled')
            return
        }
        draw(timePassed)
    }, 0)
    function draw(timePassed: number) {
        wrapperSvgCar.style.left =
            timePassed / ((distance / speed) * procentTime) + 'vw'
    }
}

function createMessageAboutWinner(id: number | null, time: number) {
    const car = arrayOfCars.find((auto) => auto.id === id)
    const messageWin = <HTMLElement>document.createElement('div')
    messageWin.className = 'message-win'
    messageWin.innerHTML = `${car?.name} won with time ${time}`
    contentWrapperToGarage.appendChild(messageWin)
}
function removeWinMessage() {
    const messageWin = <HTMLElement>document.querySelector('.message-win')
    if (messageWin) {
        messageWin.remove()
    }
}
function disabledBtnReturnReset() {
    const btnsReturn = [...document.querySelectorAll('.btn-return-car')]
    for (const element of btnsReturn) {
        element.setAttribute('disabled', 'true')
    }
    const btnReset = <HTMLElement>document.querySelector('.btn-reset')
    btnReset.setAttribute('disabled', 'true')
}
function unDisabledBtnReturnReset() {
    const btnsReturn = [...document.querySelectorAll('.btn-return-car')]
    const btnReset = <HTMLElement>document.querySelector('.btn-reset')
    btnReset.removeAttribute('disabled')

    for (const element of btnsReturn) {
        element.removeAttribute('disabled')
    }
}

async function determineOFWinner() {
    if (finishedCars.length === 1) {
        const existedWinner = await getWinnerAction(finishedCars[0].id)

        if (existedWinner.id) {
            const bestTime =
                finishedCars[0].time < existedWinner.time
                    ? finishedCars[0].time
                    : existedWinner.time

            await updateWinnerAction(
                finishedCars[0].id,
                existedWinner.wins + 1,
                bestTime
            )
        } else {
            await createWinnerAction(
                finishedCars[0].id,
                1,
                finishedCars[0].time
            )
        }
    }
}

async function renderCars() {
    const { cars, amountOfCars } = await getCarsAction(
        amountOfCarOnPage,
        currentPage
    )
    if (amountOfCars) {
        amountOfAllCars = +amountOfCars
    }
    pageNumber.innerHTML = `Page #${currentPage}`
    pageName.innerHTML = `Garage (${amountOfCars})`
    cars.forEach((car: Car) => {
        createSectionForCar(car)
        arrayOfCars.push(car)
    })
}

async function addNewCar(carName: string, color: string) {
    await addNewCarAction(carName, color)
    updateGarageContent()
}

async function deleteCar(id: number) {
    await deleteCarAction(id)
    await deleteWinnerAction(id)
    updateGarageContent()
    updateWinnersContent()
}

async function updateCar(carName: string, color: string, id: number) {
    await updateCarAction(carName, color, id)
    updateGarageContent()
}

async function startEngineOfCar(id: number) {
    const parametrs = await startCarEngineAction(id)
    startCarAnimation(id, parametrs.distance, parametrs.velocity)
}

async function stopCarEngine(id: number) {
    const parametrs = await stopCarEngineAction(id)
    const wrapperCar = <HTMLElement>document.querySelector(`#car-${id}`)
    const wrapperSvgCar = <HTMLElement>(
        wrapperCar.querySelector('.wrapper-svg-car')
    )
    wrapperSvgCar.style.left = `${parametrs.velocity}`
}

buttonPrevious.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage -= 1
        updateGarageContent()
    }
})
buttonNext.addEventListener('click', function () {
    if (currentPage + 1 < amountOfAllCars / 7) {
        currentPage += 1
        updateGarageContent()
    }
})
export function saveInLocalStorageGarage() {
    const inputNameCreate = <HTMLInputElement>(
        document.querySelector('.field-input-creat-car')
    )
    const inputColorCreate = <HTMLInputElement>(
        document.querySelector('.add-car-color')
    )
    const updateNameCreate = <HTMLInputElement>(
        document.querySelector('.field-input-update-car')
    )
    const updateColorCreate = <HTMLInputElement>(
        document.querySelector('.update-car-color')
    )
    localStorage.setItem('pageNumber', String(currentPage))
    localStorage.setItem('inputNameCreate', inputNameCreate?.value || '')
    localStorage.setItem('inputColorCreate', inputColorCreate?.value || "")
    localStorage.setItem('updateNameCreate', updateNameCreate?.value || '')
    localStorage.setItem('updateColorCreate', updateColorCreate?.value || '')
}
window.addEventListener('beforeunload', function () {
    saveInLocalStorageGarage()
})
