# Build stage
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client for Alpine Linux
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

# Install runtime dependencies including OpenSSL
RUN apk add --no-cache libc6-compat openssl

# Create uploads directory
RUN mkdir -p uploads

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm install --production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Create uploads directory
RUN mkdir -p /app/uploads

# Expose the application port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Run the application
CMD ["node", "dist/index.js"]