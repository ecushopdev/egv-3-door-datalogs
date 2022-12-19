import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataLogsDocument = HydratedDocument<DataLogs>;

@Schema({
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: {
    transform: (doc: DataLogsDocument, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class DataLogs {
  @Prop()
  soc: number;
  @Prop()
  rangeToGo: number;
  @Prop()
  speed: number;
  @Prop()
  voltBatt: number;
  @Prop()
  motor1RPM: number;
  @Prop()
  motor1Volt: number;
  @Prop()
  motor1Current: number;
  @Prop()
  motor1Torque: number;
  @Prop()
  motor2RPM: number;
  @Prop()
  motor2Volt: number;
  @Prop()
  motor2Current: number;
  @Prop()
  motor2Torque: number;
  @Prop()
  motor3RPM: number;
  @Prop()
  motor3Volt: number;
  @Prop()
  motor3Current: number;
  @Prop()
  motor3Torque: number;
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

export const DataLogsSchema = SchemaFactory.createForClass(DataLogs);
