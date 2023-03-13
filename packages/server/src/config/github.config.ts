import { registerAs } from '@nestjs/config';

export default registerAs('github', () => ({
  accessTokenURL: '/api',
  clientID: '',
  clientSecret: '',
}));



