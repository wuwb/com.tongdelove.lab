import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Paramtype,
} from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ApiException } from '@/common/exceptions/api.exception';

@Injectable()
export class MustIntPipe implements PipeTransform<string, number> {
    constructor(
        private readonly configService: ConfigService,
    ) { }

    transform(value: string, metadata: ArgumentMetadata): any {
        if (metadata.type !== 'param' && metadata.type !== 'query') {
            return value;
        }
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new ApiException(10000);
        }
        // value 为 12.html 时，转成整数 val 为 12，这时也应该返回 404
        if (val + '' !== value) {
            throw new ApiException(10000);
        }
        return val;
    }
}
