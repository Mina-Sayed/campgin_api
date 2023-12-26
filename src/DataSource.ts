// src/DataSource.ts

import { createConnection, Connection } from 'typeorm';

const createDataSource = async (): Promise<Connection> => {
    const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'mina',
        database: 'postgres',
        synchronize: false, // set to true only in development
        logging: false,
        entities: [__dirname + '/entities/**/*.ts'], // adjust path based on your project structure
        migrations: [__dirname + '/migration/**/*.ts'], // adjust path based on your project structure
    });

    return connection;
};

export default createDataSource;
