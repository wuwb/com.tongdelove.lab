import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class CustomGlobalPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        return value;
    }
}
