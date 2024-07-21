import { Controller, Put, UseGuards, Param } from '@nestjs/common'
import { Roles } from '@/common/decorators/roles.decorator'
import { ArticleService } from './article.service'

@Controller('api/articles')
// @Roles(UserRole.Editor, UserRole.Admin, UserRole.SuperAdmin)
// @UseGuards(ActiveGuard, RolesGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Put(`allverifyfail/:userID`)
  async allVerifyFail(@Param('userID') userID: string) {
    await Promise.all([this.articleService.allVerifyFail(userID)])
    return {}
  }
}
