import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ChargesPromptPayPaymentDto } from './dto/charges-prompt-pay-payment.dto';
import { map } from 'rxjs';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.request.use((req) => {
      let headers = {};
      headers['Authorization'] =
        'Basic c2tleV90ZXN0XzV0dmo5c3dhN2M5M25yemQ1eTQ=';
      req.headers = { ...req.headers, ...headers };
      return req;
    });
  }

  @Post('charges/promptpay')
  charges(@Body() chargesPromptPayPaymentDto: ChargesPromptPayPaymentDto): any {
    const data = {
      source: { type: 'promptpay' },
      ...chargesPromptPayPaymentDto,
    };
    return this.httpService.post('https://api.omise.co/charges', data).pipe(
      map((res) => {
        if (res.status === 200) {
          return res.data.source.scannable_code;
        }
        return res.data;
      }),
    );
  }
}
