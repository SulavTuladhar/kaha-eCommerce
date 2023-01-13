/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    port: 5432,
    host: '127.0.0.1',
    database: 'e_commerce',
    username: 'postgres',
    password: 'test123',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
}

export default config;