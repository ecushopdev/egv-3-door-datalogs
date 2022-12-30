import { selector } from "recoil";
import { atomAllDataChart, atomLastMessage, } from "../atom/atom";
import { typeEgvSenderData } from "../../util/type/TypeEgvData";

const selectMessageWs = selector({
    key: 'SelectMessageWs',
    get: ({ get }) => {
        const message = get(atomLastMessage)
        const data: Object | null = message
        return data
    }
})

const selectAllDataChart = selector<typeEgvSenderData[]>({
    key: 'SelectAllDataChart',
    get: ({ get }) => {
        const thisData = get(atomAllDataChart)
        const value: typeEgvSenderData[] = thisData
        return value
    }
})


export {
    selectMessageWs,
    selectAllDataChart
}