import { createConnection } from 'typeorm';

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function ensureDatabase() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🔄 Attempting to connect to database... (${attempt}/${MAX_RETRIES})`);

      const connection = await createConnection({
        type: 'mssql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 1433,
        username: process.env.DB_USERNAME || 'sa',
        password: process.env.DB_PASSWORD || 'YourStrong@Passw0rd',
        database: 'master',
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      });

   
      const result = await connection.query(
        `SELECT database_id FROM sys.databases WHERE Name = '${process.env.DB_DATABASE || 'AppDatabase'}'`
      );

      if (result.length === 0) {
        await connection.query(
          `CREATE DATABASE ${process.env.DB_DATABASE || 'AppDatabase'}`
        );
        console.log(`Database '${process.env.DB_DATABASE || 'AppDatabase'}' created successfully`);
      } else {
        console.log(`Database '${process.env.DB_DATABASE || 'AppDatabase'}' already exists`);
      }

      await connection.close();
      return;

    } catch (error) {
      console.warn(`Attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`);

      if (attempt === MAX_RETRIES) {
        console.error('Could not connect to database after maximum retries.');
        throw error;
      }

      console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      await sleep(RETRY_DELAY_MS);
    }
  }
}