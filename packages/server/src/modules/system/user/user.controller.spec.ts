import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from '@/modules/system/auth/auth.service';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { UserModule } from './user.module';

describe('AppController', () => {
    let usersController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, UserModule],
            controllers: [UserController],
            providers: [AuthService],
        }).compile();

        usersController = app.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
    });
});
