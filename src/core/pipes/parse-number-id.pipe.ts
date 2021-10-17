import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseNumberIdPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata): number {
    if (value > 0 && value % 1 === 0 && metadata.type == 'param') {
      return value;
    }

    throw new BadRequestException('Invalid parameter value');
  }
}
