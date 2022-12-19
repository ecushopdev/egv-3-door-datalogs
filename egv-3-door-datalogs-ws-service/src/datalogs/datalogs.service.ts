import { Injectable } from '@nestjs/common';
import { DataLogs, DataLogsDocument } from './schema/datalogs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDatalogDto } from './dto/create-datalog.dto';

@Injectable()
export class DataLogsService {
  constructor(
    @InjectModel(DataLogs.name)
    private readonly dataLogsModel: Model<DataLogsDocument>,
  ) {}

  async create(createCatDto: CreateDatalogDto): Promise<DataLogs> {
    return await this.dataLogsModel.create(createCatDto);
  }
}
