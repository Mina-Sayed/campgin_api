import { Test, TestingModule } from '@nestjs/testing';
import { CampginController } from './campgin.controller';
import { CampginService } from './campgin.service';

describe('CampginController', () => {
  let controller: CampginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampginController],
      providers: [CampginService],
    }).compile();

    controller = module.get<CampginController>(CampginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
