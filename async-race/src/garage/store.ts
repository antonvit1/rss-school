import { Car } from './types'

export async function addNewCarWithoutGetCarAction(
    carName: string,
    color: string
) {
    await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        body: JSON.stringify({ name: carName, color: color }),
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function addNewCarAction(carName: string, color: string) {
    await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        body: JSON.stringify({ name: carName, color: color }),
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function getCarsAction(
    amountOfCarOnPage: number,
    currentPage: number
) {
    const response = await fetch(
        `http://127.0.0.1:3000/garage/?_limit=${amountOfCarOnPage}&_page=${currentPage}`
    )
    const cars: Car[] = await response.json()
    return { cars: cars, amountOfCars: response.headers.get('X-Total-Count') }
}

export async function getCarAction(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'GET',
    })
    const parametrsOfCar = await response.json()
    return parametrsOfCar
}

export async function deleteCarAction(id: number) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
    })
}

export async function updateCarAction(
    carName: string,
    color: string,
    id: number
) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: carName, color: color }),
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function startCarEngineAction(id: number | null) {
    const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=started`,
        {
            method: 'PATCH',
        }
    )
    const parametrsOfCar = await response.json()
    return parametrsOfCar
}
export async function stopCarEngineAction(id: number) {
    const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=stopped`,
        {
            method: 'PATCH',
        }
    )
    const parametrsOfCar = await response.json()
    return parametrsOfCar
}
export async function switchEngineToDriveModeAction(id: number | null) {
    try {
        const response = await fetch(
            `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
            {
                method: 'PATCH',
            }
        )
        await response.json()
        return true
    } catch {
        return false
    }
}
