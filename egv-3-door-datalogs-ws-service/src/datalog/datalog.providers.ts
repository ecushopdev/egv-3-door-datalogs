import { Mongoose } from 'mongoose';
import { DatalogSchema } from './schemas/datalog.schema';

export const datalogProviders = [
  {
    provide: 'DATALOG_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Datalog', DatalogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
