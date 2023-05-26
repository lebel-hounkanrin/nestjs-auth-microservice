import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, VerifyCallback} from "passport-google-oauth20"
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google"){
    constructor(private configService: ConfigService, private authService: AuthService){
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log(profile)
        const { id, name, emails } = profile;
        const user = this.authService.getOrCrateUser(id, "google");
        return {
            provider: 'google',
            providerId: id,
            name: name.givenName,
            username: emails[0].value,
        };
        // Logique de validation de l'utilisateur
        // Utilisez les informations du profil pour vérifier l'utilisateur dans votre système
        // Appelez done(null, user) si la validation réussit
        // Sinon, appelez done(err) avec une erreur appropriée
      }
}