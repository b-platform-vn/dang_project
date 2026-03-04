import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,          
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  synchronize: true,
  autoLoadEntities: true,
  retryAttempts: 10,      
  retryDelay: 5000,          
};