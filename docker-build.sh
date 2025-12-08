#!/bin/bash
# Build script with BuildKit disabled to avoid snapshotter corruption issues

echo "Building with BuildKit disabled..."
DOCKER_BUILDKIT=0 COMPOSE_DOCKER_CLI_BUILD=0 docker compose build --no-cache "$@"

