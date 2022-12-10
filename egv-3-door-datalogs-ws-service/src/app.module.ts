import { Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatalogModule } from './datalog/datalog.module';
import { ConfigModule } from '@nestjs/config';
import fs from 'fs';

const sslCA = fs.readFileSync('./keys/rds-combined-ca-bundle.pem');

const prdOption = {
  replicaSet: 'rs0',
  readPreference: 'secondaryPreferred',
  ssl: true,
  useNewUrlParser: true,
  sslValidate: true,
  sslCA: sslCA,
};

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (process.env.NODE_ENV === 'production') {
  options = { ...options, ...prdOption };
}

console.log(options);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, options),
    WsModule,
    DatalogModule,
  ],
})
export class AppModule {}
