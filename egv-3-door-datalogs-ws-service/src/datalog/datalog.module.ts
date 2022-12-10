import { Module } from '@nestjs/common';
import { DatalogService } from './datalog.service';
import { DatabaseModule } from '../database/database.module';
import { datalogProviders } from './datalog.providers';

@Module({
  imports: [DatabaseModule],
  providers: [DatalogService, ...datalogProviders],
  exports: [DatalogService],
})
export class DatalogModule {}
