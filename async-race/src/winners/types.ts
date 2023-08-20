export interface Winner {
    id: number
    wins: number
    time: number
}
export interface ExtendedWinner extends Winner {
    number: number
    color: string
    name: string
}
export type WinnerKey = 'number' | 'color' | 'name' | 'wins' | 'time'
