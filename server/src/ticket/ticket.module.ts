import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TestTicketModule } from 'src/test-ticket/test-ticket.module';
import { UserTestHistoryModule } from 'src/user-test-history/user-test-history.module';

@Module({
  imports: [TestTicketModule, UserTestHistoryModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
