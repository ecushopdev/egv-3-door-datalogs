import { Controller, Get, Query } from '@nestjs/common';
import { DataLogsService } from './datalogs.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DatalogsEntity } from './entities/datalogs.entity';
import { FilterQuery } from 'mongoose';
import { DataLogs } from './schema/datalogs.schema';
import { ObjectId } from 'mongodb';

@Controller('datalogs')
@ApiTags('DataLogs')
export class DataLogsController {
  constructor(private readonly datalogsService: DataLogsService) {}

  @Get()
  @ApiOkResponse({ type: DatalogsEntity, isArray: true })
  @ApiQuery({
    name: 'timestampBegin',
    required: false,
    type: 'Date',
  })
  @ApiQuery({
    name: 'timestampEnd',
    required: false,
    type: 'Date',
  })
  @ApiQuery({
    name: 'race',
    required: false,
    type: 'string',
  })
  findAll(
    @Query()
    { timestampBegin, timestampEnd, race },
  ) {
    let filter: FilterQuery<DataLogs>;

    if (race) {
      filter = {
        race: race ? new ObjectId(race) : undefined,
      };
    }

    if (timestampBegin && timestampEnd) {
      filter = {
        ...filter,
        timestamp: {
          $lte: timestampBegin ? timestampBegin : undefined,
          $gte: timestampEnd ? timestampEnd : undefined,
        },
      };
    }

    return this.datalogsService.findAll({ filter });
  }
}
