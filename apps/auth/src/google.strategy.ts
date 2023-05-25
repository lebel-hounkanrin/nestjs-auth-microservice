import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { VerifyCallback } from "passport-jwt";
import { Strategy } from "passport-local";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google"){
    constructor(private configService: ConfigService){
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        // Logique de validation de l'utilisateur
        // Utilisez les informations du profil pour vérifier l'utilisateur dans votre système
        // Appelez done(null, user) si la validation réussit
        // Sinon, appelez done(err) avec une erreur appropriée
      }
}