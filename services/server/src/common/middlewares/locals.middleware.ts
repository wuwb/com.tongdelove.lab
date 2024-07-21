import { MyLoggerService } from '@/core/logger/winston/logger.service'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class LocalsMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: MyLoggerService
  ) {}

  use(request: Request, response: Response, next: () => void) {
    const req: any = request as any
    const res: any = response as any

    const configService = this.configService

    res.locals.env = configService.get('environment')
    res.locals.siteName = configService.get('server.siteName')
    res.locals.apiPrefix = configService.get('server.apiPrefix')
    res.locals.reqPath = req.originalUrl
    res.locals.staticURL = configService.get('static.staticURL')
    res.locals.cssPath = configService.get('static.cssPath')
    res.locals.jsPath = configService.get('static.jsPath')
    res.locals.imgPath = configService.get('static.imgPath')
    res.locals.fontPath = configService.get('static.fontPath')
    res.locals.userLevelChapterURL = configService.get(
      'static.userLevelChapterURL'
    )

    res.locals.globalConfig = {
      url: configService.get('server.url'),
      mURL: configService.get('server.mURL'),
      domain: configService.get('server.domain'),
      mDomain: configService.get('server.mDomain'),
      csrfToken: (req.csrfToken && req.csrfToken()) || '',
      apiPrefix: configService.get('server.apiPrefix'),
      imgPath: configService.get('static.imgPath'),
      jsPath: configService.get('static.jsPath'),
      cssPath: configService.get('static.cssPath'),
    }

    next()
  }
}
