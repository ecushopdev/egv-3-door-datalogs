import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateDatalogDto } from './dto/create-datalog.dto';
import { DatalogInterface } from './interfaces/datalog.interface';

@Injectable()
export class DatalogService {
  constructor(
    @Inject('DATALOG_MODEL')
    private readonly datalogModel: Model<DatalogInterface>,
  ) {}

  async create(createDataLogDto: CreateDatalogDto): Promise<DatalogInterface> {
    return this.datalogModel.create(createDataLogDto);
  }
}
