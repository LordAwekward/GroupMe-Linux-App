# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Icon
Place your `icon.png` file in the `assets/` folder:
- This single icon will be used everywhere (window, taskbar, tray, desktop, file manager)
- Recommended: 256x256 or 512x512 PNG with transparency

If you don't have an icon, you can create a placeholder with ImageMagick:
```bash
./create-icons.sh
```

### 3. Run the App
```bash
npm start
```

## First Time Setup

1. The app will open and load GroupMe web interface
2. Log in to your GroupMe account
3. Click the **⚙️ gear icon** in the top-right to access settings
4. Configure your preferences:
   - ✅ Launch on System Start
   - ✅ Minimize to Tray
   - ✅ Tray Notifications

## Tips

- **Minimize to Tray**: Close the window to minimize to tray (if enabled)
- **Show/Hide**: Click the tray icon to toggle the window
- **Quick Settings**: Right-click the tray icon → Settings
- **Quit Completely**: Right-click tray icon → Quit

## Building for Distribution

Create an installable package:
```bash
npm run build:linux
```

Find your package in the `dist/` folder.

## Need Help?

Check the full [README.md](README.md) for detailed documentation and troubleshooting.
