import { Module } from '@nestjs/common';
import { TestTicketService } from './test-ticket.service';
import { UserTestHistoryModule } from 'src/user-test-history/user-test-history.module';

@Module({
  imports: [UserTestHistoryModule],
  providers: [TestTicketService],
  exports: [TestTicketService],
})
export class TestTicketModule {}
