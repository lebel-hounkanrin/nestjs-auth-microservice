import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from "@nestjs/jwt"
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_CLIENT")
        private client: ClientProxy,
        private jwtService: JwtService
    ) { }

    async valideUser(username: string, password: string): Promise<any> {
        try {
            const user = this.client.send({ role: "user", cmd: "get" }, { username });
            console.log(user)
            //compareSync(password, user.password)
        }
        catch (e) {
            Logger.error(e);
            return null
        }
    }

    async login(user) {
        const payload = { user, sub: user.id };

        return {
            userId: user.id,
            accessToken: this.jwtService.sign(payload)
        };
    }
}
