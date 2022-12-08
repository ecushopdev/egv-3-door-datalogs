import { Module } from '@nestjs/common';
import { OmiseWebhookService } from './omise-webhook.service';
import { OmiseWebhookController } from './omise-webhook.controller';

@Module({
  controllers: [OmiseWebhookController],
  providers: [OmiseWebhookService],
})
export class OmiseWebhookModule {}
