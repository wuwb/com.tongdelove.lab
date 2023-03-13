import { registerAs } from '@nestjs/config';

export interface SwaggerConfig {
  root: string;
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export default registerAs('swagger', (): SwaggerConfig => {
  return {
    root: '/docs',
    enabled: false,
    title: 'Users Restful API',
    description: 'The users Restful API description',
    version: '1.0.0',
    path: '',
  };
});
