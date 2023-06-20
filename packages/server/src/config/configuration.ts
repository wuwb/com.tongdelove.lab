import { Logger } from '@nestjs/common';

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
});
