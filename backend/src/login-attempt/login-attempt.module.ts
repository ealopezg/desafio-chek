import { Module } from '@nestjs/common';
import { LoginAttemptService } from './login-attempt.service';
import { LoginAttempt } from './login-attempt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LoginAttempt])],
  providers: [LoginAttemptService],
  exports: [LoginAttemptService]
})
export class LoginAttemptModule {}
