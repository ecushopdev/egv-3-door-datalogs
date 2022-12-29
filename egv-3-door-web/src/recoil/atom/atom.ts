import { atom } from "recoil";
import { typeEgvSenderData } from "../../util/type/TypeEgvData";
import { generateArrayReceivedData } from "../../util/generateReceivedData";
const atomSpeed = atom({
    key: 'atomSpeed',
    default: 0,
})

const atomRpm = atom({
    key: 'atomRpm',
    default: 0,
})

const atomLastMessage = atom<object>({
    key: 'StateUrl',
    default: {},
})

const atomAllDataChart = atom<typeEgvSenderData[]>({
    key: 'DataChart',
    default: []
})


const urlGet = atom<string | null>({ key: 'urlGet', default: null })
const cmdProtocal = atom<string>({ key: 'cmdProtocal', default: '' })


export {
    atomSpeed,
    atomRpm,
    urlGet,
    cmdProtocal,
    atomLastMessage,
    atomAllDataChart
}

