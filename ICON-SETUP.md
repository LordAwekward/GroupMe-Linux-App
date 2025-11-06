# Icon Setup Guide

## Your Icon Will Be Used Everywhere! 🎨

The app is now configured to use a **single icon file** (`assets/icon.png`) for all purposes:

✅ **Application Window** - The icon shown in the window title bar  
✅ **Taskbar** - The icon shown in your taskbar/dock  
✅ **System Tray** - The icon shown in the system tray (automatically resized to 22x22)  
✅ **Desktop Shortcut** - The icon for desktop shortcuts  
✅ **File Manager** - The icon shown in file managers when browsing  
✅ **App Launcher** - The icon in your application menu  

## How to Add Your Icon

1. **Place your PNG file** in the `assets/` folder and name it `icon.png`
2. **Recommended specifications:**
   - Format: PNG with transparency
   - Size: 256x256 or 512x512 pixels
   - Square aspect ratio (1:1)

## What Happens Next

### During Development (`npm start`)
- The icon will immediately appear in the window and tray
- The tray icon is automatically resized to 22x22 for optimal display

### After Building (`npm run build:linux`)
- The icon will be embedded in the AppImage/deb package
- Desktop files will reference the icon
- File managers will display the icon
- The app will appear with your icon in the application launcher

## Testing Your Icon

After adding `icon.png`:

```bash
# Run the app to see your icon
npm start
```

You should see your icon in:
1. The application window (top-left corner)
2. The system tray (bottom-right or top-right, depending on your DE)
3. The taskbar (if your window is open)

## Troubleshooting

### Icon not showing in tray
- Ensure the file is named exactly `icon.png` (lowercase)
- Check that it's in the `assets/` folder
- Verify it's a valid PNG file
- Some desktop environments need tray extensions (e.g., GNOME)

### Icon not showing after building
- Make sure the icon exists before running `npm run build:linux`
- The icon is embedded during the build process
- Reinstall the package after rebuilding

### Icon looks blurry
- Use a higher resolution (512x512 recommended)
- Ensure it's a PNG, not a JPEG
- Make sure it has transparency (alpha channel)

## Current Configuration

The following files reference your icon:

- **`main.js`** - Lines 32 & 72: Window and tray icon paths
- **`package.json`** - Lines 29 & 36: Build configuration
- Both point to: `assets/icon.png`

No other icon files are needed! 🎉
