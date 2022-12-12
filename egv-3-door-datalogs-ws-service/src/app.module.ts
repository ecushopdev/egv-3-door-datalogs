import { Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';
import { DatalogModule } from './datalog/datalog.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), WsModule, DatalogModule],
})
export class AppModule {}
