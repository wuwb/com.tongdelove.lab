import { ConfigService as NestConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { ServerConfig } from './interface/server.config'
import { StaticConfig } from './interface/static.config'
import { AliossConfig } from './interface/alioss.config'
import { GeetestCaptchaConfig } from './interface/geetestCaptcha.config'
import { WeiboConfig } from './interface/weibo.config'
import { GithubConfig } from './interface/github.config'

const PRODUCTION = 'production'
const DEVELOPMENT = 'development'
const TEST = 'test'

@Injectable()
export class ConfigService extends NestConfigService {
  readonly environment: String
  readonly server: ServerConfig
  readonly static: StaticConfig
  readonly alioss: AliossConfig

  readonly geetestCaptcha: GeetestCaptchaConfig
  readonly github: GithubConfig
  readonly weibo: WeiboConfig

  constructor(private configService: NestConfigService) {
    super()

    this.environment = process.env.NODE_ENV || DEVELOPMENT

    // this.server = new ServerConfig(ConfigDefault.server);
    // this.static = new StaticConfig(ConfigDefault.static);
    // this.alioss = new AliossConfig(ConfigDefault.alioss);

    // this.geetestCaptcha = new GeetestCaptchaConfig(ConfigDefault.geetestCaptcha);
    // this.github = new GithubConfig(ConfigDefault.github);
    // this.weibo = new WeiboConfig(ConfigDefault.weibo);
  }

  // get isAuthEnabled(): boolean {
  //     return this.configService.get('AUTH_ENABLED') === 'true';
  // }

  public isDevMode() {
    return Object.is(this.environment, DEVELOPMENT)
  }

  public isProdMode() {
    return Object.is(this.environment, PRODUCTION)
  }

  public isTestMode() {
    return Object.is(this.environment, TEST)
  }
}
