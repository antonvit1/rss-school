import {
    contentWrapperToWinner,
    pageNameToWinner,
    pageNumberToWinner,
} from '../main-elements'
import { ExtendedWinner, Winner } from './types'
import { getWinnersAction } from './storeWinners'
import { getCarAction } from '../garage/store'

const tableResults: string[] = [
    'Number',
    'Car',
    'Name',
    'Wins',
    'Best time (seconds)',
]

let page: number = 1
let carWinners: ExtendedWinner[] = []

export function createWinnersTable() {
    const tableResult = document.createElement('table')
    tableResult.className = 'table-result'
    contentWrapperToWinner.appendChild(tableResult)
    const headTr = document.createElement('tr')
    headTr.className = 'tr'
    tableResult.appendChild(headTr)
    for (let i = 0; i < tableResults.length; i++) {
        const th = document.createElement('th')
        th.className = 'th'
        th.innerHTML = tableResults[i]
        headTr.appendChild(th)
    }

}
function lineWinnerTable() {
    const tableResult = <HTMLElement>document.querySelector('.table-result')
    for (let win = 0; win < carWinners.length; win++) {
        const childTr = document.createElement('tr')
        childTr.className = 'tr'
        tableResult.appendChild(childTr)
        for (let key = 0; key < Object.values(carWinners[win]).length; key++) {
            const td = document.createElement('td')
            td.className = 'td'
            td.innerHTML = `${Object.values(carWinners[win])[key]}`
            childTr.appendChild(td)
        }
    }
}

function updateWinnersContent() {
    contentWrapperToWinner.innerHTML = ''
    carWinners = []
}

export async function renderPageWinners() {
    updateWinnersContent()
    const { winners, amountOfWinners } = await getWinnersAction()
    pageNumberToWinner.innerHTML = `Page #${page}`
    pageNameToWinner.innerHTML = `Winners (${amountOfWinners})`
    winners.forEach(async (winner: Winner, index: number) => {
        const dopParamOfWinner = await getCarAction(winner.id)
        const parametrsOfWinner = {
            number: index,
            color: dopParamOfWinner.color,
            name: dopParamOfWinner.name,
            wins: winner.wins,
            time: winner.time,
        }
        carWinners.push(parametrsOfWinner)

    })

    createWinnersTable()
}
