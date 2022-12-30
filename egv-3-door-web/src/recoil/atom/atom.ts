import { atom } from "recoil";
import { typeEgvSenderData } from "../../util/type/TypeEgvData";

const atomLastMessage = atom<Object>({
    key: 'atomLastMessage',
    default: {},
})

const atomAllDataChart = atom<typeEgvSenderData[]>({
    key: 'atomAllDataChart',
    default: []
})


export {
    atomLastMessage,
    atomAllDataChart
}

