import { typeEgvSender } from "./type/TypeEgvData";

const generateData = (): typeEgvSender => {

    const event = 'Datalog'
    //Math.floor(Math.random() * 101) - 50;
    const soc = Math.floor(Math.random() * 100)
    const rangeToGo = Math.floor(Math.random() * 100)
    const speed = Math.floor(Math.random() * 100)
    const voltBatt = Math.floor(Math.random() * 100)
    const motor1RPM = Math.floor(Math.random() * 100)
    const motor1Volt = Math.floor(Math.random() * 100)
    const motor1Current = Math.floor(Math.random() * 100)
    const motor1Torque = Math.floor(Math.random() * 100)
    const motor2RPM = Math.floor(Math.random() * 100)
    const motor2Volt = Math.floor(Math.random() * 100)
    const motor2Current = Math.floor(Math.random() * 100)
    const motor2Torque = Math.floor(Math.random() * 100)
    const motor3RPM = Math.floor(Math.random() * 100)
    const motor3Volt = Math.floor(Math.random() * 100)
    const motor3Current = Math.floor(Math.random() * 100)
    const motor3Torque = Math.floor(Math.random() * 100)
    const acpMain = Math.floor(Math.random() * 100)
    const acpSub = Math.floor(Math.random() * 100)
    const ect1 = Math.floor(Math.random() * 100)
    const ect2 = Math.floor(Math.random() * 100)
    const stearing = Math.floor(Math.random() * 100)
    const breakPos = Math.floor(Math.random() * 100)
    const gearPos = Math.floor(Math.random() * 100)
    const aBatt = Math.floor(Math.random() * 100)
    //Boolean(Math.round(Math.random()));
    const errorMotor1 = Boolean(Math.round(Math.random()));
    const errorMotor2 = Boolean(Math.round(Math.random()));
    const errorMotor3 = Boolean(Math.round(Math.random()));
    const timestamp = new Date()
    return {
        event,
        data: {
            soc,
            rangeToGo,
            speed,
            voltBatt,
            motor1RPM,          //Chart ROM
            motor1Volt,             //Chart Volt
            motor1Current,              //Chart Current
            motor1Torque,                   //Chart Torque
            motor2RPM,          //Chart ROM
            motor2Volt,             //Chart Volt
            motor2Current,              //Chart Current
            motor2Torque,                   //Chart Torque
            motor3RPM,          //Chart ROM
            motor3Volt,             //Chart Volt
            motor3Current,              //Chart Current
            motor3Torque,                   //Chart Torque
            acpMain,
            acpSub,
            ect1,               //Chart etc               
            ect2,               //Chart etc
            stearing,
            breakPos,
            gearPos,
            aBatt,
            errorMotor1,
            errorMotor2,
            errorMotor3,
            timestamp
        }
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