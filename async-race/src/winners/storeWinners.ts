import { Winner } from './types'

export async function getWinnersAction() {
    const response = await fetch(`http://127.0.0.1:3000/winners`, {
        method: 'GET',
    })
    const winners = await response.json()

    return { winners: winners, amountOfWinners: response.headers.get('X-Total-Count') }
}
export async function getWinnerAction(id: number | null) {
    try {


    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'GET',
    })
    const winner = await response.json()

    return winner
} catch (e) {
    return null
}
}
export async function createWinnerAction(id: number | null, wins: number, time: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners`, {
        method: 'POST',
        body: JSON.stringify({ id, wins, time }),
        headers: { 'Content-Type': 'application/json' },
    })
    const parametrs = await response.json()
}
export async function updateWinnerAction (id: number, wins: number, time: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, wins, time }),
        headers: { 'Content-Type': 'application/json' },
    })

}