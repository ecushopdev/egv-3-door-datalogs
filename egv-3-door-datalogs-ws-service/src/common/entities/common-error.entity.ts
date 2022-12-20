import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommonErrorEntity {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
