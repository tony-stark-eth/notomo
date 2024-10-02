#!/bin/bash

# Copy .env.dist to .env
cp .env.dist .env

# Get the current user's UID and GID
USER_UID=$(id -u)
USER_GID=$(id -g)

# Replace placeholders in .env.docker with actual UID and GID
sed -i "s/UID=.*$/UID=${USER_UID}/" .env.docker
sed -i "s/GID=.*$/GID=${USER_GID}/" .env.docker

cat .env.docker

echo ".env.docker file has been updated with UID and GID."
