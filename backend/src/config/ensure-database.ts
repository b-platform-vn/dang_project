import { Connection, createConnection } from 'typeorm';

export async function ensureDatabase() {
  try {
    // Connect without specifying database
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

    // Check if database exists
    const result = await connection.query(
      `SELECT database_id FROM sys.databases WHERE Name = '${process.env.DB_DATABASE || 'AppDatabase'}'`
    );

    if (result.length === 0) {
      // Create database if it doesn't exist
      await connection.query(
        `CREATE DATABASE ${process.env.DB_DATABASE || 'AppDatabase'}`
      );
      console.log(`✅ Database '${process.env.DB_DATABASE || 'AppDatabase'}' created successfully`);
    } else {
      console.log(`✅ Database '${process.env.DB_DATABASE || 'AppDatabase'}' already exists`);
    }

    await connection.close();
  } catch (error) {
    console.error('Error ensuring database:', error);
    throw error;
  }
}
