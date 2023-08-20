import { Winner } from './types'

export async function getWinnersAction(
    page: number,
    sort: string,
    order: string
): Promise<{ winners: Winner[]; amountOfWinners: string | null } | undefined> {
    try {
        const response = await fetch(
            `http://127.0.0.1:3000/winners?_limit=10&_page=${page}&_sort=${sort}&_order=${order}`,
            {
                method: 'GET',
            }
        )
        const winners = await response.json()
        return {
            winners: winners,
            amountOfWinners: response.headers.get('X-Total-Count'),
        }
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
}

export async function getWinnerAction(id: number | null) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
            method: 'GET',
        })
        const winner = await response.json()

        return winner
    } catch (error) {
        console.log(error)
    }
}
export async function createWinnerAction(
    id: number | null,
    wins: number,
    time: number
): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners`, {
        method: 'POST',
        body: JSON.stringify({ id, wins, time }),
        headers: { 'Content-Type': 'application/json' },
    })
}
export async function updateWinnerAction(
    id: number,
    wins: number,
    time: number
): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, wins, time }),
        headers: { 'Content-Type': 'application/json' },
    })
}
export async function deleteWinnerAction(id: number): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'DELETE',
    })
}
