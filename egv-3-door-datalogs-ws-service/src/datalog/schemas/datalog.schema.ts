import * as mongoose from 'mongoose';

export const DatalogSchema = new mongoose.Schema({
  soc: Number,
  rangeToGo: Number,
  speed: Number,
  voltBatt: Number,
  motorRPM: Number,
  motorVolt: Number,
  motorCurrent: Number,
  motorTorque: Number,
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
