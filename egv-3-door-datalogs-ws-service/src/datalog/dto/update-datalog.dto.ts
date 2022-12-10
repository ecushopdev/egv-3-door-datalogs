import { PartialType } from '@nestjs/swagger';
import { CreateDatalogDto } from './create-datalog.dto';

export class UpdateDatalogDto extends PartialType(CreateDatalogDto) {}
