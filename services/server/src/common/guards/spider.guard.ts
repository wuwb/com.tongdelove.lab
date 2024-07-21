/**
 * @module common/guard/spider.guard
 * @description 禁止爬虫的守卫
 */
import { Observable } from 'rxjs'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'

@Injectable()
export class SpiderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const headers = request.headers
    const ua: string = headers['user-agent'] || ''
    const isSpiderUA =
      !!ua.match(/(Scrapy|HttpClient|axios|python|requests)/i) &&
      !ua.match(/(mx-space|rss|google|baidu|bing)/gi)

    if (ua && isSpiderUA) {
      throw new ForbiddenException(`爬虫是被禁止的哦，UA: ${ua}`)
    }

    return true
  }
}
