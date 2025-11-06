# GitHub Release Setup - Quick Reference

## ✅ What's Been Configured

Your project is now set up to **automatically build and release** AppImage files when you push to GitHub!

### Files Added:

1. **`.github/workflows/release.yml`** - GitHub Actions workflow
   - Builds AppImage and .deb on tag push
   - Creates GitHub Release automatically
   - Uploads packages to release

2. **`package.json`** - Updated with:
   - Build configuration
   - File inclusion list
   - GitHub publish settings

3. **`RELEASE.md`** - Complete release guide
4. **`setup-github.sh`** - Helper script for first-time setup

## 🚀 Quick Start

### Step 1: Push to GitHub

```bash
# Run the setup script
./setup-github.sh

# Or manually:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/GroupMe.git
git branch -M main
git push -u origin main
```

### Step 2: Create a Release

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### Step 3: Wait for Build

- GitHub Actions will automatically build your app
- Check progress: `https://github.com/YOUR_USERNAME/GroupMe/actions`
- Takes about 5-10 minutes

### Step 4: Download Your Release

- Go to: `https://github.com/YOUR_USERNAME/GroupMe/releases`
- You'll see:
  - `GroupMe-v1.0.0.AppImage` ⬅️ Users download this!
  - `groupme-linux_v1.0.0_amd64.deb`

## 📦 What Gets Built

Every time you push a tag (like `v1.0.0`), GitHub automatically creates:

1. **AppImage** - Portable, works on any Linux distro
2. **Debian Package** - For Ubuntu/Debian users
3. **GitHub Release** - With download links and release notes

## 🔄 Making Updates

When you want to release a new version:

```bash
# 1. Update version in package.json
# Change "version": "1.0.0" to "1.0.1"

# 2. Commit changes
git add .
git commit -m "Release v1.0.1 - Bug fixes"

# 3. Create and push tag
git tag v1.0.1
git push origin v1.0.1

# 4. GitHub Actions does the rest!
```

## 🎯 Tag Format

Tags **must** start with `v`:
- ✅ `v1.0.0` - Works!
- ✅ `v2.1.3` - Works!
- ❌ `1.0.0` - Won't trigger build
- ❌ `release-1.0.0` - Won't trigger build

## 🛠️ Manual Trigger

You can also trigger builds manually:
1. Go to your repo on GitHub
2. Click **Actions** tab
3. Select **Build and Release**
4. Click **Run workflow**

## 📝 For Your Users

Add this to your README:

```markdown
## Download

Download the latest version from [Releases](https://github.com/YOUR_USERNAME/GroupMe/releases)

**Linux (AppImage):**
1. Download `GroupMe-v1.0.0.AppImage`
2. Make executable: `chmod +x GroupMe-v1.0.0.AppImage`
3. Run: `./GroupMe-v1.0.0.AppImage`
```

## 🔍 Troubleshooting

### Build Fails
- Check Actions tab for logs
- Ensure `assets/icon.png` exists
- Verify all files are committed

### No Release Created
- Tag must start with `v`
- Check GitHub Actions is enabled
- Verify you pushed the tag: `git push origin v1.0.0`

### Wrong Version Number
- Update `package.json` version to match tag
- Tag `v1.0.0` should match `"version": "1.0.0"`

## 📚 More Info

See `RELEASE.md` for detailed instructions and best practices.
