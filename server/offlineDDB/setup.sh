#!/bin/bash

echo "Stopping and removing any existing DynamoDB containers"
docker compose down

echo "Starting local DynamoDB..."
docker compose up -d

echo "Waiting for DynamoDB to start..."
sleep 5

echo "Creating tables..."
npx ts-node createTables.ts
