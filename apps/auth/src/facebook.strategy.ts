import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { VerifyCallback } from "passport-jwt";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor(private configService: ConfigService, private authService: AuthService) {
        super({
            clientID: configService.get('FACEBOOK_APP_ID'),
            clientSecret: configService.get('FACEBOOK_APP_SECRET'),
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            scope: ['email', 'user_location'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        try {
            const { id, emails, displayName } = profile;
            const email = emails?.[0]?.value;
            const user = await this.authService.findUserByFacebookIdOrEmail(id, email);
            if(user){
                done(null, user)
            } else{
                const newUser = await this.authService.createFacebookUser(id, email, displayName);
                done(null, newUser)
            }

        } catch (err) {
        }
    }
}