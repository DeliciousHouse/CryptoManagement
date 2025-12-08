# Docker BuildKit Cache Corruption Fix

If you encounter errors like:
```
failed to create snapshot: missing parent "moby/..." bucket: not found
```

This is a Docker Desktop BuildKit cache corruption issue. Here are the solutions:

## Solution 1: Restart Docker Desktop (Recommended)

1. **Quit Docker Desktop completely**
   - Click Docker icon in menu bar
   - Select "Quit Docker Desktop"
   - Wait for it to fully quit

2. **Restart Docker Desktop**
   - Open Docker Desktop again
   - Wait for it to fully start

3. **Rebuild**
   ```bash
   docker compose build --no-cache
   ```

## Solution 2: Disable BuildKit for This Build

If restarting doesn't work, temporarily disable BuildKit:

```bash
DOCKER_BUILDKIT=0 docker compose build --no-cache
```

## Solution 3: Reset Docker Desktop (Last Resort)

If the above solutions don't work:

1. Open Docker Desktop
2. Go to **Settings** > **Troubleshoot**
3. Click **Reset to factory defaults**
4. **Warning**: This will delete all containers, images, and volumes

## Why This Happens

Docker BuildKit uses an internal snapshot system that can become corrupted, especially after:
- Docker Desktop updates
- System crashes
- Disk space issues
- Interrupted builds

The Dockerfile itself is correct - this is purely a Docker Desktop issue.

