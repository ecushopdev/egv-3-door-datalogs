import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { DatalogModule } from '../datalog/datalog.module';

@Module({
  providers: [WsGateway, WsService],
  imports: [DatalogModule],
})
export class WsModule {}
