import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import {
  FilterQuery,
  Model,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { Races, RacesDocument } from './schema/race.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class RacesService {
  constructor(
    @InjectModel(Races.name) private readonly racesModel: Model<RacesDocument>,
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    return await this.racesModel.create(createRaceDto);
  }

  async findAll(param: {
    filter?: FilterQuery<Races>;
    projection?: ProjectionType<Races>;
    options?: QueryOptions<Races>;
  }) {
    const { filter, projection, options } = param;
    return await this.racesModel.find(filter, projection, options).exec();
  }

  async findOne(id: string) {
    return await this.racesModel.findOne({ _id: id }).exec();
  }

  async findOneAggregation(id: string) {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'DataLogs',
          localField: '_id',
          foreignField: 'race',
          as: 'dataLogs',
        },
      },
      {
        $addFields: {
          id: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
          'dataLogs._id': 0,
          'dataLogs.race': 0,
          'dataLogs.createdAt': 0,
        },
      },
    ];
    const response = await this.racesModel.aggregate(pipeline).exec();
    if (!response[0]) return null;
    return response[0];
  }

  async update(id: string, update: UpdateQuery<Races>) {
    return await this.racesModel
      .findOneAndUpdate({ _id: id }, update, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.racesModel.findByIdAndRemove({ _id: id }).exec();
  }
}
