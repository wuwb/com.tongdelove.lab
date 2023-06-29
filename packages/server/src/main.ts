import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { bootstrap } from './bootstrap';
import { sendServerLoadEvent } from './utils/sendServerLoadEvent';
import { AppModule } from './modules/app/app.module';

declare const module: any;

async function main() {
    /**
     * Send server load notification:
     * sending runtime environment details.
     *
     * To disable event tracking set DISABLE_EVENT_TRACKING to 1
     *
     * To find more information regarding this feature visit https://docs.amplication.com/
     */
    // if (
    //     !process.env.DISABLE_EVENT_TRACKING ||
    //     process.env.DISABLE_EVENT_TRACKING == "0"
    // ) {
    //     sendServerLoadEvent();
    // }

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // logger: process.env.NODE_ENV === 'development' ? new Logger() : false,
        // logger: isProdMode ? false : logger,
        // 开启日志级别打印
        // logger: !isProdMod ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
        // httpsOptions,
        // bufferLogs: true,
        // autoFlushLogs: true,
        // logger: logger,
        // cors: true,
    });

    await bootstrap(app)
        .then(() => {
            console.log('bootstrap done.');
        })
        .catch((error) => {
            console.log('bootstrap error.');
            console.error(error);
            process.exit(1);
        })
        .finally(async () => {
            console.log('bootstrap finally.');
        });

    // if (module.hot) {
    //     module.hot.accept();
    //     module.hot.dispose(() => app.close());
    // }
}

main();
