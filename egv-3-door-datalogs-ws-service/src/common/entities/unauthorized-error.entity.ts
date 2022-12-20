import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedErrorEntity {
  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  statusCode: number;

  @ApiProperty({ default: 'Unauthorized' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
