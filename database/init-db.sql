-- Wait for SQL Server to be ready
WAITFOR DELAY '00:00:05';
GO

-- Create database if not exists
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'AppDatabase')
BEGIN
    CREATE DATABASE AppDatabase;
    PRINT 'Database AppDatabase created successfully';
END
ELSE
BEGIN
    PRINT 'Database AppDatabase already exists';
END
GO
