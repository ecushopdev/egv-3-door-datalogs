import { Injectable } from '@nestjs/common';
import { CreateDatalogDto } from './dto/create-datalog.dto';
import { UpdateDatalogDto } from './dto/update-datalog.dto';

@Injectable()
export class DatalogService {
  create(createDatalogDto: CreateDatalogDto) {
    return 'This action adds a new datalog';
  }

  findAll() {
    return `This action returns all datalog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datalog`;
  }

  update(id: number, updateDatalogDto: UpdateDatalogDto) {
    return `This action updates a #${id} datalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} datalog`;
  }
}
