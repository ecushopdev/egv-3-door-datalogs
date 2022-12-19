interface typeEgvSender {
    event: string,
    data: typeEgvSenderData
}

interface typeEgvSenderData {
    soc: number;
    rangeToGo: number;
    speed: number;
    voltBatt: number;
    motor1RPM: number;
    motor1Volt: number;
    motor1Current: number;
    motor1Torque: number;
    motor2RPM: number;
    motor2Volt: number;
    motor2Current: number;
    motor2Torque: number;
    motor3RPM: number;
    motor3Volt: number;
    motor3Current: number;
    motor3Torque: number;
    acpMain: number;
    acpSub: number;
    ect1: number;
    ect2: number;
    stearing: number;
    breakPos: number;
    gearPos: number;
    aBatt: number;
    errorMotor1: boolean;
    errorMotor2: boolean;
    errorMotor3: boolean;
    timestamp: Date;
}

export type {
    typeEgvSender,
    typeEgvSenderData,
}