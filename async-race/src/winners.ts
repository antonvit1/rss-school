import { fieldRoad } from './main-elements'
const tableResults: string[] = [
    'Number',
    'Car',
    'Name',
    'Wins',
    'Best time (seconds)',
]
let tr
let td
let th
let tableResult
export function createTablewinnersResult() {
    tableResult = document.createElement('table')
    tableResult.className = 'table-result'
    fieldRoad.appendChild(tableResult)
    for (let i = 0; i < tableResults.length; i++) {
        td = document.createElement('td')
        td.className = 'td'
        tableResult.appendChild(td)
        th = document.createElement('th')
        th.className = 'th'
        th.innerHTML = tableResults[i]
        td.appendChild(th)
        for (let k = 0; k < tableResults.length; k++) {
            tr = document.createElement('tr')
            tr.className = 'tr'
            tr.innerHTML = 'a'
            td.appendChild(tr)
        }
    }
}
