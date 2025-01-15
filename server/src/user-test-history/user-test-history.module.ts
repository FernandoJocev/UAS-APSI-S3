import { forwardRef, Module } from '@nestjs/common';
import { UserTestHistoryService } from './user-test-history.service';
import { TestTicketModule } from '../test-ticket/test-ticket.module';

@Module({
  imports: [forwardRef(() => TestTicketModule)],
  providers: [UserTestHistoryService],
  exports: [UserTestHistoryService],
})
export class UserTestHistoryModule {}
