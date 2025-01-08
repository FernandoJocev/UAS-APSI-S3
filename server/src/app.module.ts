import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TestUsersModule } from './test-users/test-users.module';
import { AuthService } from './auth/auth.service';
import { TestTicketModule } from './test-ticket/test-ticket.module';
import { TicketModule } from './ticket/ticket.module';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { UserTestHistoryModule } from './user-test-history/user-test-history.module';
import { TestTicketService } from './test-ticket/test-ticket.service';

@Module({
  imports: [
    TestUsersModule,
    AuthModule,
    TestTicketModule,
    TicketModule,
    UserTestHistoryModule,
  ],
  controllers: [AppController, AuthController, TicketController],
  providers: [
    AppService,
    AuthService,
    TicketService,
    TestTicketService,
    UserTestHistoryModule,
  ],
  exports: [AppService],
})
export class AppModule {}
