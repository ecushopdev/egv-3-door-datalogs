import { ApiProperty } from '@nestjs/swagger';

export class CreateRaceDto {
  @ApiProperty({ type: Number })
  timeout1: number = undefined;
  @ApiProperty({ type: Number })
  timeout2: number = undefined;
}
