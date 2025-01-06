import { Test, TestingModule } from '@nestjs/testing';
import { UserTestHistoryService } from './user-test-history.service';

describe('UserTestHistoryService', () => {
  let service: UserTestHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestHistoryService],
    }).compile();

    service = module.get<UserTestHistoryService>(UserTestHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
