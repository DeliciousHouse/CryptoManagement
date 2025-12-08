#!/bin/bash
# Build script that completely disables BuildKit
# This requires Docker Desktop to not force BuildKit

echo "Attempting to build with BuildKit disabled..."
echo ""
echo "If this still fails, you need to:"
echo "1. Quit Docker Desktop completely"
echo "2. Restart Docker Desktop"
echo "3. Then run this script again"
echo ""

# Disable BuildKit completely
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0

# Also try to use legacy builder
docker compose build --no-cache "$@"
