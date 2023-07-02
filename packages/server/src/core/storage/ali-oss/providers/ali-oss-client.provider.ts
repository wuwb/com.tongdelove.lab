import { Provider } from '@nestjs/common';
import { OPTIONS_PROVIDER, ALI_OSS_CLIENT_PROVIDER } from '../constants/common.constant';
import AliOSS from 'ali-oss';

/** 创建阿里云OSS客户端 Provider */
export const createAliOSSClientProvider = (): Provider => ({
    provide: ALI_OSS_CLIENT_PROVIDER,
    useFactory: (options: any) => new AliOSS(options),
    inject: [OPTIONS_PROVIDER],
});
