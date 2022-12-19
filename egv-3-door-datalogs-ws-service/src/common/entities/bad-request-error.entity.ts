import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class BadRequestErrorEntity {
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({ default: 'Bad request' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
