import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RaceStatus } from '../schema/race.schema';

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
  @ApiProperty({ type: Number })
  timeout1: number = undefined;
  @ApiProperty({ type: Number })
  timeout2: number = undefined;
  @ApiPropertyOptional({ type: String })
  videoUrl?: string = undefined;
}
