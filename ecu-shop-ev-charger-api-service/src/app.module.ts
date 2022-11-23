import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { OmiseWebhookModule } from './omise-webhook/omise-webhook.module';
import { OcppModule } from './ocpp/ocpp.module';

@Module({
  imports: [PaymentModule, OmiseWebhookModule, OcppModule],
})
export class AppModule {}
