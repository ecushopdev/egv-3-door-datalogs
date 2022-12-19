import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RaceEntity } from './entities/race.entity';
import { UpdateQuery } from 'mongoose';
import dayjs from 'dayjs';
import { ParseObjectIdPipe } from '../common/pipe/ParseObjectId.pipe';
import { Races, RaceStatus } from './schema/race.schema';
import { Response } from 'express';
import { WsGateway } from '../ws/ws.gateway';
import { CreateDatalogDto } from '../datalogs/dto/create-datalog.dto';
import { NotFoundErrorEntity } from '../common/entities/not-found-error.entity';
import { DataLogsService } from '../datalogs/datalogs.service';
import { BadRequestErrorEntity } from '../common/entities/bad-request-error.entity';

@Controller('races')
@ApiTags('Races')
export class RacesController {
  constructor(
    private readonly racesService: RacesService,
    private readonly datalogsService: DataLogsService,
    private readonly wsGateway: WsGateway,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: RaceEntity })
  async create(@Body() createRaceDto: CreateRaceDto) {
    createRaceDto = {
      startTimestamp: dayjs().toDate(),
    };
    const response = await this.racesService.create(createRaceDto);
    this.wsGateway.broadcast('Status', response);
    return response;
  }

  @Get()
  @ApiOkResponse({ type: RaceEntity, isArray: true })
  findAll() {
    return this.racesService.findAll({});
  }

  @Get(':id')
  @ApiOkResponse({ type: RaceEntity })
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  async findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    const response = await this.racesService.findOneAggregation(id);
    if (!response) {
      throw new NotFoundException('Not found race');
    }
    return response;
  }

  @Patch(':id')
  @ApiOkResponse({ type: RaceEntity })
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  @ApiBadRequestResponse({ type: BadRequestErrorEntity })
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateRaceDto: UpdateRaceDto,
  ) {
    const race = await this.racesService.findOne(id);
    if (race.stopTimestamp) {
      throw new BadRequestException('This race is finished');
    }
    let data: UpdateQuery<Races> = {
      ...updateRaceDto,
    };
    if (
      updateRaceDto.status === RaceStatus.Finish ||
      updateRaceDto.status === RaceStatus.Failed
    ) {
      data = {
        ...data,
        stopTimestamp: dayjs().toDate(),
      };
    }
    const response = await this.racesService.update(id, data);
    this.wsGateway.broadcast('Status', response);
    return response;
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Res() res: Response,
  ) {
    await this.racesService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post(':id/datalogs')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  @ApiBadRequestResponse({ type: BadRequestErrorEntity })
  @ApiBody({ type: CreateDatalogDto, isArray: true })
  async addDataLogs(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() createDatalogDto: CreateDatalogDto[],
    @Res() res: Response,
  ) {
    const race = await this.racesService.findOne(id);
    if (!race) {
      throw new NotFoundException('Not found race');
    }
    if (race.stopTimestamp) {
      throw new BadRequestException('This race is finished');
    }
    const data: CreateDatalogDto[] = createDatalogDto.map((item) => ({
      ...item,
      race: id,
    }));
    await this.datalogsService.createMany(data);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
