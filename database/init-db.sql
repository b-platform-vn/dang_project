IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'AppDatabase')
BEGIN
    CREATE DATABASE AppDatabase COLLATE Vietnamese_CI_AS;;
    PRINT 'Database AppDatabase created successfully';
END
ELSE
BEGIN
    PRINT 'Database AppDatabase already exists';
END
GO