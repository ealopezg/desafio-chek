import { Inject, Injectable } from "@nestjs/common";
import { TwilioConfig } from "./twilio.config";
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService{
    private client: Twilio;
    private config: TwilioConfig;

    constructor(@Inject('TWILIO_CONFIG') config: TwilioConfig) { 
        this.config = config;
        this.client = new Twilio(config.accountSid, config.authToken);
        console.log(this.client);
    }

    sendOTP(number: string) {
        return this.client.verify.v2.services(this.config.verifySid)
            .verifications.create({
                to: number,
                locale: 'es',
                channel: 'sms'
            });
    }

    checkOTP(number: string,otpCode: string) {
        return this.client.verify.v2.services(this.config.verifySid)
            .verificationChecks.create({
                to: number,
                code: otpCode
            });
    }
    

}