import { Controller, Post, Body } from '@nestjs/common';
import { OmiseWebhookService } from './omise-webhook.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('omise-webhook')
@ApiTags('omise-webhook')
export class OmiseWebhookController {
  constructor(private readonly omiseWebhookService: OmiseWebhookService) {}

  @Post()
  async webhook(@Body() body: any) {
    console.log(body);
    return [];
  }
}
