#!/bin/bash
set -e

echo "Starting SQL Server..."
/opt/mssql/bin/sqlservr &

echo "Waiting for MSSQL to be ready..."
for i in {1..30}; do
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -Q "SELECT 1" -No &> /dev/null
  if [ $? -eq 0 ]; then
    echo "MSSQL is ready!"
    break
  fi
  echo "Attempt $i/30 — not ready yet, waiting 5s..."
  sleep 5
done

echo "Running init-db.sql..."
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -i /init-db.sql -No

echo "Database initialized!"

wait