import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ValidateErrorEntity {
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({ default: 'Bad request' })
  error: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true })
  errorDetail: any[];
}
