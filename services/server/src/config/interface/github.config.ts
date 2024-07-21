import { BaseConfig } from './base.config'

export class GithubConfig extends BaseConfig {
  readonly clientID: string
  readonly clientSecret: string
  readonly accessTokenURL: string
  readonly userInfoURL: string
  readonly authorizeURL: string

  constructor(cfg) {
    super(cfg)
  }
}
