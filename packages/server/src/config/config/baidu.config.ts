import { registerAs } from '@nestjs/config';

export default registerAs('baidu', () => ({
  site: process.env.baidu_site || 'your baidu site domain.',
  token: process.env.baidu_token || 'your baidu seo push token.',
}));
