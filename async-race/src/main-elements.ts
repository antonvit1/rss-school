const defaulCarBrends: string[] = [
    'Audi',
    'BMW',
    'Ford',
    'Tesla',
    'Hyundai',
    'Ferrari',
    'Mini',
    'Reno',
    'Saab',
    'Toyota',
    'Suzuki',
    'Kia',
    'Porshe',
]
const defaultCarModels: string[] = [
    '3',
    '5',
    '7',
    'model E',
    'A6',
    '911',
    'tucson',
    'i30',
    'mustang',
    'couper',
    'F150',
    'logan',
    'M8',
]

const body = <HTMLElement>document.querySelector('body')

export const bodyWrapper = <HTMLElement>document.createElement('div')
bodyWrapper.className = 'body-wrapper'
body.appendChild(bodyWrapper)

const header = <HTMLElement>document.createElement('header')
header.className = 'header'
bodyWrapper.appendChild(header)

export const btnToGarage = <HTMLElement>document.createElement('button')
btnToGarage.className = 'button-garage'
btnToGarage.innerHTML = 'To Garage'
header.appendChild(btnToGarage)
export const btnToWinner = <HTMLElement>document.createElement('button')
btnToWinner.className = 'button-winner'
btnToWinner.innerHTML = 'To Winner'
header.appendChild(btnToWinner)

export const sectionCreateCar = <HTMLElement>document.createElement('section')
sectionCreateCar.className = 'section-create-car'
bodyWrapper.appendChild(sectionCreateCar)

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

export const fieldRoad = <HTMLElement>document.createElement('section')
fieldRoad.className = 'field-road'
bodyWrapper.appendChild(fieldRoad)

const wrapperBtnPrevNext = <HTMLElement>document.createElement('div')
wrapperBtnPrevNext.className = 'wrapper-prev-next'
bodyWrapper.appendChild(wrapperBtnPrevNext)
const btnPrev = <HTMLElement>document.createElement('button')
btnPrev.className = 'btn-prev'
btnPrev.innerHTML = 'Prev'
wrapperBtnPrevNext.appendChild(btnPrev)
const btnNext = <HTMLElement>document.createElement('button')
btnNext.className = 'btn-next'
btnNext.innerHTML = 'Next'
wrapperBtnPrevNext.appendChild(btnNext)
