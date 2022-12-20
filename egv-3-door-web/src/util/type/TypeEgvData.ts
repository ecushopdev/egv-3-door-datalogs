interface typeEgvSender {
    event: string,
    data: typeEgvSenderData
}

interface typeEgvSenderData {
    soc: number | null;
    rangeToGo: number | null;
    speed: number | null;
    voltBatt: number | null;
    motor1RPM: number | null;
    motor1Volt: number | null;
    motor1Current: number | null;
    motor1Torque: number | null;
    motor2RPM: number | null;
    motor2Volt: number | null;
    motor2Current: number | null;
    motor2Torque: number | null;
    motor3RPM: number | null;
    motor3Volt: number | null;
    motor3Current: number | null;
    motor3Torque: number | null;
    acpMain: number | null;
    acpSub: number | null;
    ect1: number | null;
    ect2: number | null;
    stearing: number | null;
    breakPos: number | null;
    gearPos: number | null;
    aBatt: number | null;
    errorMotor1: boolean;
    errorMotor2: boolean;
    errorMotor3: boolean;
    timestamp: Date;
}

export type {
    typeEgvSender,
    typeEgvSenderData,
}