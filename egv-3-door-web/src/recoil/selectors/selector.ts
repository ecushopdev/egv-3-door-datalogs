import { selector } from "recoil";
import { atomAllDataChart, atomLastMessage, atomRpm, atomSpeed, cmdProtocal, urlGet } from "../atom/atom";
import { typeEgvSenderData } from "../../util/type/TypeEgvData";

const SelectSpeed = selector({
    key: 'SelectSpeed',
    get: ({ get }) => {
        return get(atomSpeed)
    }
})

const SelectRpm = selector({
    key: 'SelectRpm',
    get: ({ get }) => {
        return get(atomRpm)
    }
})

const selectMessageWs = selector<object>({
    key: 'SelectMessageWs',
    get: ({ get }) => {
        const message = get(atomLastMessage)
        return message
    }
})

const selectURLWS = selector({
    key: 'SelectURLWS',
    get: ({ get }) => {
        const url = get(urlGet)
        return url
    }
})

const selectProtocolWs = selector({
    key: 'SelectProtocolWs',
    get: ({ get }) => {
        const protocol = get(cmdProtocal)
        return protocol
    }
})

const selectAllDataChart = selector<typeEgvSenderData[]>({
    key: 'SelectAllDataChart',
    get: ({ get }) => {
        const thisData = get(atomAllDataChart)
        return thisData
    }
})


export {
    SelectSpeed,
    SelectRpm,
    selectURLWS,
    selectProtocolWs,
    selectMessageWs,
    selectAllDataChart
}