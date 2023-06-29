import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from '@/modules/system/auth/auth.service';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { UserModule } from './user.module';
import { CoreModule } from '@/core/core.module';

describe('AppController', () => {
    let usersController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                CoreModule,
                AuthModule,
                UserModule
            ],
            controllers: [UserController],
            providers: [AuthService],
        }).compile();

        usersController = app.get<UserController>(UserController);
    });

    it('should be defined', async () => {
        await expect(usersController).toBeDefined();
    });

    it('findUsers', async () => {
        const users = await usersController.findUsers({}, {
            page: 1,
            limit: 10,
        });
        expect(users).toBeDefined();
    });
});
