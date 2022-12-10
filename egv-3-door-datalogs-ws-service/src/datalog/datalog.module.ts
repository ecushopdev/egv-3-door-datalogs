import { Module } from '@nestjs/common';
import { DatalogService } from './datalog.service';
import { DatalogController } from './datalog.controller';

@Module({
  controllers: [DatalogController],
  providers: [DatalogService]
})
export class DatalogModule {}
