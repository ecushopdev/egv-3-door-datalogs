import { Module } from '@nestjs/common';
import { DataLogsService } from './datalogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DataLogs, DataLogsSchema } from './schema/datalogs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataLogs.name, schema: DataLogsSchema },
    ]),
  ],
  providers: [DataLogsService],
  exports: [DataLogsService],
})
export class DataLogsModule {}
