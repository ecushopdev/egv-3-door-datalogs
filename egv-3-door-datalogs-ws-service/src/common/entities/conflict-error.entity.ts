import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConflictErrorEntity {
  @ApiProperty({ default: HttpStatus.CONFLICT })
  statusCode: number;

  @ApiProperty({ default: 'Conflict' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
