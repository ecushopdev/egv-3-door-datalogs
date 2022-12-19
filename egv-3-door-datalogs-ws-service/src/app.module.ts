import { CacheModule, Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { DataLogsModule } from './datalogs/datalogs.module';
import { RacesModule } from './races/races.module';

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

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, options),
    CacheModule.register(),
    WsModule,
    DataLogsModule,
    RacesModule,
  ],
})
export class AppModule {}
