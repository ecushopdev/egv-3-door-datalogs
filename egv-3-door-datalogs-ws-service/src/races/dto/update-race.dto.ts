import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RaceStatus } from '../schema/race.schema';

export class UpdateRaceDto {
  @ApiProperty({
    enum: RaceStatus,
    enumName: 'RaceStatusEnum',
    default: RaceStatus.Created,
  })
  status: RaceStatus = RaceStatus.Created;

  @ApiPropertyOptional({ type: Date })
  stopTimestamp?: Date = undefined;
}
