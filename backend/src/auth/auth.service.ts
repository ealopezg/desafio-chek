import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAttemptService } from 'src/login-attempt/login-attempt.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { UserService } from 'src/user/user.service';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import { RegisterDTO } from './dto/register.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly twilioService: TwilioService,
        private readonly loginAttemptService: LoginAttemptService,
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDTO: RegisterDTO) {
        const user = await this.userService.create(registerDTO.firstName, registerDTO.lastName, registerDTO.phone);
        await this.accountService.createForUser(user);
        return user;
    }

    async sendOTP(phone: string,deviceId: string) {
        const user = await this.userService.findByPhone(phone);
        if (user == undefined) {
            throw new BadRequestException('Usuario no existe');
        }
        await this.twilioService.sendOTP('+56'+user.phone);
        await this.loginAttemptService.create(user, deviceId);
        return { status: HttpStatus.OK }
    }
    
    async verifyOTP(phone: string,deviceId: string, otpCode: string): Promise<any>{
        const user = await this.userService.findByPhone(phone);
        if (user == undefined) {
            throw new BadRequestException('Usuario no existe');
        }
        const loginAttempt = await this.loginAttemptService.getLoginAttemp(user, deviceId);
        if (loginAttempt == undefined) {
            throw new BadRequestException("Dispositivo inválido");
        }
        const verification: VerificationCheckInstance = await this.twilioService.checkOTP('+56'+user.phone, otpCode);
        if (verification.status != 'approved') {
            throw new BadRequestException('Error en la verificación');
        }
        await this.loginAttemptService.disableAllLogin(user);

        await this.loginAttemptService.enableLogin(loginAttempt);
        const payload = { userId: user.id, deviceId: deviceId }

        return {
            token: this.jwtService.sign(payload,{expiresIn: '30d'})
        }
    }

    async verifyToken(token) {
        try {
            return await this.jwtService.verifyAsync(token);
        }
        catch {
            throw new UnauthorizedException();
        }
    }
}
