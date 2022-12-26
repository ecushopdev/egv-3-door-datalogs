import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnsupportedMediaTypeException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class VideoValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined) throw new BadRequestException();
    if (value.mimetype !== 'video/mp4') {
      throw new UnsupportedMediaTypeException('This image type not allow.');
    }
    return value;
  }
}
