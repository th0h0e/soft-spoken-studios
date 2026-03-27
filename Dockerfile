# Stage 1: Build with Node (Bun build has issues with some native modules)
FROM node:22-alpine AS builder

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Production with Bun
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Copy the entire .output directory (includes server and public)
COPY --from=builder /app/.output ./.output

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start with Bun
CMD ["bun", "run", ".output/server/index.mjs"]
