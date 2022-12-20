import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InternalServerErrorEntity {
  @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ApiProperty({ default: 'Internal Server Error' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
