import dayjs from "dayjs"

const xDataLoad = () => {
    let dataY = []
    for (let i = 0; i < 200; i++) {
        const newNumber = Math.floor(Math.random() * 100)
        dataY.push(newNumber)
    }
    return dataY
}

const yDataLoad = () => {
    let dataX: Date[] = []
    for (let i = 0; i < 200; i++) {
        dataX.push(dayjs().subtract(i, "minutes").toDate())
    }
    return dataX
}

export {
    xDataLoad,
    yDataLoad
}