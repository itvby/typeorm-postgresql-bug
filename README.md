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
