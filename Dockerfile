# Stage 1: Build with Bun (official Nuxt Content Bun Dockerfile)
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app

# Copy package files
COPY package.json bun.lock* pnpm-lock.yaml* ./

# Use ignore-scripts to avoid building node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

# Build the application
RUN bun --bun run build

# Stage 2: Production with Bun
FROM oven/bun:1 AS production
WORKDIR /app

# Only .output folder is needed from the build stage
COPY --from=build /app/.output /app

# Expose port
EXPOSE 3000/tcp

# Run the app
ENTRYPOINT ["bun", "--bun", "run", "/app/server/index.mjs"]
