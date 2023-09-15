import { Injectable } from '@nestjs/common';
import { LoginAttempt } from './login-attempt.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class LoginAttemptService {
    constructor(
        @InjectRepository(LoginAttempt)
        private loginAttemptRepository: Repository<LoginAttempt>,
    ) { }
    async create(user: User,deviceId: string) {
        let loginAttempt = new LoginAttempt();
        loginAttempt.user = user;
        loginAttempt.deviceId = deviceId;
        console.log(loginAttempt);
        return this.loginAttemptRepository.save(loginAttempt);
    }

    async getLoginAttemp(user: User, deviceId: string) {
        return await this.loginAttemptRepository.findOneBy({
            user: user,
            deviceId: deviceId
        });
    }

    async disableAllLogin(user: User) {
        await this.loginAttemptRepository.update({
            user: user
        },{
            enabled: false
        });
    }

    async enableLogin(loginAttempt: LoginAttempt) {
        loginAttempt.successfull = true;
        loginAttempt.enabled = true;

        return this.loginAttemptRepository.save(loginAttempt);
    }
}
