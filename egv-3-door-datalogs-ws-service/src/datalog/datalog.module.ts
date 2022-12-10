import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatalogService } from './datalog.service';
import { DataLog, DatalogSchema } from './schemas/datalog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DataLog.name, schema: DatalogSchema }]),
  ],
  providers: [DatalogService],
  exports: [DatalogService],
})
export class DatalogModule {}
