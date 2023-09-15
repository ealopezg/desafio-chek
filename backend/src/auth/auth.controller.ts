import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { SendOTPDTO } from './dto/sendOTP.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    
    @Post('/register')
    register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }
    @Post('/sendOTP')
    sendOTP(@Body() body: SendOTPDTO) {
       return this.authService.sendOTP(body.phone, body.deviceId);
    }

    @Post('/verifyOTP')
    verifyOTP(@Body('phone') phone: string, @Body('deviceId') deviceId: string, @Body('otpCode') otpCode: string) {
        return this.authService.verifyOTP(phone, deviceId,otpCode);
    }
}
