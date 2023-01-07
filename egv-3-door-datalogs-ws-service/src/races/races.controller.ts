import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RaceEntity } from './entities/race.entity';
import { FilterQuery, UpdateQuery } from 'mongoose';
import dayjs from 'dayjs';
import { ParseObjectIdPipe } from '../common/pipe/ParseObjectId.pipe';
import { Races, RaceStatus } from './schema/race.schema';
import { Request, Response } from 'express';
import { WsGateway } from '../ws/ws.gateway';
import { CreateDatalogDto } from '../datalogs/dto/create-datalog.dto';
import { NotFoundErrorEntity } from '../common/entities/not-found-error.entity';
import { DataLogsService } from '../datalogs/datalogs.service';
import { BadRequestErrorEntity } from '../common/entities/bad-request-error.entity';
import { RaceOneEntity } from './entities/race-one.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoValidatePipe } from '../common/pipe/video-validate.pipe';
import { S3 } from 'aws-sdk';
import { UploadService } from '../upload/upload.service';
import { InjectS3, S3 as NestJsS3 } from 'nestjs-s3';
import { RaceDatalogsEntity } from './entities/race-datalogs.entity';
import { DataLogs } from '../datalogs/schema/datalogs.schema';

@Controller('races')
@ApiTags('Races')
export class RacesController {
  constructor(
    private readonly racesService: RacesService,
    private readonly datalogsService: DataLogsService,
    private readonly uploadService: UploadService,
    private readonly wsGateway: WsGateway,
    @InjectS3() private readonly s3: NestJsS3,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: RaceEntity })
  async create(@Body() createRaceDto: CreateRaceDto) {
    const data = {
      startTimestamp: dayjs().toDate(),
      timeout1: createRaceDto.timeout1,
      timeout2: createRaceDto.timeout2,
    };
    const response = await this.racesService.create(data);
    this.wsGateway.broadcastStatus(response);
    return response;
  }

  @Get()
  @ApiOkResponse({ type: RaceEntity, isArray: true })
  findAll() {
    return this.racesService.findAll({});
  }

  @Get(':id')
  @ApiOkResponse({ type: RaceOneEntity })
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  async findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    const response = await this.racesService.findOne(id);
    if (!response) {
      throw new NotFoundException('Not found race');
    }
    return response;
  }

  @Patch(':id')
  @ApiOkResponse({ type: RaceEntity })
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  @ApiBadRequestResponse({ type: BadRequestErrorEntity })
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateRaceDto: UpdateRaceDto,
  ) {
    const race = await this.racesService.findOne(id);
    if (race.stopTimestamp) {
      throw new BadRequestException('This race is finished');
    }
    let data: UpdateQuery<Races> = {
      ...updateRaceDto,
    };
    if (
      updateRaceDto.status === RaceStatus.Finish ||
      updateRaceDto.status === RaceStatus.Failed
    ) {
      data = {
        ...data,
        stopTimestamp: dayjs().toDate(),
      };
    }
    const response = await this.racesService.update(id, data);
    this.wsGateway.broadcastStatus(response);
    return response;
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Res() res: Response,
  ) {
    await this.racesService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post(':id/datalogs')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  @ApiBadRequestResponse({ type: BadRequestErrorEntity })
  @ApiBody({ type: CreateDatalogDto, isArray: true })
  async addDataLogs(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() createDatalogDto: CreateDatalogDto[],
    @Res() res: Response,
  ) {
    const race = await this.racesService.findOne(id);
    if (!race) {
      throw new NotFoundException('Not found race');
    }
    if (race.stopTimestamp) {
      throw new BadRequestException('This race is finished');
    }
    const data: CreateDatalogDto[] = createDatalogDto.map((item) => ({
      ...item,
      race: id,
    }));
    await this.datalogsService.createMany(data);
    this.wsGateway.broadcastNotification({
      title: `Save Logs ${id} success`,
      data: { id },
    });
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':id/datalogs')
  @ApiOkResponse({ type: RaceDatalogsEntity, isArray: true })
  @ApiNotFoundResponse({ type: NotFoundErrorEntity })
  async findDataLogs(@Param('id', new ParseObjectIdPipe()) id: string) {
    const filter: FilterQuery<DataLogs> = {
      race: id,
    };
    const response = await this.datalogsService.findAll({ filter });
    if (!response) {
      throw new NotFoundException('Not found race');
    }
    return response;
  }

  @Post(':id/video')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiNoContentResponse()
  async uploadVideo(
    @UploadedFile(new VideoValidatePipe()) file: Express.Multer.File,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const params: S3.Types.PutObjectRequest = {
        Bucket: process.env.S3_BUCKET,
        Key: `videos/${file.originalname}`,
        Body: Buffer.from(file.buffer.toString('base64'), 'base64'),
        ContentEncoding: 'base64',
        ContentType: file.mimetype,
        Metadata: {
          videoId: id,
        },
      };
      await this.uploadService.uploadFile(params);
      await this.racesService.update(id, {
        videoUrl: `/egv/api/v1/races/${id}/video`,
      });
      this.wsGateway.broadcastNotification({
        title: `Save Video Log ${id} success`,
        data: { id },
      });
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (e: any) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get(':id/video')
  async getVideo(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const range: any = req.headers.range;
      if (!range) {
        const result: any = await this.uploadService.getFile({
          Bucket: process.env.S3_BUCKET,
          Key: `videos/${id}.mp4`,
        });
        res.writeHead(200, {
          'Content-Type': result.ContentType,
          'Cross-Origin-Resource-Policy': 'no-cors',
        });
        return res.end(result.Body);
      }

      const videoHeader: any = await this.uploadService.getHeaderFile({
        Bucket: process.env.S3_BUCKET,
        Key: `videos/${id}.mp4`,
      });

      const videoSize = videoHeader.ContentLength;

      const chunkSize = 10 ** 6;

      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + chunkSize, videoSize - 1);
      const contentLength = end - start + 1;
      const Range = `bytes ${start}-${end}/${videoSize}`;
      const headers = {
        'Content-Range': Range,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, headers);

      const videoStream = await this.s3
        .getObject({
          Bucket: process.env.S3_BUCKET,
          Key: `videos/${id}.mp4`,
          Range: range,
        })
        .createReadStream();

      videoStream.pipe(res);
    } catch (e: any) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
