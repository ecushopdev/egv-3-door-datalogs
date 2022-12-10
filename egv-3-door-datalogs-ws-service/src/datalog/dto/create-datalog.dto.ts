export class CreateDatalogDto {
  soc: number;
  rangeToGo: number;
  speed: number;
  voltBatt: number;
  motorRPM: number;
  motorVolt: number;
  motorCurrent: number;
  motorTorque: number;
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
