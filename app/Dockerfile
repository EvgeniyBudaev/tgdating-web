# Base Image: Typically, a Dockerfile starts with a base image upon which
# you build your application.
# This is specified using the FROM instruction.
FROM node:22.6.0-alpine AS build

# If you set WORKDIR /app, then any commands or file operations
# will be relative to the /app directory.
WORKDIR /app

# Install dependencies based on the preferred package manager
# Copy Application Files: You copy the application code or files
# into the image using the COPY or ADD instruction.
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works
  #even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY . .

# Next.js collects completely anonymous telemetry data about
# general usage. Learn more here: https://nextjs.org/telemetry
# Comment the following line to enable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Note: We could expose ports here but instead
# Compose will handle that for us

# Start Next.js in development mode based on the
# preferred package manager
RUN npm run build

CMD ["npm", "start"]