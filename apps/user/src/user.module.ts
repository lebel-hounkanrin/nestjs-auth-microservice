import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { joiSchema } from './joi.schema';
import { SocialMediaUser } from './social-media-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiSchema(),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User, SocialMediaUser]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  constructor() {}
}
