import { ConfigService } from '@nestjs/config';

export const jwtOptions = (configService: ConfigService) => {
  return {
    secret: configService.get('JWT_ACCESS_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    },
  };
};
