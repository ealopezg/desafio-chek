import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoginAttemptModule } from './login-attempt/login-attempt.module';
import { TwilioModule } from './twilio/twilio.module';
import { AccountModule } from './account/account.module';
import { User } from './user/user.entity';
import { LoginAttempt } from './login-attempt/login-attempt.entity';
import { Account } from './account/account.entity';

@Module({
  imports: [UserModule, AuthModule,
    LoginAttemptModule,
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: [User, Account, LoginAttempt],
          synchronize: true,
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          username: config.get('DATABASE_USERNAME'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
        }
      },
    inject: [ConfigService]  
    }),
    TwilioModule,
    ]
})
export class AppModule {}
