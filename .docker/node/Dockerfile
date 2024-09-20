# Dockerfile

# Step 1: Read the Node.js version from .nvmrc (or default)
ARG NODE_VERSION
FROM node:${NODE_VERSION} AS base

FROM base AS system
# Playwright uses bash
RUN apt update && apt install bash
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG UID
ARG GID

RUN groupmod -g ${GID} node \
    && usermod -u ${UID} -g ${GID} node \
    && chown -R node:node /home/node

ARG PNPM_VERSION=${PNPM_VERSION}
RUN npm install -g pnpm@${PNPM_VERSION}

FROM system AS playwright-version
# Extract Playwright Dependencies with version from package.json

COPY package.json ./

# Step 2: Extract the Playwright version from package.json
RUN PLAYWRIGHT_VERSION=$(grep '"@playwright/test"' package.json | sed 's/[",^]//g' | awk '{print $2}') \
    && echo "Playwright version: $PLAYWRIGHT_VERSION" \
    && npx playwright@$PLAYWRIGHT_VERSION install-deps --dry-run > install_deps.sh

FROM playwright-version AS playwright

# Install Playwright Dependencies
COPY --from=playwright-version /install_deps.sh /install_deps.sh
RUN chmod +x install_deps.sh
RUN /install_deps.sh

FROM playwright AS app

USER node

WORKDIR /home/node/app

# Step 4: Ensure pnpm store directory exists and set proper permissions
RUN mkdir -p /home/node/app/.pnpm-store && chown -R node:node /home/node/app/.pnpm-store

RUN mkdir -p /home/node/app/build && chown -R node:node /home/node/app/build
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app/dist

# Step 5: Set environment variable for pnpm store
ENV PNPM_STORE_PATH=/home/node/app/.pnpm-store

COPY --chown=node:node . .
