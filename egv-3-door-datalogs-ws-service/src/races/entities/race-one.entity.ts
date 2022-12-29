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
  @ApiProperty({ type: String })
  timeout1: string = undefined;
  @ApiProperty({ type: String })
  timeout2: string = undefined;
  @ApiPropertyOptional({ type: RaceDatalogsEntity, isArray: true })
  datalogs: RaceDatalogsEntity[] = undefined;
  @ApiPropertyOptional({ type: String })
  videoUrl?: string = undefined;
}
