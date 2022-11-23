import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChargesPromptPayPaymentDto {
  @ApiProperty({ type: Number })
  amount: number = undefined;

  @ApiProperty({ type: String })
  currency: string = undefined;

  @ApiPropertyOptional({ type: Object })
  metadata: object = undefined;
}
