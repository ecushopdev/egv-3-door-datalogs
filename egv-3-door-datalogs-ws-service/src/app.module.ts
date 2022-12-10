import { Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';
import { DatalogModule } from './datalog/datalog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/egv-3-door'),
    WsModule,
    DatalogModule,
  ],
})
export class AppModule {}
