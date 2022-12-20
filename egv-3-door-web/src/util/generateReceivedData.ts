import dayjs from "dayjs";
import { typeEgvSenderData } from "./type/TypeEgvData";
import { useState } from "react";


const generateReceivedData = (state: boolean): typeEgvSenderData => {

    let soc
    let rangeToGo
    let speed
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
        speed = null
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
        timestamp = dayjs().subtract(1, "minutes").toDate()
    } else {
        soc = Math.floor(Math.random() * 100)
        rangeToGo = Math.floor(Math.random() * 100)
        speed = Math.floor(Math.random() * 100)
        voltBatt = Math.floor(Math.random() * 100)
        motor1RPM = Math.floor(Math.random() * 10000)
        motor1Volt = Math.floor(Math.random() * 100)
        motor1Current = Math.floor(Math.random() * 100)
        motor1Torque = Math.floor(Math.random() * 100)
        motor2RPM = Math.floor(Math.random() * 10000)
        motor2Volt = Math.floor(Math.random() * 100)
        motor2Current = Math.floor(Math.random() * 100)
        motor2Torque = Math.floor(Math.random() * 100)
        motor3RPM = Math.floor(Math.random() * 10000)
        motor3Volt = Math.floor(Math.random() * 100)
        motor3Current = Math.floor(Math.random() * 100)
        motor3Torque = Math.floor(Math.random() * 100)
        acpMain = Math.floor(Math.random() * 100)
        acpSub = Math.floor(Math.random() * 100)
        ect1 = Math.floor(Math.random() * 100)
        ect2 = Math.floor(Math.random() * 100)
        stearing = Math.floor(Math.random() * 100)
        breakPos = Math.floor(Math.random() * 100)
        gearPos = Math.floor(Math.random() * 100)
        aBatt = Math.floor(Math.random() * 100)
        errorMotor1 = Boolean(Math.round(Math.random()));
        errorMotor2 = Boolean(Math.round(Math.random()));
        errorMotor3 = Boolean(Math.round(Math.random()));
        timestamp = new Date()
    }

    return {
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
        acpMain,                //Chart acp                
        acpSub,                 //Chart acp            
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

const generateArrayReceivedData = (number: number): typeEgvSenderData[] => {
    let data: typeEgvSenderData[] = []
    for (let i = 0; i < number; i++) {
        const newDate = generateReceivedData(false)
        data.push(newDate)
    }
    return data
}

export {
    generateReceivedData,
    generateArrayReceivedData
};