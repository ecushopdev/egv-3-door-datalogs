import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class PayloadTooLargeErrorEntity {
  @ApiProperty({ default: HttpStatus.PAYLOAD_TOO_LARGE })
  statusCode: number;

  @ApiProperty({ default: 'Payload Too Large' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
