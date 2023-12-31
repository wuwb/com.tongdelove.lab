import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from './helper.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@/config/config.module';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule,
      ],
      providers: [HelperService],
    }).compile();

    service = module.get<HelperService>(HelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
