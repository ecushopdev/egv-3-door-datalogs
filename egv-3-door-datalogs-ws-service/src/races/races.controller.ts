import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RaceEntity } from './entities/race.entity';
import { Schema as MongooseSchema } from 'mongoose';
import dayjs from 'dayjs';
import { ParseObjectIdPipe } from '../common/pipe/ParseObjectId.pipe';

@Controller('races')
@ApiTags('Races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post()
  @ApiCreatedResponse({ type: RaceEntity })
  create(@Body() createRaceDto: CreateRaceDto) {
    createRaceDto = {
      startTimestamp: dayjs().toDate(),
    };
    return this.racesService.create(createRaceDto);
  }

  @Get()
  @ApiOkResponse({ type: RaceEntity, isArray: true })
  findAll() {
    return this.racesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RaceEntity })
  findOne(
    @Param('id', new ParseObjectIdPipe()) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.racesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RaceEntity })
  update(
    @Param('id', new ParseObjectIdPipe()) id: MongooseSchema.Types.ObjectId,
    @Body() updateRaceDto: UpdateRaceDto,
  ) {
    return this.racesService.update(id, updateRaceDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(
    @Param('id', new ParseObjectIdPipe()) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.racesService.remove(id);
  }
}
