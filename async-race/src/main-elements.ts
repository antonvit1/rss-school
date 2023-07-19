export const defaultCarBrends: string[] = [
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
    "Opel"
]
export const defaultCarModels: string[] = [
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
    "coupe"
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

export const headerSection = <HTMLElement>document.createElement('section')
headerSection.className = 'section-create-car'
bodyWrapper.appendChild(headerSection)

const wrapperPageName = <HTMLElement>document.createElement('div')
wrapperPageName.className = 'wrapper-page-name'
bodyWrapper.appendChild(wrapperPageName)

export const pageName = <HTMLElement>document.createElement('div')
pageName.className = 'page-name'
wrapperPageName.appendChild(pageName)
export const pageNumber = <HTMLElement>document.createElement('div')
pageNumber.className = 'page-number'
wrapperPageName.appendChild(pageNumber)

export const contentWrapperToGarage = <HTMLElement>document.createElement('section')
contentWrapperToGarage.className = 'section-road'
bodyWrapper.appendChild(contentWrapperToGarage)
export const contentWrapperToWinner = <HTMLElement>document.createElement('section')
contentWrapperToWinner.className = 'section-winner'
bodyWrapper.appendChild(contentWrapperToWinner)

const wrapperBtnPrevNext = <HTMLElement>document.createElement('div')
wrapperBtnPrevNext.className = 'wrapper-prev-next'
bodyWrapper.appendChild(wrapperBtnPrevNext)
export const btnPrev = <HTMLElement>document.createElement('button')
btnPrev.className = 'btn-prev'
btnPrev.innerHTML = 'Prev'
wrapperBtnPrevNext.appendChild(btnPrev)
export const btnNext = <HTMLElement>document.createElement('button')
btnNext.className = 'btn-next'
btnNext.innerHTML = 'Next'
wrapperBtnPrevNext.appendChild(btnNext)
