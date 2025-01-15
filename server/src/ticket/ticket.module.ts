import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TestTicketModule } from '../test-ticket/test-ticket.module';
import { UserTestHistoryModule } from '../user-test-history/user-test-history.module';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [TestTicketModule, UserTestHistoryModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'ticket/all', method: RequestMethod.GET },
        { path: 'ticket/get/:id', method: RequestMethod.GET },
      )
      .forRoutes('ticket');
  }
}
