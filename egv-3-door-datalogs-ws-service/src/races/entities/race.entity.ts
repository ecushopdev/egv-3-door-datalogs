import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RaceStatus } from '../schema/race.schema';

export class RaceEntity {
  @ApiProperty({
    enum: RaceStatus,
    enumName: 'RaceStatusEnum',
    default: RaceStatus.Created,
  })
  status: RaceStatus = RaceStatus.Created;
  @ApiProperty({ type: String })
  timeout1: string = undefined;
  @ApiProperty({ type: String })
  timeout2: string = undefined;
  @ApiProperty({ type: Date })
  startTimestamp: Date = undefined;
  @ApiPropertyOptional({ type: Date })
  stopTimestamp?: Date = undefined;
  @ApiPropertyOptional({ type: String })
  videoUrl?: string = undefined;
}
