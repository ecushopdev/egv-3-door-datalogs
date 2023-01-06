import { selector } from "recoil";
import { atomAllDataChart, atomLastMessage, loadDataRealtime, timeSetting, } from "../atom/atom";
import { typeEgvSenderData } from "../../util/type/TypeEgvData";

const selectMessageWs = selector<Object>({
    key: 'SelectMessageWs',
    get: ({ get }) => {
        const message = get(atomLastMessage)
        const data = message
        return data
    }
})

const selectAllDataChart = selector<typeEgvSenderData[]>({
    key: 'SelectAllDataChart',
    get: ({ get }) => {
        const thisData = get(atomAllDataChart)
        const value = thisData
        return value
    }
})

const addItem = selector({
    key: 'addItem',
    get: ({ get }) => {
        let dataReturn
        const value = get(loadDataRealtime)
        dataReturn = value
        return dataReturn
    }
})

const selectTimeSetting = selector({
    key: 'selectTimeSetting',
    get: ({ get }) => {
        return get(timeSetting)
    }
})

export {
    selectMessageWs,
    selectAllDataChart,
    addItem,
    selectTimeSetting
}