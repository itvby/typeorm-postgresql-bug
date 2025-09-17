# TypeORM PostgreSQL Bug Demo

A NestJS application demonstrating TypeORM with PostgreSQL integration.

## Quick Start

### Docker (Recommended)

1. Copy environment variables:
```bash
cp env.example .env
```

2. Start services:
```bash
# Production
docker-compose up --build

# Development
docker-compose -f docker-compose.dev.yml up --build
```

3. Access:
- App: http://localhost:3000
- PostgreSQL: localhost:5432

### Local Development

1. Install dependencies:
```bash
yarn install
```

2. Setup PostgreSQL:
```bash
createdb typeorm_bug
```

3. Copy environment and run migrations:
```bash
cp env.example .env
npm run migration:run
npm run seed
```

4. Start development server:
```bash
yarn start:dev
```

## Available Scripts

- `yarn start` - Start production server
- `yarn start:dev` - Start development server with hot reload
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run e2e tests

## Error Testing

This project demonstrates a TypeORM bug that occurs when creating and deleting entities with many-to-many relationships.

**Important:** These errors occur only in TypeORM version 0.3.26. In version 0.3.25, all operations work correctly without any constraint violations.

### Create Resource Error

**Request:**
```bash
POST /feeds/resources
Content-Type: application/json

{
    "title": "React Documentation",
    "type": "documentation",
    "url": "https://react.dev",
    "categoryIds": ["550e8400-e29b-41d4-a716-446655440003"]
}
```

**Error Response:**
```json
{
    "statusCode": 400,
    "message": "null value in column \"resource_id\" of relation \"feed_resources_categories\" violates not-null constraint"
}
```

**SQL Statement:**
```sql
INSERT INTO "feed_resources_categories"("id", "created_at", "updated_at", "resource_id", "category_id", "order") VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "created_at", "updated_at"
```

### Delete Resource Error

**Request:**
```bash
DELETE http://localhost:3000/feeds/resources/6ba7b810-9dad-11d1-80b4-00c04fd430c8
```

**Error Response:**
```json
{
    "statusCode": 400,
    "message": "null value in column \"resource_id\" of relation \"feed_resources_categories\" violates not-null constraint"
}
```

### Summary

This indicates a problem with TypeORM's handling of many-to-many relationships where the foreign key constraints are not being properly managed during entity operations.

## Database Management

```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres -d typeorm_bug

# Run migrations manually
docker-compose exec app npm run migration:run

# Run seeders manually
docker-compose exec app npm run seed
```

## License

MIT
