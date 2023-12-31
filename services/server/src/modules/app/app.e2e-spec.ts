import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';

describe('App', () => {
    let app: INestApplication;
    let appService = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(AppService)
            .useValue(appService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET app`, () => {
        return request(app.getHttpServer()).get('/app').expect(200).expect({
            data: appService.findAll(),
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
