import { Module } from '@nestjs/common';
import { OfficialModule } from '@iot9x.com/nestjs-official'

// @see https://docs.iot9x.com/docs/nestjs/8/公众号/安装配置/
@Module({
    imports: [
        OfficialModule.forRoot({
            redis: {   // redisOptions 参数选填
                host: 'localhost',
                port: 6379,
                db: 1,
                password: '',
                keyPrefix: 'official-'
            },
            config: [{
                appid: '公众号appid',
                appSecret: '公众号app secret',
                authToken: '微信调用第三方服务器token',
                encodingAESKey: '微信调用第三方服务器消息加密解密秘钥',
            }],
            initAccessToken: true // 是否在初始化的时候获取Access Token
        })
    ]
})
export class AppModule { }
