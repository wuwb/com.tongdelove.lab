import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  apiPrefix: '/api',
  port: 7001,
}));
