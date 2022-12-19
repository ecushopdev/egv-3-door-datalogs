import { Injectable } from '@nestjs/common';
import { DataLogs, DataLogsDocument } from './schema/datalogs.schema';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
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

  async createMany(createCatDto: CreateDatalogDto[]): Promise<DataLogs[]> {
    return await this.dataLogsModel.insertMany(createCatDto);
  }

  async findAll(param: {
    filter?: FilterQuery<DataLogs>;
    projection?: ProjectionType<DataLogs>;
    options?: QueryOptions<DataLogs>;
  }): Promise<DataLogs[]> {
    const { filter, projection, options } = param;
    return this.dataLogsModel.find(filter, projection, options).exec();
  }
}
