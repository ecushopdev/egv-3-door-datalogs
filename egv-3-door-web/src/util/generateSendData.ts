import { generateReceivedData } from "./generateReceivedData";
import { typeEgvSender } from "./type/TypeEgvData";

const generateData = (): typeEgvSender => {

    const event = 'Datalog'
    //Math.floor(Math.random() * 101) - 50;
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