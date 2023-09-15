import { Module } from "@nestjs/common";
import { TwilioService } from "./twilio.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TwilioConfig } from "./twilio.config";

@Module({
    providers: [{
        provide: 'TWILIO_CONFIG',
        useFactory: (config: ConfigService): TwilioConfig => {
            return {
                accountSid: config.get('TWILIO_ACCOUNT_SID'),
                authToken: config.get('TWILIO_AUTH_TOKEN'),
                verifySid: config.get('TWILIO_VERIFY_SID')
            }
        },
        inject: [ConfigService]
    },TwilioService],
    exports: [TwilioService]
})
export class TwilioModule { }