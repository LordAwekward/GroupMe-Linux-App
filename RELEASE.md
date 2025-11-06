# Release Guide

This project is configured to automatically build and release AppImage and .deb packages when you push a version tag to GitHub.

## How to Create a Release

### 1. Update Version Number

Edit `package.json` and update the version:
```json
{
  "version": "1.0.1"
}
```

### 2. Commit Your Changes

```bash
git add .
git commit -m "Release v1.0.1"
```

### 3. Create and Push a Version Tag

```bash
# Create a tag (must start with 'v')
git tag v1.0.1

# Push the tag to GitHub
git push origin v1.0.1
```

### 4. Automatic Build Process

Once you push the tag, GitHub Actions will automatically:
1. ✅ Check out the code
2. ✅ Install dependencies
3. ✅ Build the AppImage and .deb packages
4. ✅ Create a GitHub Release
5. ✅ Upload the packages to the release

### 5. View Your Release

Go to your GitHub repository and click on "Releases" to see:
- `GroupMe-v1.0.1.AppImage` - Portable Linux application
- `groupme-linux_v1.0.1_amd64.deb` - Debian package

## Manual Release (Optional)

You can also trigger a build manually:
1. Go to your GitHub repository
2. Click "Actions" tab
3. Select "Build and Release" workflow
4. Click "Run workflow"
5. Select the branch and click "Run workflow"

## Version Numbering

Follow semantic versioning:
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes

## First Time Setup

Before your first release, make sure:

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub and create a new repository
   - Follow the instructions to push your code

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/GroupMe.git
   git branch -M main
   git push -u origin main
   ```

4. **Create Your First Release**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Troubleshooting

### Build Fails
- Check the Actions tab for error logs
- Ensure `assets/icon.png` exists in the repository
- Verify all required files are committed

### Release Not Created
- Make sure the tag starts with 'v' (e.g., v1.0.0)
- Check that GitHub Actions is enabled for your repository
- Verify you have push access to the repository

### Files Missing from Build
- Check the `files` array in `package.json`
- Ensure files aren't in `.gitignore`

## What Gets Included

The following files are packaged in the release:
- `main.js` - Main Electron process
- `preload.js` - Preload script
- `renderer.js` - Renderer script
- `assets/icon.png` - Application icon
- `package.json` - Package configuration
- `node_modules/` - Dependencies (automatically included)

## Download Instructions for Users

Add this to your README for users:

### For Users: How to Install

**AppImage (Recommended):**
1. Download `GroupMe-v1.0.0.AppImage` from [Releases](https://github.com/YOUR_USERNAME/GroupMe/releases)
2. Make it executable: `chmod +x GroupMe-v1.0.0.AppImage`
3. Run it: `./GroupMe-v1.0.0.AppImage`

**Debian/Ubuntu (.deb):**
1. Download `groupme-linux_v1.0.0_amd64.deb` from [Releases](https://github.com/YOUR_USERNAME/GroupMe/releases)
2. Install: `sudo dpkg -i groupme-linux_v1.0.0_amd64.deb`
3. Run from applications menu or: `groupme-linux`
