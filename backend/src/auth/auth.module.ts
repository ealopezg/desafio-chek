import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TwilioModule } from 'src/twilio/twilio.module';
import { LoginAttemptModule } from 'src/login-attempt/login-attempt.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET')
      }),
      inject: [ConfigService],
    }),
    TwilioModule, LoginAttemptModule,AccountModule
  ],
  providers: [AuthService,AuthGuard],
  controllers: [AuthController],
  exports: [AuthService,AuthGuard]
})
  
export class AuthModule {}
