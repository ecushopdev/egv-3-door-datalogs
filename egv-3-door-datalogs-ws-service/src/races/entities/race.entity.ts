import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RaceStatus } from '../schema/race.schema';
import { DatalogsEntity } from '../../datalogs/entities/datalogs.entity';

export class RaceEntity {
  @ApiProperty({
    enum: RaceStatus,
    enumName: 'RaceStatusEnum',
    default: RaceStatus.Created,
  })
  status: RaceStatus = RaceStatus.Created;

  @ApiProperty({ type: Date })
  startTimestamp: Date = undefined;

  @ApiPropertyOptional({ type: Date })
  stopTimestamp?: Date = undefined;

  @ApiPropertyOptional({ type: DatalogsEntity, isArray: true })
  datalogs: DatalogsEntity[] = undefined;
}
