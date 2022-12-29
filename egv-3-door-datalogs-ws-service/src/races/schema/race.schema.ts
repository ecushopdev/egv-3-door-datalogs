import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RacesDocument = HydratedDocument<Races>;

enum RaceStatus {
  Created = 'Created',
  Padding = 'Padding',
  Ready = 'Ready',
  Finish = 'Finish',
  Failed = 'Failed',
}

@Schema({
  collection: 'Races',
  versionKey: false,
  timestamps: { createdAt: false, updatedAt: false },
  toJSON: {
    transform: (doc: RacesDocument, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Races {
  @Prop({ type: String, enum: RaceStatus, default: RaceStatus.Created })
  status: RaceStatus;
  @Prop()
  startTimestamp: Date;
  @Prop()
  stopTimestamp: Date;
  @Prop()
  timeout1: number;
  @Prop()
  timeout2: number;
  @Prop()
  videoUrl: string;
}

export const RaceSchema = SchemaFactory.createForClass(Races);

export { RaceStatus };
