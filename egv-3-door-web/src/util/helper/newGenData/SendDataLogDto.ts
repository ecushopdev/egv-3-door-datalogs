import { typeDataLogSender } from "../../type/TypeDataLog"
import { genDataLogSend } from "./ReceiveDataLog"

const generateDatalog = (): typeDataLogSender => {

    const event = 'Datalog'
    return {
        event,
        data: genDataLogSend(true)
    }
}

const generateArrayDatalog = (number: number) => {
    let data: typeDataLogSender[] = []
    for (let i = 0; i < number; i++) {
        const newDate = generateDatalog()
        data.push(newDate)
    }
    return data
}

export {
    generateDatalog,
    generateArrayDatalog
};