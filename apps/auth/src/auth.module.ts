import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "USER_CLIENT",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 4010
        }
      }
    ]),
    JwtModule.registerAsync({  
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_ACCESS_SECRET"),
          signOptions: { expiresIn: configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}
        }
      },
      inject: [ConfigService]   
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
})
export class AuthModule {}
