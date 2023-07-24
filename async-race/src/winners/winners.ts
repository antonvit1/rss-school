import {
    contentWrapperToWinner,
    pageNameToWinner,
    pageNumberToWinner,
} from '../main-elements'
import { ExtendedWinner, Winner, WinnerKey } from './types'
import { getWinnersAction } from './storeWinners'
import { getCarAction } from '../garage/store'
const imgCarInTable = require('!svg-inline-loader?classPrefix!../assets/car.svg')

const tableResults: string[] = [
    'Number',
    'Car',
    'Name',
    'Wins',
    'Best time (seconds)',
]

const page = 1
let carWinners: ExtendedWinner[] = []

export function createWinnersTable() {
    const tableResult = document.createElement('table')
    tableResult.className = 'table-result'
    contentWrapperToWinner.append(tableResult)
    const headTr = document.createElement('tr')
    headTr.className = 'tr'
    tableResult.append(headTr)
    for (const tableResult_ of tableResults) {
        const th = document.createElement('th')
        th.className = 'th'
        th.innerHTML = tableResult_
        headTr.append(th)
    }
}
function createRowOfWinnerTable(winner: ExtendedWinner) {
    console.log(winner)
    const tableResult = <HTMLElement>document.querySelector('.table-result')
    const childTr = document.createElement('tr')
    childTr.className = 'tr'
    tableResult.append(childTr)
    const keys = Object.keys(winner)
    console.log(keys)

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

function updateWinnersContent() {
    contentWrapperToWinner.innerHTML = ''
    carWinners = []
}

export async function renderPageWinners() {
    updateWinnersContent()
    createWinnersTable()
    const { winners, amountOfWinners } = await getWinnersAction(page)
    pageNumberToWinner.innerHTML = `Page #${page}`
    pageNameToWinner.innerHTML = `Winners (${amountOfWinners})`
    winners.forEach(async (winner: Winner, index: number) => {
        const dopParameterOfWinner = await getCarAction(winner.id)
        const parametrsOfWinner = {
            number: index,
            color: dopParameterOfWinner.color,
            name: dopParameterOfWinner.name,
            wins: winner.wins,
            time: Math.floor(winner.time * 0.1) * 0.01,
        }
        createRowOfWinnerTable(parametrsOfWinner)
        carWinners.push(parametrsOfWinner)
    })
    console.log(carWinners)
}
