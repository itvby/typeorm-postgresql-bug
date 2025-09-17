#!/bin/bash

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is ready!"

# Run migrations
echo "Running migrations..."
npm run migration:run

# Run seeders
echo "Running seeders..."
npm run seed

# Start the application in development mode
echo "Starting the application in development mode..."
npm run start:dev
