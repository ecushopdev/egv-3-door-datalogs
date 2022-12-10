import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDatalogDto } from './dto/create-datalog.dto';
import { DataLog, DataLogDocument } from './schemas/datalog.schema';

@Injectable()
export class DatalogService {
  constructor(
    @InjectModel(DataLog.name)
    private readonly dataLogModel: Model<DataLogDocument>,
  ) {}

  async create(createDataLogDto: CreateDatalogDto): Promise<DataLog> {
    return await this.dataLogModel.create(createDataLogDto);
  }

  async findAll(): Promise<DataLog[]> {
    return this.dataLogModel.find().exec();
  }

  async findOne(id: string): Promise<DataLog> {
    return this.dataLogModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return await this.dataLogModel.findByIdAndRemove({ _id: id }).exec();
  }
}
