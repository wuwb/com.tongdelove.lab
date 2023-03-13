import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from '@/processors/auth/auth.service';
import { AuthModule } from '@/processors/auth/auth.module';
import { UsersModule } from './users.module';

describe('AppController', () => {
  let usersController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      controllers: [UserController],
      providers: [AuthService],
    }).compile();

    usersController = app.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
