import { Module } from '@nestjs/common';
import { OcppService } from './ocpp.service';
import { OcppGateway } from './ocpp.gateway';

@Module({
  providers: [OcppGateway, OcppService],
})
export class OcppModule {}
