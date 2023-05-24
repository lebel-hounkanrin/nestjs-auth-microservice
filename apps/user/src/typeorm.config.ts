import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./user.entity";

const typeOrmConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'master',
        password: 'master',
        database: 'student',
        synchronize: true,
        entities: [User]
}

export default typeOrmConfig;