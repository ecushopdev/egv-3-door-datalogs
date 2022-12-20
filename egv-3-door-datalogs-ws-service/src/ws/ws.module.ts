import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { DataLogsModule } from '../datalogs/datalogs.module';

@Module({
  providers: [WsGateway, WsService],
  imports: [DataLogsModule],
  exports: [WsGateway],
})
export class WsModule {}
