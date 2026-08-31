# Docker & Containerization

> The container is the artifact everything downstream ships. Every stage after this - the pipeline, the scanners, the deployment strategy - operates on the image you build here, so it's worth getting right once.

Chapter 5 of the [deployment journey](/operations/deployment-journey). Once your code has passed [its checks](/coding-standards/ci-cd), we package it into a single, reproducible image that runs identically on a laptop, in staging, and in production. This page is how we build that image well: small, fast, and safe.

## Core Principles

- Keep images lightweight
- Use official base images
- Ensure reproducible builds
- Optimize caching and layers
- Follow security best practices

## Standard Dockerfile Structure

```dockerfile
# Base Image
FROM node:18-alpine

# Metadata
LABEL maintainer="team@example.com"

# Environment Variables
ENV NODE_ENV=production

# Working Directory
WORKDIR /app

# Copy Dependency Files
COPY package.json package-lock.json ./

# Install Dependencies
RUN npm ci

# Copy Application Code
COPY . .

# Build Application
RUN npm run build

# Expose Port
EXPOSE 3000

# Start Application
CMD ["node", "server.js"]
```

## .dockerignore

Always exclude unnecessary files to reduce build context size:

```
node_modules
.git
.env
dist
coverage
.next
```

## Layer Caching

Copy dependency files before application code so dependency layers are only rebuilt when dependencies change:

```dockerfile
# Good - dependencies cached separately
COPY package*.json ./
RUN npm ci
COPY . .

# Bad - any code change invalidates the npm install layer
COPY . .
RUN npm install
```

## Multi-Stage Builds

Use multi-stage builds to produce lean production images:

```dockerfile
# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production

CMD ["node", "dist/index.js"]
```

## Security

### Run as Non-Root User

```dockerfile
RUN addgroup -S app && adduser -S app -G app
USER app
```

### Never Store Secrets in the Image

```dockerfile
# Bad - secret baked into the image layer
ENV API_KEY=123456

# Good - inject at runtime via environment or secrets manager
```

> This page covers **build-time** container security - the choices you bake into the Dockerfile. Registry image scanning, base-image CVE policy, and the "0 Critical OS vulnerabilities" rule live in [DevSecOps Standards](/coding-standards/devsecops-standards#3-infrastructure-container-security), which is the single source of truth for security policy across the whole section.

## Image Optimization

Clean up package manager caches in the same `RUN` layer to avoid bloating the image:

```dockerfile
RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
```

## Environment Configuration

Use environment variables for runtime configuration so the same image runs in any environment:

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

## Common Commands

```bash
# Build image
docker build -t my-app:1.0.0 .

# Run container
docker run -p 3000:3000 my-app:1.0.0

# View running containers
docker ps

# Stop container
docker stop <container-id>
```

## CI/CD Integration

Recommended pipeline order:

1. Build Docker image
2. Run tests
3. Security scan (e.g. Trivy, Snyk) - see [Security Scanning](/operations/security-scanning)
4. Push to registry
5. Deploy

What happens *after* the image lands in the registry - rolling it out without downtime, and rolling it back when something's wrong - is covered in [Deployment Strategies](/operations/deployment-strategies). The tag you push here (see Naming & Versioning below) is exactly what a rollback redeploys, so pin real versions, never just `latest`.

## Naming & Versioning

Follow semantic versioning for image tags:

```
my-app:1.0.0     # specific release
my-app:staging   # staging environment
my-app:prod      # production environment
```

## Production Checklist

- Lightweight base image (alpine where possible)
- Multi-stage build used
- Container runs as non-root user
- Layers ordered for optimal cache reuse
- No secrets stored in the image
- `.dockerignore` configured
- Image scanned for vulnerabilities
