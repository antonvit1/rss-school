
import {btnToWinner, btnToGarage, sectionCreateCar, fieldRoad} from './main-elements'
import { creatFieldsForCreatCar, creatFieldsForUpdateCar, creatMainBtns } from './garage'
import { createTablewinnersResult } from './winners'

btnToWinner.addEventListener('click', function () {
    sectionCreateCar.innerHTML = ''
    fieldRoad.innerHTML = ''
    createTablewinnersResult()
})
btnToGarage.addEventListener('click', function () {

    fieldRoad.innerHTML = ''
    creatFieldsForCreatCar()
    creatFieldsForUpdateCar()
    creatMainBtns()
})



