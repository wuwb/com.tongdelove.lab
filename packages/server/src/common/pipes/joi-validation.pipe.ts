import * as Joi from 'joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return this.schema.validateAsync(value);
    } catch (err) {
      throw new BadRequestException('Joi Validation failed');
    }
  }
}
