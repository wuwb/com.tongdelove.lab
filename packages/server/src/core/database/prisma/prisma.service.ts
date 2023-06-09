import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    constructor() {
        // pass PrismaClientOptions e.g. logging levels or error formatting
        super({
            log: ['query', 'info', 'warn', 'error'],
            errorFormat: 'pretty',
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            console.log('Prisma beforeExit hook.');

            // PrismaClient still available，记录系统日志
            // await this.log.create({
            //   data: {
            //   },
            // })

            await app.close();
        });
    }
}
