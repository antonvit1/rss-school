import {
    contentWrapperToWinner,
    pageNameToWinner,
    pageNumberToWinner,
    buttonPreviousWinners,
    buttonNextWinner,
} from '../main-elements'
import { ExtendedWinner, Winner, WinnerKey } from './types'
import { getWinnersAction } from './store-winners'
import { getCarAction } from '../garage/store'
import imgCarInTable from '!svg-inline-loader?classPrefix!../assets/car.svg'

const tableResults: string[] = [
    'Id',
    'Car',
    'Name',
    'Wins',
    'Best time (seconds)',
]

let page = +(localStorage.getItem('pageNumber') || 1)
let sort = localStorage.getItem('sort') || 'id'
let order = localStorage.getItem('order') || 'ASC'
let carWinners: ExtendedWinner[] = []
let amountOfAllWinners = 0

export function createWinnersTable() {
    const tableResult = document.createElement('table')
    tableResult.className = 'table-result'
    contentWrapperToWinner.append(tableResult)
    const headTr = document.createElement('tr')
    headTr.className = 'tr'
    tableResult.append(headTr)
    for (const lineResult of tableResults) {
        const th = document.createElement('th')
        th.className = 'th'
        th.innerHTML = lineResult
        headTr.append(th)
        if (th.innerHTML === 'Wins') {
            createSortingButton(th, '↑', 'wins', 'ASC')
            createSortingButton(th, '↓', 'wins', 'DESC')
        }
        if (th.innerHTML === 'Best time (seconds)') {
            createSortingButton(th, '↑', 'time', 'ASC')
            createSortingButton(th, '↓', 'time', 'DESC')
        }
        if (th.innerHTML === 'Id') {
            createSortingButton(th, '↑', 'id', 'ASC')
            createSortingButton(th, '↓', 'id', 'DESC')
        }
    }
}
function createRowOfWinnerTable(winner: ExtendedWinner) {
    const tableResult = <HTMLElement>document.querySelector('.table-result')
    const childTr = document.createElement('tr')
    childTr.className = 'tr'
    tableResult.append(childTr)
    const keys = Object.keys(winner)

    for (const key of keys) {
        const td = document.createElement('td')
        td.className = 'td'
        if (key === 'color') {
            createImgCar(winner, td)
        } else {
            td.innerHTML = `${winner[key as WinnerKey]}`
        }
        childTr.append(td)
    }
}

function createImgCar(winner: ExtendedWinner, td: HTMLElement) {
    const wrapperTableSvgCar = <HTMLElement>document.createElement('div')
    wrapperTableSvgCar.className = 'wrapper-svg-car-table'
    td.append(wrapperTableSvgCar)
    const imgAutoinTable = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    imgAutoinTable.innerHTML = imgCarInTable
    imgAutoinTable.classList.add('car-table')
    const path = <SVGPathElement>imgAutoinTable.querySelector('path')
    path.style.fill = winner.color
    wrapperTableSvgCar.append(imgAutoinTable)
}

export function updateWinnersContent() {
    contentWrapperToWinner.innerHTML = ''
    carWinners = []
}

export async function renderPageWinners() {
    updateWinnersContent()
    createWinnersTable()
    const parametrs = await getWinnersAction(page, sort, order)
    if (parametrs) {
        pageNumberToWinner.innerHTML = `Page #${page}`
        pageNameToWinner.innerHTML = `Winners (${parametrs.amountOfWinners})`
        if (parametrs.amountOfWinners) {
            amountOfAllWinners = +parametrs.amountOfWinners
        }
        parametrs.winners.forEach(async (winner: Winner) => {
            const dopParameterOfWinner = await getCarAction(winner.id)
            const parametrsOfWinner = {
                id: winner.id,
                number: winner.id,
                color: dopParameterOfWinner.color,
                name: dopParameterOfWinner.name,
                wins: winner.wins,
                time: +(Math.floor(winner.time * 0.1) * 0.01).toFixed(2),
            }
            createRowOfWinnerTable(parametrsOfWinner)
            carWinners.push(parametrsOfWinner)
        })
    }
}

function createSortingButton(
    th: HTMLElement,
    text: string,
    sortArgument: string,
    orderArgument: string
) {
    const button = <HTMLElement>document.createElement('button')
    button.className = 'button-sort'
    button.innerHTML = text
    th.append(button)
    button.addEventListener('click', function () {
        sort = sortArgument
        order = orderArgument
        renderPageWinners()
    })
}

buttonPreviousWinners.addEventListener('click', function () {
    if (page > 1) {
        page -= 1
        renderPageWinners()
    }
})
buttonNextWinner.addEventListener('click', function () {
    if (page < amountOfAllWinners / 10) {
        page += 1
        renderPageWinners()
    }
})

function saveInLocalStorageWinners() {
    localStorage.setItem('pageNumber', String(page))
    localStorage.setItem('sort', sort)
    localStorage.setItem('order', order)
}
window.addEventListener('beforeunload', function () {
    saveInLocalStorageWinners()
})
