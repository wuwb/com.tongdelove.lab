import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class FindPoemDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number

  @IsOptional()
  @IsEnum(['updatedAt', 'improve', 'createdAt'])
  sort?: 'updatedAt' | 'improve' | 'createdAt'
}

export class FindPoemByAuthorDto {
  @Type(() => Number)
  @IsInt()
  authorId: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number

  @IsOptional()
  @IsArray()
  @IsEnum(['title', 'titlePinYin', 'content', 'views', 'author'], { each: true })
  select?: Array<'title' | 'titlePinYin' | 'content' | 'views' | 'author'>
}

export class IsSamePoemDto {
  @Type(() => Number)
  @IsInt()
  authorId: number

  @IsString()
  title: string
}

export class FindByTagDto {
  @Type(() => Number)
  @IsInt()
  id: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number
}

export class FindByIdDto {
  @Type(() => Number)
  @IsInt()
  id: number
}

export class DeletePoemDto extends FindByIdDto {
  @IsString()
  token: string
}

export class SearchPoemDto {
  @IsOptional()
  @IsString()
  keyword?: string
}

export class GenTranslationDto {
  @IsString()
  token: string

  @IsString()
  content: string
}

export class FindAuthorDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number

  @IsOptional()
  @IsString()
  keyword?: string
}

export class IdParamDto {
  @Type(() => Number)
  @IsInt()
  id: number
}

export class DeleteAuthorDto extends IdParamDto {
  @IsString()
  token: string
}

export class CreateAuthorDto {
  @IsString()
  token: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number

  @IsString()
  name: string

  @IsOptional()
  @IsString()
  nameZhHant?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  birthDate?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  deathDate?: number

  @IsOptional()
  @IsString()
  introduce?: string

  @IsOptional()
  @IsString()
  namePinYin?: string

  @IsString()
  dynasty: string
}

export class FindTagDto {
  @IsOptional()
  @IsString()
  type?: string | null

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number
}

export class TagSitemapDto {
  @IsOptional()
  @IsString()
  type?: string
}

export class CreateTagDto {
  @IsString()
  token: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number

  @IsString()
  name: string

  @IsOptional()
  @IsString()
  nameZhHant?: string

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsString()
  typeZhHant?: string

  @IsOptional()
  @IsString()
  introduce?: string

  @IsOptional()
  @IsString()
  introduceZhHant?: string
}

export class ConnectPoemsTagDto {
  @IsString()
  token: string

  @IsArray()
  @IsInt({ each: true })
  ids: number[]

  @Type(() => Number)
  @IsInt()
  tagId: number
}

export class FindPoemsNeedCardDto {
  @IsString()
  token: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsString()
  tagName?: string
}

export class CreateCardItemDto {
  @IsString()
  token: string

  @Type(() => Number)
  @IsInt()
  poemId: number

  @IsString()
  content: string

  @IsString()
  url: string
}

export class FindCardsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number
}

export class FindCardQuotaPoemsDto {
  @IsString()
  token: string

  @IsArray()
  @IsString({ each: true })
  quotas: string[]
}
