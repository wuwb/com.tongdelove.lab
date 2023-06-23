import { registerAs } from '@nestjs/config';

export default registerAs('wechat', () => ({
    appid: '',
    mchid: '',
    providerappid: '',
    providemchid: '',
    apikey: '',
    apikey3: '',
    domain: '',
    certpath: '',
    certp12path: '',
    keypath: '',
}));
