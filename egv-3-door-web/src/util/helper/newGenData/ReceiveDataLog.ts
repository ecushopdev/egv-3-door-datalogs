import dayjs from "dayjs";
import { typeDataLogDto } from "../../type/TypeDataLog";

const genDataLogSend = (state: boolean): typeDataLogDto => {

    let soc
    let rangeToGo
    let dragDistance
    let speed
    let lat
    let lng
    let voltBatt
    let motor1RPM
    let motor1Volt
    let motor1Current
    let motor1Torque
    let motor2RPM
    let motor2Volt
    let motor2Current
    let motor2Torque
    let motor3RPM
    let motor3Volt
    let motor3Current
    let motor3Torque
    let acpMain
    let acpSub
    let ect1
    let ect2
    let stearing
    let breakPos
    let gearPos
    let aBatt
    let errorMotor1
    let errorMotor2
    let errorMotor3
    let timestamp

    if (state === false) {
        soc = null
        rangeToGo = null
        dragDistance = null
        speed = null
        lat = null
        lng = null
        voltBatt = null
        motor1RPM = null
        motor1Volt = null
        motor1Current = null
        motor1Torque = null
        motor2RPM = null
        motor2Volt = null
        motor2Current = null
        motor2Torque = null
        motor3RPM = null
        motor3Volt = null
        motor3Current = null
        motor3Torque = null
        acpMain = null
        acpSub = null
        ect1 = null
        ect2 = null
        stearing = null
        breakPos = null
        gearPos = null
        aBatt = null
        errorMotor1 = Boolean(Math.round(Math.random()));
        errorMotor2 = Boolean(Math.round(Math.random()));
        errorMotor3 = Boolean(Math.round(Math.random()));
        timestamp = dayjs().subtract(60, "minutes").toDate()
    } else {
        soc = Math.floor(Math.random() * (100) + 10)
        rangeToGo = Math.floor(Math.random() * (100) + 10)
        dragDistance = Math.floor(Math.random() * (100) + 10)
        speed = Math.floor(Math.random() * (100) + 10)
        lat = Math.floor(Math.random() * (100) + 10)
        lng = Math.floor(Math.random() * (100) + 10)
        voltBatt = Math.floor(Math.random() * (100) + 10)
        motor1RPM = Math.floor(Math.random() * (10000 - 5000) + 500)
        motor1Volt = Math.floor(Math.random() * (230 - 220) + 220)
        motor1Current = Math.floor(Math.random() * (500 - 400) + 50)
        motor1Torque = Math.floor(Math.random() * (500 - 200) + 200)
        motor2RPM = Math.floor(Math.random() * (10000 - 5000) + 500)
        motor2Volt = Math.floor(Math.random() * (230 - 220) + 220)
        motor2Current = Math.floor(Math.random() * (500 - 400) + 50)
        motor2Torque = Math.floor(Math.random() * (500 - 200) + 200)
        motor3RPM = Math.floor(Math.random() * (10000 - 5000) + 500)
        motor3Volt = Math.floor(Math.random() * (230 - 220) + 220)
        motor3Current = Math.floor(Math.random() * (500 - 400) + 50)
        motor3Torque = Math.floor(Math.random() * (500 - 200) + 200)
        acpMain = Math.floor(Math.random() * (100) + 10)
        acpSub = Math.floor(Math.random() * (100) + 10)
        ect1 = Math.floor(Math.random() * (100) + 10)
        ect2 = Math.floor(Math.random() * (100) + 10)
        stearing = Math.floor(Math.random() * (100) + 10)
        breakPos = Math.floor(Math.random() * (100) + 10)
        gearPos = Math.floor(Math.random() * (100) + 10)
        aBatt = Math.floor(Math.random() * (100) + 10)
        errorMotor1 = Boolean(Math.round(Math.random()));
        errorMotor2 = Boolean(Math.round(Math.random()));
        errorMotor3 = Boolean(Math.round(Math.random()));
        timestamp = new Date()
        // timestamp = randomDate(new Date(2022, 12, 28), new Date());
    }

    return {
        soc,
        rangeToGo,
        dragDistance,
        speed,
        lat,
        lng,
        voltBatt,
        motor1RPM,              // MotorRpm
        motor1Volt,             //MotorVolt
        motor1Current,          //MotorCurrent
        motor1Torque,           //MotorTorque
        motor2RPM,              // MotorRpm
        motor2Volt,             //MotorVolt
        motor2Current,          //MotorCurrent
        motor2Torque,           //MotorTorque
        motor3RPM,              // MotorRpm
        motor3Volt,             //MotorVolt
        motor3Current,          //MotorCurrent
        motor3Torque,           //MotorTorque
        acpMain,
        acpSub,
        ect1,                   //Ect
        ect2,                   //Ect
        stearing,
        breakPos,
        gearPos,
        aBatt,
        errorMotor1,            //ErrorMotor
        errorMotor2,            //ErrorMotor
        errorMotor3,            //ErrorMotor
        timestamp,
    }
}

const genDataLogArray = (number: number): typeDataLogDto[] => {
    let data: typeDataLogDto[] = []
    for (let i = 0; i < number; i++) {
        const newDate = genDataLogSend(false)
        data.push(newDate)
    }
    return data
}

const genDataLoadOnlyData = (number: number): typeDataLogDto[] => {
    let data: typeDataLogDto[] = []
    for (let i = 0; i < number; i++) {
        const newDate = genDataLogSend(true)
        data.push(newDate)
    }
    return data
}


export {
    genDataLogSend,
    genDataLogArray,
    genDataLoadOnlyData
};