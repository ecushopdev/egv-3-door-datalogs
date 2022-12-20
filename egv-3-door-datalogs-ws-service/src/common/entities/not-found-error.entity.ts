import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotFoundErrorEntity {
  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiProperty({ default: 'Not Found' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
