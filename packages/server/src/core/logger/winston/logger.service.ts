import {
    Injectable,
    Logger,
    ConsoleLogger,
    ConsoleLoggerOptions,
    LoggerService,
    Scope,
} from '@nestjs/common';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { isObject } from '@/utils/type';

const isDevMod = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line
type ObjectType = Record<string, any>;

const transportsHandler = () => {
    const transportsList: winston.transport[] = [
        new DailyRotateFile({
            // filename: 'logs/error-%DATE%.log',
            filename: path.join(process.cwd(), 'logs', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        }),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'info-%DATE%.log'),
            // 按天存放
            // datePattern: 'YYYY-MM-DD',
            // 按小时来
            datePattern: 'YYYY-MM-DD-HH',
            // 自动压缩
            zippedArchive: true,
            handleExceptions: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'silly',
        }),
    ];
    if (isDevMod) {
        transportsList.push(new winston.transports.Console({}));
    }
    return transportsList;
};

@Injectable({ scope: Scope.TRANSIENT }) // 独立线程
export class MyLoggerService extends ConsoleLogger implements LoggerService {
    private logger: winston.Logger;

    constructor(context: string, options: ConsoleLoggerOptions) {
        super(context, options);

        this.logger = winston.createLogger({
            level: process.env.NODE_ENV != 'production' ? 'silly' : 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                winston.format.colorize(),
                // 自定义输出代码格式
                winston.format.printf(({ prefix, level, timestamp, message }) => {
                    return `[${timestamp}] [${level}]【${context}】${prefix ? `-【${prefix}】` : ''
                        } ${message}`;
                }),
            ),
            transports: transportsHandler(),
        });
    }

    // log level custom
    public log(message: string | ObjectType, optionalParams?): void {
        this.logger.info(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 0
    public error(message: string | ObjectType, optionalParams?): void {
        this.logger.error(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 1
    public warn(message: string | ObjectType, optionalParams?): void {
        this.logger.warn(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 2
    public info(message: string | ObjectType, optionalParams?): void {
        this.logger.info(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 3
    public http(message: string | ObjectType, optionalParams?): void {
        this.logger.http(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 4
    public verbose(message: string | ObjectType, optionalParams?): void {
        this.logger.verbose(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 5
    public debug(message: string | ObjectType, optionalParams?): void {
        this.logger.debug(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    // log level 6
    public silly(message: string | ObjectType, optionalParams?): void {
        this.logger.silly(this.toString(message), {
            prefix: optionalParams?.prefix,
        });
    }

    private toString(message: string | ObjectType): string {
        if (isObject(message)) {
            return JSON.stringify(message, null, 2);
        } else {
            return message as string;
        }
    }
}
