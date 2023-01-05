import { typeEgvSender } from "../../type/TypeEgvData";
import { generateReceivedData } from "./generateReceivedData";

const generateData = (): typeEgvSender => {

    const event = 'Datalog'
    return {
        event,
        data: generateReceivedData(true)
    }
}

const generateArrayData = (number: number) => {
    let data: typeEgvSender[] = []
    for (let i = 0; i < number; i++) {
        const newDate = generateData()
        data.push(newDate)
    }
    return data
}

export {
    generateData,
    generateArrayData
};