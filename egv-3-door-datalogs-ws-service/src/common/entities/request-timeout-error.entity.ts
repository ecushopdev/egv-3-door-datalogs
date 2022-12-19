import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestTimeoutErrorEntity {
  @ApiProperty({ default: HttpStatus.REQUEST_TIMEOUT })
  statusCode: number;

  @ApiProperty({ default: 'Request Timeout' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
