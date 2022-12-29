import { CacheModule, Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { DataLogsModule } from './datalogs/datalogs.module';
import { RacesModule } from './races/races.module';
import { UploadModule } from './upload/upload.module';
import { S3Module } from 'nestjs-s3';
import process from 'process';

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
    S3Module.forRoot({
      config: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        // endpoint: 'http://127.0.0.1:9000',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
    WsModule,
    DataLogsModule,
    RacesModule,
    UploadModule,
  ],
})
export class AppModule {}
