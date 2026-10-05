import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabAppleGuideService } from './apple-guide.service'

@ApiTags('lab/apple-guide')
@Controller('api/lab/apple-guide')
export class LabAppleGuideController {
  constructor(private readonly appleGuideService: LabAppleGuideService) {}

  @Get('list')
  getAll() {
    return this.appleGuideService.getAll()
  }
}
