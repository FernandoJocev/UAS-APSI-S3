import { forwardRef, Module } from '@nestjs/common';
import { TestTicketService } from './test-ticket.service';
import { UserTestHistoryModule } from '../user-test-history/user-test-history.module';

@Module({
  imports: [forwardRef(() => UserTestHistoryModule)],
  providers: [TestTicketService],
  exports: [TestTicketService],
})
export class TestTicketModule {}
