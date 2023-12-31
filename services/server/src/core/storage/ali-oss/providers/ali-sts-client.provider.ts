import { ALI_STS_CLIENT_PROVIDER, OPTIONS_PROVIDER } from '../constants/common.constant';
import AliOSS from 'ali-oss';

/** 创建阿里云STS客户端 Provider */
export const createAliSTSClientProvider = () => ({
    provide: ALI_STS_CLIENT_PROVIDER,
    useFactory: ({ sts: options }) => options && new AliOSS.STS(options),
    inject: [OPTIONS_PROVIDER],
});
