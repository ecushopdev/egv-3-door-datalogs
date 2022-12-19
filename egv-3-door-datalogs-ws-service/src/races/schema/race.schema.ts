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
  timestamps: { createdAt: true, updatedAt: false },
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
}

export const RaceSchema = SchemaFactory.createForClass(Races);

export { RaceStatus };
