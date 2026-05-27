import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  slug: string

  @IsOptional()
  @IsNumber()
  type?: number

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  keywords?: string

  @IsOptional()
  @IsNumber()
  pid?: number

  @IsOptional()
  @IsString()
  icon_url?: string

  @IsOptional()
  @IsString()
  pic_url?: string

  @IsOptional()
  @IsString()
  level?: string

  @IsOptional()
  @IsNumber()
  sort?: number

  @IsOptional()
  @IsString()
  articleId?: string

  @IsOptional()
  @IsString()
  createdBy?: string

  @IsOptional()
  @IsString()
  updatedBy?: string

  @IsOptional()
  @IsString()
  remark?: string

  @IsOptional()
  @IsNumber()
  version?: number

  @IsOptional()
  @IsString()
  label?: string

  @IsOptional()
  @IsString()
  value?: string

  @IsOptional()
  @IsNumber()
  order?: number

  @IsOptional()
  @IsBoolean()
  onlyChild?: boolean

  @IsOptional()
  @IsString()
  parentId?: string
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsOptional()
  @IsNumber()
  type?: number

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  keywords?: string

  @IsOptional()
  @IsNumber()
  pid?: number

  @IsOptional()
  @IsString()
  icon_url?: string

  @IsOptional()
  @IsString()
  pic_url?: string

  @IsOptional()
  @IsString()
  level?: string

  @IsOptional()
  @IsNumber()
  sort?: number

  @IsOptional()
  @IsString()
  articleId?: string

  @IsOptional()
  @IsString()
  updatedBy?: string

  @IsOptional()
  @IsString()
  remark?: string

  @IsOptional()
  @IsNumber()
  version?: number

  @IsOptional()
  @IsString()
  label?: string

  @IsOptional()
  @IsString()
  value?: string

  @IsOptional()
  @IsNumber()
  order?: number

  @IsOptional()
  @IsBoolean()
  onlyChild?: boolean

  @IsOptional()
  @IsString()
  parentId?: string
}

export class MoveCategoryDto {
  @IsString()
  @IsNotEmpty()
  targetParentId: string | null
}
