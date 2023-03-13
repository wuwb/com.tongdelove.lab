import { AkismetClientOptions } from 'akismet-api';
import * as path from 'path';

export default {
  apiPath: 'api',
  adminPath: 'api/admin',
  defaultAccount: 'admin',
  defaultPassword: '123456',
  /**token失效时间为1天 */
  tokenExpire: 1,
};

export const COMMON_SERVICE = {
  aliyunIPAuth: '',
  juheIPAuth: '',
};

export const BAIDU_INDEXED = {
  site: 'your baidu site domain.',
  token: 'your baidu seo push token.',
};

export const GOOGLE = {
  serverAccountFilePath: path.resolve(
    __dirname,
    '..',
    'classified',
    'google_service_account.json',
  ),
};

export const ALIYUN_CLOUD_STORAGE = {
  accessKey:
    'cloudstorage access key for cloud storage',
  secretKey:
    'cloudstorage secret key for cloud storage',
  aliyunAcsARN:
    'aliyun Acs ARN, e.g. acs:ram::xxx:role/xxx',
};

export const EMAIL = {
  account: 'your email address.',
  password: 'your email password',
  from: '"WuWenbin" <i@printlake.com>',
  admin: '541330190@qq.com',
};

export const AKISMET: AkismetClientOptions = {
  key: 'your akismet Key',
  blog: 'your akismet blog site',
};
