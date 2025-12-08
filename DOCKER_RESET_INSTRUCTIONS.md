# Docker Desktop Reset Instructions

Since restarting Docker Desktop didn't fix the snapshotter corruption, you need to reset it.

## Option 1: Reset via Docker Desktop UI (Recommended)

1. **Open Docker Desktop**
2. **Go to Settings** (gear icon)
3. **Click "Troubleshoot"** in the left sidebar
4. **Click "Reset to factory defaults"**
5. **Confirm the reset**
6. **Wait for Docker Desktop to restart**
7. **Then run**: `docker compose build --no-cache`

⚠️ **Warning**: This will delete:
- All containers
- All images
- All volumes
- All networks

## Option 2: Manual Reset (More Control)

If you want to keep some data, you can manually clean just the snapshotter:

1. **Quit Docker Desktop completely**
2. **Run these commands**:
   ```bash
   # Clean build cache
   docker builder prune -af
   
   # Clean system (be careful - this removes unused data)
   docker system prune -af --volumes
   ```
3. **Restart Docker Desktop**
4. **Try building again**: `docker compose build --no-cache`

## Option 3: Nuclear Option - Complete Reinstall

If nothing else works:

1. **Uninstall Docker Desktop** (Applications → Docker → Move to Trash)
2. **Clean up leftover files**:
   ```bash
   rm -rf ~/Library/Containers/com.docker.docker
   rm -rf ~/Library/Application\ Support/Docker\ Desktop
   rm -rf ~/.docker
   ```
3. **Reinstall Docker Desktop** from docker.com
4. **Start fresh**

## After Reset

Once Docker Desktop is reset, your build should work:
```bash
docker compose build --no-cache
```

The Dockerfile is correct - this is purely a Docker Desktop corruption issue.

