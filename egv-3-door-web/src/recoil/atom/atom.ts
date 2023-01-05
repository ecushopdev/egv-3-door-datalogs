import { atom } from "recoil";
import { typeEgvSenderData } from "../../util/type/TypeEgvData";
import dayjs from 'dayjs';

const atomLastMessage = atom<Object>({
    key: 'atomLastMessage',
    default: {},
})

const atomAllDataChart = atom<typeEgvSenderData[]>({
    key: 'atomAllDataChart',
    default: new Array(200).fill(200).map((item, index) => {
        return {
            soc: null,
            rangeToGo: null,
            dragDistance: null,
            speed: null,
            lat: null,
            lng: null,
            voltBatt: null,
            motor1RPM: null,
            motor1Volt: null,
            motor1Current: null,
            motor1Torque: null,
            motor2RPM: null,
            motor2Volt: null,
            motor2Current: null,
            motor2Torque: null,
            motor3RPM: null,
            motor3Volt: null,
            motor3Current: null,
            motor3Torque: null,
            acpMain: null,
            acpSub: null,
            ect1: null,
            ect2: null,
            stearing: null,
            breakPos: null,
            gearPos: null,
            aBatt: null,
            errorMotor1: false,
            errorMotor2: false,
            errorMotor3: false,
            timestamp: dayjs().subtract(index, 'seconds').toDate()
        }
    }).reverse()
})

const loadDataRealtime = atom<typeEgvSenderData[]>({
    key: 'loadDataRealtime',
    default: []
})

export {
    atomLastMessage,
    atomAllDataChart,

    loadDataRealtime
}

