import { Module } from '@nestjs/common';
import { UserTestHistoryService } from './user-test-history.service';

@Module({
  providers: [UserTestHistoryService],
  exports: [UserTestHistoryService],
})
export class UserTestHistoryModule {}
