import { Module } from '@nestjs/common';
import { TestUsersService } from './test-users.service';

@Module({
  providers: [TestUsersService],
  exports: [TestUsersService],
})
export class TestUsersModule {}
