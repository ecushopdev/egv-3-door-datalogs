import dayjs from "dayjs"
import { typeDataLogDto } from "../../type/TypeDataLog"

function dummyData(): typeDataLogDto[] {
    const data = new Array(20).fill(20).map((item, index) => {
        return {
            soc: Math.floor(Math.random() * (100 - 50) + 50),
            rangeToGo: Math.floor(Math.random() * (402 - 0) + 0),
            dragDistance: Math.floor(Math.random() * 402),
            speed: Math.floor(Math.random() * (150 - 100) + 100),
            lat: Math.floor(Math.random() * 150),
            lng: Math.floor(Math.random() * 150),
            voltBatt: Math.floor(Math.random() * 100),
            motor1RPM: Math.floor(Math.random() * (10000 - 5000) + 5000),
            motor1Volt: Math.floor(Math.random() * (230 - 200) + 200),
            motor1Current: Math.floor(Math.random() * (350 - 250) + 250),
            motor1Torque: Math.floor(Math.random() * (600 - 500) + 500),
            motor2RPM: Math.floor(Math.random() * (10000 - 6000) + 6000),
            motor2Volt: Math.floor(Math.random() * (230 - 200) + 200),
            motor2Current: Math.floor(Math.random() * (350 - 250) + 250),
            motor2Torque: Math.floor(Math.random() * (600 - 500) + 500),
            motor3RPM: Math.floor(Math.random() * (8000 - 5000) + 5000),
            motor3Volt: Math.floor(Math.random() * (230 - 200) + 200),
            motor3Current: Math.floor(Math.random() * (350 - 250) + 250),
            motor3Torque: Math.floor(Math.random() * (600 - 500) + 500),
            acpMain: Math.floor(Math.random() * (100 - 50) + 50),
            acpSub: Math.floor(Math.random() * 50),
            ect1: Math.floor(Math.random() * (100 - 70) + 70),
            ect2: Math.floor(Math.random() * (100 - 60) + 60),
            stearing: Math.floor(Math.random() * (100 - 90) + 90),
            breakPos: Math.floor(Math.random() * (1000 - 500) + 500),
            gearPos: Math.floor(Math.random() * 100),
            aBatt: Math.floor(Math.random() * (80 - 40) + 40),
            errorMotor1: Boolean(Math.round(Math.random())),
            errorMotor2: Boolean(Math.round(Math.random())),
            errorMotor3: Boolean(Math.round(Math.random())),
            timestamp: dayjs().subtract(index, 'seconds').toDate()
        }
    }).reverse()
    return data
}

export {
    dummyData
}