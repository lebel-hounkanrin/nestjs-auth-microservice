import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { VerifyCallback } from "passport-jwt";
import { Strategy } from "passport-local";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook"){
    constructor(private configService: ConfigService){
        super({
            clientID: configService.get('FACEBOOK_APP_ID'),
            clientSecret: configService.get('FACEBOOK_APP_SECRET'),
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            scope: ['email'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

    }
}