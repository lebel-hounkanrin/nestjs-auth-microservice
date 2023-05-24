import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
//import { User } from "./user.entity";

export const typeOrmConfig = (configService: ConfigService): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => {
        return {
                type: "postgres",
                host: configService.get<string>("POSTGRES_HOST"),
                port: +configService.get<string>("POSTGRES_PORT"),
                username: configService.get<string>("POSTGRES_USER"),
                password: configService.get<string>("POSTGRES_PASSWORD"),
                database: configService.get<string>("POSTGRES_DB"),
                entities: [join(__dirname, '**', '*.entity.{ts,js}')],
                ssl: false,
                synchronize: true,
                migrationsRun: false,
                migrations: ["dist/migrations/**/*{.ts,.js}"],
        }
}

