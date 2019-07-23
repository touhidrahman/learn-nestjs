import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    host: "localhost",
    port: 27017,
    database: "learnnestjs",
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
}