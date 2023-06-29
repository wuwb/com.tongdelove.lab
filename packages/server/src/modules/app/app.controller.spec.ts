import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: {
                        constructor: jest.fn(),
                        getHello: jest.fn(),
                    },
                },
            ],
        }).compile();
        appService = app.get(AppService);
        appController = app.get(AppController);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(appController).toBeDefined();
        });

        it('should return "Hello World!"', () => {
            //  jest.spyOn(service, "getHello").mockReturnValue("Hello");
            expect(appController.getRoot()).toBe('Hello World!');
        });
    });
});
