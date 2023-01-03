interface typeDataLogSender {
    event: string,
    data: typeDataLogDto
}

interface typeDataLogDto {
    race: number | null
    soc: number | null
    rangeToGo: number | null
    dragDistance: number | null
    speed: number | null
    lat: number | null
    lng: number | null
    voltBatt: number | null
    motor1RPM: number | null
    motor1Volt: number | null
    motor1Current: number | null
    motor1Torque: number | null
    motor2RPM: number | null
    motor2Volt: number | null
    motor2Current: number | null
    motor2Torque: number | null
    motor3RPM: number | null
    motor3Volt: number | null
    motor3Current: number | null
    motor3Torque: number | null
    acpMain: number | null
    acpSub: number | null
    ect1: number | null
    ect2: number | null
    stearing: number | null
    breakPos: number | null
    gearPos: number | null
    aBatt: number | null
    errorMotor1: boolean | null
    errorMotor2: boolean | null
    errorMotor3: boolean | null
    timestamp: Date
}

export type {
    typeDataLogSender,
    typeDataLogDto
}