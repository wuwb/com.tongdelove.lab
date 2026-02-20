import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator'

export class TemuRequestDto {
  @IsNotEmpty()
  @IsString()
  url: string

  @IsNotEmpty()
  @IsString()
  method: string

  @IsOptional()
  @IsString()
  requestId?: string

  @IsOptional()
  @IsObject()
  requestHeaders?: Record<string, any>

  @IsOptional()
  requestBody?: any

  @IsNotEmpty()
  @IsNumber()
  responseStatus: number

  @IsOptional()
  @IsString()
  responseText?: string

  @IsOptional()
  @IsObject()
  responseHeaders?: Record<string, any>

  @IsOptional()
  responseBody?: any

  @IsOptional()
  @IsDate()
  capturedAt?: Date

  @IsOptional()
  @IsEnum(['fetch', 'xhr'])
  requestType?: 'fetch' | 'xhr'

  @IsOptional()
  @IsString()
  userAgent?: string
}

export class BatchCreateTemuRequestDto {
  @IsNotEmpty()
  requests: TemuRequestDto[]

  @IsOptional()
  @IsString()
  userId?: string

  @IsOptional()
  @IsString()
  deviceId?: string
}
