import { IsOptional, IsBoolean, IsNumber, IsObject } from 'class-validator'

export class CreateCleaningJobDto {
  @IsOptional()
  @IsBoolean()
  deduplicate?: boolean

  @IsOptional()
  @IsBoolean()
  formatClean?: boolean

  @IsOptional()
  @IsBoolean()
  filterInvalid?: boolean

  @IsOptional()
  @IsObject()
  customConfig?: Record<string, any>

  @IsOptional()
  @IsNumber()
  batchSize?: number
}
