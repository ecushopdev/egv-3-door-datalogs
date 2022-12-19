import { Injectable } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Races, RacesDocument } from './schema/race.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RacesService {
  constructor(
    @InjectModel(Races.name) private readonly racesModel: Model<RacesDocument>,
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    return await this.racesModel.create(createRaceDto);
  }

  async findAll() {
    return await this.racesModel.find().exec();
  }

  async findOne(id: MongooseSchema.Types.ObjectId) {
    return await this.racesModel.findOne({ _id: id }).exec();
  }

  async update(
    id: MongooseSchema.Types.ObjectId,
    updateRaceDto: UpdateRaceDto,
  ) {
    return await this.racesModel.updateOne({ _id: id }, updateRaceDto).exec();
  }

  async remove(id: MongooseSchema.Types.ObjectId) {
    return await this.racesModel.findByIdAndRemove({ _id: id }).exec();
  }
}
