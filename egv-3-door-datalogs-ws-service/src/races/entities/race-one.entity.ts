import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RaceStatus } from '../schema/race.schema';
import { RaceDatalogsEntity } from './race-datalogs.entity';

export class RaceOneEntity {
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

  @ApiPropertyOptional({ type: RaceDatalogsEntity, isArray: true })
  datalogs: RaceDatalogsEntity[] = undefined;
}
