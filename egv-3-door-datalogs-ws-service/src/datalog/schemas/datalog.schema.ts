import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DataLogDocument = DataLog & Document;

@Schema({
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false },
})
export class DataLog {
  @Prop()
  soc: number;
  @Prop()
  rangeToGo: number;
  @Prop()
  speed: number;
  @Prop()
  voltBatt: number;
  @Prop()
  motorRPM: number;
  @Prop()
  motorVolt: number;
  @Prop()
  motorCurrent: number;
  @Prop()
  motorTorque: number;
  @Prop()
  acpMain: number;
  @Prop()
  acpSub: number;
  @Prop()
  ect1: number;
  @Prop()
  ect2: number;
  @Prop()
  stearing: number;
  @Prop()
  breakPos: number;
  @Prop()
  gearPos: number;
  @Prop()
  aBatt: number;
  @Prop()
  errorMotor1: boolean;
  @Prop()
  errorMotor2: boolean;
  @Prop()
  errorMotor3: boolean;
  @Prop()
  timestamp: Date;
}

export const DatalogSchema = SchemaFactory.createForClass(DataLog);
