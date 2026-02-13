#!/bin/bash

echo "================================"
echo "Full Stack Project Quick Start"
echo "================================"
echo ""


if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✓ Docker is running"
echo ""

# Start services
echo "Starting services..."
echo "This may take a few minutes on first run..."
echo ""

docker-compose up --build

