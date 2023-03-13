import { IsString, IsInt, Min } from 'class-validator';
import { CreateCatInput } from '../schemas/graphql.schema';

export class CreateCatDto extends CreateCatInput {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsInt()
  @Min(1)
  readonly age: number;
}
