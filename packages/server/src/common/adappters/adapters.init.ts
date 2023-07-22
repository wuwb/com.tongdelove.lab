import { ExpressAdapter } from '@nestjs/platform-express';
import { isDevMode } from '@/app.environment';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nunjucks from 'nunjucks';
import { Stream } from 'stream';
import * as Sentry from '@sentry/node';
import * as viewfilter from '@/utils/viewfilter';
import * as path from 'path';
import * as Tracing from '@sentry/tracing';
import { Client } from '@sentry/types';
import express from 'express';

export const initExpress = async () => {
    const server = express();
    const expressAdapter = new ExpressAdapter(server);
    return expressAdapter;
};

export const initView = (app) => {
    const configService = app.get(ConfigService);
    const baseViewDir = path.join(__dirname, '../views');
    const baseViewDirList = [baseViewDir];

    app.setBaseViewsDir(baseViewDirList);
    app.setViewEngine('html');

    const nunjucksEnv = nunjucks.configure(baseViewDirList, {
        express: app,
        autoescape: true,
        watch: true,
        noCache: process.env.NODE_ENV === 'development',
    });

    // 设置 view filter
    for (const key of Object.keys(viewfilter)) {
        nunjucksEnv.addFilter(key, viewfilter[key]);
    }

    // macro中不能访问当前 context , 将要访问的变量加到 global
    nunjucksEnv.addGlobal('env', configService.get('environment'));
    nunjucksEnv.addGlobal('jsPath', configService.get('static.jsPath'));
}

export const initPublic = (app, configService) =>{
    if (!configService.get('isDev')) {
        return;
    }

    const publicPath = path.resolve(__dirname, '../..', 'public');
    console.log('publicPath: ', publicPath);
    app.useStaticAssets(publicPath, {
        prefix: '/',
    });
}

export const initSsr = (app) =>{
    app.use(async (req, res) => {
        // 或者从 CDN 上下载到 server 端
        // const serverPath = await downloadServerBundle('http://cdn.com/bar/umi.server.js');
        const render = require('../../web/dist/umi.server');
        res.setHeader('Content-Type', 'text/html');

        const context = {};
        const { html, error, rootContainer } = await render({
            // 有需要可带上 query
            path: req.url,
            context,

            // 可自定义 html 模板
            // htmlTemplate: defaultHtml,

            // 启用流式渲染
            // mode: 'stream',

            // html 片段静态标记（适用于静态站点生成）
            // staticMarkup: false,

            // 扩展 getInitialProps 在服务端渲染中的参数
            // getInitialPropsCtx: {},

            // manifest，正常情况下不需要
        });

        // support stream content
        if (html instanceof Stream) {
            html.pipe(res);
            html.on('end', function () {
                res.end();
            });
        } else {
            res.send(res);
        }
    });
}

export const initGlobalFilters = (app, configService) =>{
    if (!configService.get('isDev')) {
        return;
    }
}

export const initSentry = (_app: INestApplication) => {
    const configService = _app.get(ConfigService);
    const sentryDsn = configService.get('sentryDsn');
  
    Sentry.init({
        dsn: sentryDsn,

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,

      debug: isDevMode,
      // would not report errors in dev mode
      enabled: Boolean(!isDevMode && sentryDsn),
      environment: process.env.ENV,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        // new Tracing.Integrations.Express({ app }),
        new Tracing.Integrations.Mysql(),
        new Sentry.Integrations.OnUncaughtException({
          onFatalError: (err) => {
            if (err.name === 'SentryError') {
              console.log(err);
            } else {
              (Sentry.getCurrentHub().getClient<Client>() as Client).captureException(err);
              process.exit(1);
            }
          },
        }),
        new Sentry.Integrations.OnUnhandledRejection({ mode: 'warn' }),
      ],
      ignoreErrors: ['ServerException', 'ApiException'],
    });
};
