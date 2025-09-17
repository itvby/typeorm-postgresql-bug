# Use Node.js 22 Alpine image
FROM node:22-alpine

# Install PostgreSQL client for health checks
RUN apk add --no-cache postgresql-client

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Copy and make start script executable
COPY scripts/start.sh /app/scripts/start.sh
RUN chmod +x /app/scripts/start.sh

# Expose port
EXPOSE 3000

# Start the application with migrations and seeds
CMD ["/bin/sh", "/app/scripts/start.sh"]
