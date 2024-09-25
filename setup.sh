#!/bin/bash

# Copy .env.dist to .env
cp .env.dist .env

# Get the current user's UID and GID
USER_UID=$(id -u)
USER_GID=$(id -g)

if grep -q "^UID=" .env; then
  sed -i "s/^UID=.*$/UID=${USER_UID}/" .env
else
  echo "UID=${USER_UID}" >> .env
fi

if grep -q "^GID=" .env; then
  sed -i "s/^GID=.*$/GID=${USER_GID}/" .env
else
  echo "GID=${USER_GID}" >> .env
fi

# Replace placeholders in .env.docker with actual UID and GID
sed -i "s/UID=.*$/UID=${USER_UID}/" .env
sed -i "s/GID=.*$/GID=${USER_GID}/" .env
sed -i "s/UID=.*$/UID=${USER_UID}/" .env.docker
sed -i "s/GID=.*$/GID=${USER_GID}/" .env.docker

cat .env
cat .env.docker

echo ".env and file has been updated with UID and GID."
