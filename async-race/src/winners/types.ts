export type Winner = {
    id: number
    wins: number
    time: number
}
export type ExtendedWinner = {
    number: number
    color: string
    name: string
    wins: number
    time: number
}
export type WinnerKey = 'number' | 'color' | 'name' | 'wins' | 'time'
