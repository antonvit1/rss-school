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
    'Opel',
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
    'coupe',
]

const body = <HTMLElement>document.querySelector('body')

export const bodyWrapper = <HTMLElement>document.createElement('div')
bodyWrapper.className = 'body-wrapper'
body.append(bodyWrapper)

const header = <HTMLElement>document.createElement('header')
header.className = 'header'
bodyWrapper.append(header)

export const btnToGarage = <HTMLElement>document.createElement('button')
btnToGarage.className = 'button-garage'
btnToGarage.innerHTML = 'To Garage'
header.append(btnToGarage)
export const btnToWinner = <HTMLElement>document.createElement('button')
btnToWinner.className = 'button-winner'
btnToWinner.innerHTML = 'To Winner'
header.append(btnToWinner)

export const headerSection = <HTMLElement>document.createElement('section')
headerSection.className = 'section-create-car'
bodyWrapper.append(headerSection)

const wrapperPageName = <HTMLElement>document.createElement('div')
wrapperPageName.className = 'wrapper-page-name'
bodyWrapper.append(wrapperPageName)

export const pageName = <HTMLElement>document.createElement('div')
pageName.className = 'page-name'
wrapperPageName.append(pageName)
export const pageNumber = <HTMLElement>document.createElement('div')
pageNumber.className = 'page-number'
wrapperPageName.append(pageNumber)

export const pageNameToWinner = <HTMLElement>document.createElement('div')
pageNameToWinner.className = 'page-name-winner'
wrapperPageName.append(pageNameToWinner)
export const pageNumberToWinner = <HTMLElement>document.createElement('div')
pageNumberToWinner.className = 'page-number-winner'
wrapperPageName.append(pageNumberToWinner)

export const contentWrapperToGarage = <HTMLElement>(
    document.createElement('section')
)
contentWrapperToGarage.className = 'section-road'
bodyWrapper.append(contentWrapperToGarage)
export const contentWrapperToWinner = <HTMLElement>(
    document.createElement('section')
)
contentWrapperToWinner.className = 'section-winner'
bodyWrapper.append(contentWrapperToWinner)

const wrapperButtonPreviousNext = <HTMLElement>document.createElement('div')
wrapperButtonPreviousNext.className = 'wrapper-prev-next'
bodyWrapper.append(wrapperButtonPreviousNext)
export const btnPrev = <HTMLElement>document.createElement('button')
btnPrev.className = 'btn-prev'
btnPrev.innerHTML = 'Prev'
wrapperButtonPreviousNext.append(btnPrev)
export const btnNext = <HTMLElement>document.createElement('button')
btnNext.className = 'btn-next'
btnNext.innerHTML = 'Next'
wrapperButtonPreviousNext.append(btnNext)
