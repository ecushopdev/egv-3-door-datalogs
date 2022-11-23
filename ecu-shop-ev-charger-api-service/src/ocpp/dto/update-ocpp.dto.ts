import { PartialType } from '@nestjs/mapped-types';
import { CreateOcppDto } from './create-ocpp.dto';

export class UpdateOcppDto extends PartialType(CreateOcppDto) {
  id: number;
}
