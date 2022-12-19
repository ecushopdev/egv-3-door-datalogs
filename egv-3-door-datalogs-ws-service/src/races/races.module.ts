import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Races, RaceSchema } from './schema/race.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Races.name, schema: RaceSchema }]),
  ],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
