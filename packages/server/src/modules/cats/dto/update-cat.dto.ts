import { PartialType } from '@nestjs/swagger';
import { CreateCatDto } from '../dto/create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {}
