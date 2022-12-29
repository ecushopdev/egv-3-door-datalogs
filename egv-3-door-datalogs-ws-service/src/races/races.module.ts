import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Races, RaceSchema } from './schema/race.schema';
import { WsModule } from '../ws/ws.module';
import { DataLogsModule } from '../datalogs/datalogs.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Races.name, schema: RaceSchema }]),
    WsModule,
    DataLogsModule,
    UploadModule,
  ],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
