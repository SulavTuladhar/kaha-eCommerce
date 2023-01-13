import { Test, TestingModule } from '@nestjs/testing';
import { BussinessInfoController } from './bussiness-info.controller';
import { BussinessInfoService } from './bussiness-info.service';

describe('BussinessInfoController', () => {
  let controller: BussinessInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BussinessInfoController],
      providers: [BussinessInfoService],
    }).compile();

    controller = module.get<BussinessInfoController>(BussinessInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
