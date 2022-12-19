import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class UnsupportedMediaTypeErrorEntity {
  @ApiProperty({ default: HttpStatus.UNSUPPORTED_MEDIA_TYPE })
  statusCode: number;

  @ApiProperty({ default: 'Unsupported Media Type' })
  error: string;

  @ApiPropertyOptional()
  message?: string;
}
