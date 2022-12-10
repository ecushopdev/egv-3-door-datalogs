import * as mongoose from 'mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

const prdOption: MongooseModuleOptions = {
  replicaSet: 'rs0',
  readPreference: 'secondaryPreferred',
  ssl: true,
  useNewUrlParser: true,
  sslValidate: true,
  retryWrites: false,
  sslCA: './keys/rds-combined-ca-bundle.pem',
};

let options: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (process.env.NODE_ENV === 'production') {
  options = { ...options, ...prdOption };
}
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE_URL, options),
  },
];
