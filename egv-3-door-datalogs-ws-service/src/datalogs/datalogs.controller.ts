import { Controller, Get, Query } from '@nestjs/common';
import { DataLogsService } from './datalogs.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('datalogs')
@ApiTags('DataLogs')
export class DataLogsController {
  constructor(private readonly datalogsService: DataLogsService) {}

  @Get()
  @ApiQuery({
    name: 'timestampBegin',
    required: true,
    type: 'Date',
  })
  @ApiQuery({
    name: 'timestampEnd',
    required: true,
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
    // return this.datalogsService.findAll();
    return [];
  }
}
