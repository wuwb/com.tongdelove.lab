import { Logger } from '@nestjs/common';
import { AkismetClientOptions } from 'akismet-api';
import * as path from 'path';

// 判断系统是否是开发环境
export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

export default () => ({
    port: parseInt(process.env.PORT ? process.env.PORT : '3000', 10),

    isDev: process.env.NODE_ENV === 'development',

    environment: process.env.NODE_ENV || 'development',
    static: {
        jsPath: './dist/client/js',
    },
    defaultAccount: 'admin',
    defaultPassword: '123456',

    apiPath: 'api',
    adminPath: 'api/admin',
    /**token失效时间为1天 */
    tokenExpire: 1,

    email: {
        account: 'your email address.',
        password: 'your email password',
        from: '"WuWenbin" <i@printlake.com>',
        admin: '541330190@qq.com',
    },

    AKISMET: {
        key: 'your akismet Key',
        blog: 'your akismet blog site',
    } as AkismetClientOptions,

    ALIYUN_CLOUD_STORAGE: {
        accessKey: 'cloudstorage access key for cloud storage',
        secretKey: 'cloudstorage secret key for cloud storage',
        aliyunAcsARN: 'aliyun Acs ARN, e.g. acs:ram::xxx:role/xxx',
    },

    BAIDU_INDEXED: {
        site: 'your baidu site domain.',
        token: 'your baidu seo push token.',
    },

    COMMON_SERVICE: {
        aliyunIPAuth: '',
        juheIPAuth: '',
    },

    GOOGLE: {
        serverAccountFilePath: path.resolve(__dirname, '../classified/google_service_account.json'),
    }
});
