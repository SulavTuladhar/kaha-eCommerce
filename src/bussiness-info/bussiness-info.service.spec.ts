import { Test, TestingModule } from '@nestjs/testing';
import { BussinessInfoService } from './bussiness-info.service';

describe('BussinessInfoService', () => {
  let service: BussinessInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BussinessInfoService],
    }).compile();

    service = module.get<BussinessInfoService>(BussinessInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
