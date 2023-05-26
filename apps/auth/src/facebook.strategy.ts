import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-facebook";
import { AuthService } from "./auth.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor(private configService: ConfigService, private authService: AuthService) {
        super({
            clientID: configService.get('FACEBOOK_APP_ID'),
            clientSecret: configService.get('FACEBOOK_APP_SECRET'),
            callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback',
            scope: ['email', 'user_location'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log({accessToken, refreshToken, profile});
        const { id, name, emails } = profile;
        return {
            provider: 'facebook',
            providerId: id,
            name: name.givenName,
            username: emails[0].value,
        };
       
    }
}