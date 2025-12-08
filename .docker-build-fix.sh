#!/bin/bash
# Fix Docker BuildKit cache corruption by restarting Docker Desktop
# Run this script if you encounter "missing parent bucket" errors

echo "Attempting to fix Docker BuildKit cache corruption..."
echo ""
echo "Option 1: Restart Docker Desktop (Recommended)"
echo "  - Quit Docker Desktop completely"
echo "  - Restart Docker Desktop"
echo "  - Then run: docker compose build --no-cache"
echo ""
echo "Option 2: Disable BuildKit for this build"
echo "  - Run: DOCKER_BUILDKIT=0 docker compose build --no-cache"
echo ""
echo "Option 3: Reset Docker Desktop (Nuclear option)"
echo "  - Docker Desktop > Settings > Troubleshoot > Reset to factory defaults"
echo "  - Warning: This will delete all containers, images, and volumes"
