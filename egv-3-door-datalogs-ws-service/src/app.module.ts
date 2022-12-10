import { Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatalogModule } from './datalog/datalog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/egv-3-door', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    WsModule,
    DatalogModule,
  ],
})
export class AppModule {}
