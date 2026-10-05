import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabLinkService } from './link.service'

@ApiTags('lab/link')
@Controller('api/lab/link')
export class LabLinkController {
  constructor(private readonly linkService: LabLinkService) {}

  @Get('list')
  getLinks() {
    return this.linkService.getLinks()
  }
}
