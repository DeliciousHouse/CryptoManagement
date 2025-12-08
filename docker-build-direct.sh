#!/bin/bash
# Build Docker image directly (bypassing docker-compose) with BuildKit disabled

echo "Building Docker image directly (bypassing docker-compose)..."
echo "This avoids docker-compose's BuildKit enforcement"

# Build the image directly with legacy builder
DOCKER_BUILDKIT=0 docker build \
  --build-arg DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy \
  -t cryptocoin-web:latest \
  -f Dockerfile .

if [ $? -eq 0 ]; then
  echo ""
  echo "Build successful! Image tagged as: cryptocoin-web:latest"
  echo "You can now run: docker compose up"
else
  echo ""
  echo "Build failed. Try resetting Docker Desktop to factory defaults."
fi
