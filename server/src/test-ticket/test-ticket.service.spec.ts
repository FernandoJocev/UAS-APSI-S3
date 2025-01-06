import { Test, TestingModule } from '@nestjs/testing';
import { TestTicketService } from './test-ticket.service';

describe('TestTicketService', () => {
  let service: TestTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestTicketService],
    }).compile();

    service = module.get<TestTicketService>(TestTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
