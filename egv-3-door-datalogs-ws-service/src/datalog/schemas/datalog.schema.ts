import * as mongoose from 'mongoose';

export const DatalogSchema = new mongoose.Schema({
  soc: Number,
  rangeToGo: Number,
  speed: Number,
  voltBatt: Number,
  motor1RPM: Number,
  motor1Volt: Number,
  motor1Current: Number,
  motor1Torque: Number,
  motor2RPM: Number,
  motor2Volt: Number,
  motor2Current: Number,
  motor2Torque: Number,
  motor3RPM: Number,
  motor3Volt: Number,
  motor3Current: Number,
  motor3Torque: Number,
  acpMain: Number,
  acpSub: Number,
  ect1: Number,
  ect2: Number,
  stearing: Number,
  breakPos: Number,
  gearPos: Number,
  aBatt: Number,
  errorMotor1: Boolean,
  errorMotor2: Boolean,
  errorMotor3: Boolean,
  timestamp: Date,
});
