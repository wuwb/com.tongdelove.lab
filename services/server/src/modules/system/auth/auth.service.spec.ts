import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@/modules/system/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthService', () => {
    let service: AuthService;
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                UserModule,
                PassportModule,
                JwtModule.register({
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: '60s' },
                }),
            ],
            providers: [AuthService, LocalStrategy, JwtStrategy],
        }).compile();

        service = moduleRef.get<AuthService>(AuthService);
        configService = moduleRef.get<ConfigService>(ConfigService);

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

describe('validateUser', () => {
    let service: AuthService;
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                UserModule,
                PassportModule,
                JwtModule.register({
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: '60s' },
                }),
            ],
            providers: [AuthService, LocalStrategy, JwtStrategy],
        }).compile();

        service = moduleRef.get<AuthService>(AuthService);
        configService = moduleRef.get<ConfigService>(ConfigService);

    });

    it('should return a user object when credentials are valid', async () => {
        const res = await service.validateUser('maria', 'guess');
        expect(res.userId).toEqual(3);
    });

    it('should return null when credentials are invalid', async () => {
        const res = await service.validateUser('xxx', 'xxx');
        expect(res).toBeNull();
    });
});

describe('validateLogin', () => {
    let service: AuthService;
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                UserModule,
                PassportModule,
                JwtModule.register({
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: '60s' },
                }),
            ],
            providers: [AuthService, LocalStrategy, JwtStrategy],

        }).compile();

        service = moduleRef.get<AuthService>(AuthService);
        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    it('should return JWT object when credentials are valid', async () => {
        const res = await service.login({ username: 'maria', userId: 3 });
        expect(res).toBeDefined();
    });
});
