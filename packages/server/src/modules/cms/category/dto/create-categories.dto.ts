import { Categories } from '../entities/categories.entity';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateCategoriesDto extends Categories {
  @IsString({ message: 'Informe o nome da categoria.' })
  name_category: string;

  @IsString({ message: 'Informe o banner (link) da categoria.' })
  banner_category: string;

  @IsString({ message: 'Informe a foto da categoria.' })
  picture_category: string;

  @IsString({ message: 'Informe o status da categoria.' })
  status_category: string;

  @IsNumber({}, { message: 'Informe o contador de visitas.' })
  counter_views_category: number;

  @IsString({ message: 'Informe o descrição da categoria.' })
  description?: string;
}
