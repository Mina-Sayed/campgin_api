import { Test, TestingModule } from '@nestjs/testing';
import { CampginService } from './campgin.service';

describe('CampginService', () => {
  let service: CampginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampginService],
    }).compile();

    service = module.get<CampginService>(CampginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
