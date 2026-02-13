#!/bin/bash

echo "========================================"
echo "Database Setup Script"
echo "========================================"
echo ""

# Check if database container is running
echo "Checking database container..."
if ! docker ps --filter "name=mssql-db" --format "{{.Names}}" | grep -q mssql-db; then
    echo "[ERROR] Database container is not running!"
    echo "Please start Docker with: docker-compose up -d"
    exit 1
fi

echo "[OK] Database container is running"
echo ""

# Wait for SQL Server to be ready
echo "Waiting for SQL Server to be ready..."
sleep 10

# Create database
echo "Creating AppDatabase..."

docker exec mssql-db /opt/mssql-tools18/bin/sqlcmd \
    -S localhost -U sa -P "YourStrong@Passw0rd" -C \
    -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'AppDatabase') CREATE DATABASE AppDatabase"

if [ $? -eq 0 ]; then
    echo "[OK] Database setup completed!"
else
    echo "[ERROR] Failed to create database"
    exit 1
fi

echo ""

# Verify database
echo "Verifying database..."
docker exec mssql-db /opt/mssql-tools18/bin/sqlcmd \
    -S localhost -U sa -P "YourStrong@Passw0rd" -C \
    -Q "SELECT name FROM sys.databases WHERE name = 'AppDatabase'"

echo ""
echo "========================================"
echo "Setup Complete!"
echo "You can now access:"
echo "  - Backend: http://localhost:3000"
echo "  - Frontend: http://localhost:5173"
echo "========================================"
