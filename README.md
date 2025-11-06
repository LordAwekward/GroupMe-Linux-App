# GroupMe Linux Desktop App

A native Linux desktop application for GroupMe built with Electron, featuring system tray integration, auto-launch capabilities, and customizable settings.

## Features

- **System Tray Integration**: Minimize to tray and access the app from your system tray
- **Tray Notifications**: Get notified when the app is minimized or other events occur
- **Launch on Startup**: Automatically start the app when you log into your system
- **Minimize to Tray**: Keep the app running in the background when you close the window
- **Settings Menu**: Easy-to-use settings interface accessible via a gear icon or tray menu
- **Native GroupMe Experience**: Full access to GroupMe web interface in a dedicated window

## Installation

### Download Pre-built Package (Recommended)

Download the latest release from the [Releases page](https://github.com/YOUR_USERNAME/GroupMe/releases):

**AppImage (Universal):**
```bash
# Download and make executable
chmod +x GroupMe-*.AppImage
./GroupMe-*.AppImage
```

**Debian/Ubuntu (.deb):**
```bash
sudo dpkg -i groupme-linux_*.deb
```

### Build from Source

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

#### Setup

1. Clone or navigate to this repository:
```bash
cd /home/bkeegan/Documents/Projects/GroupMe
```

2. Install dependencies:
```bash
npm install
```

3. Add your icon:
   - Place `icon.png` in the `assets/` folder
   - This single icon will be used for: window, taskbar, tray, desktop, and file manager
   - Recommended size: 256x256 or 512x512 PNG with transparency

## Usage

### Running in Development Mode

```bash
npm start
```

### Building for Production

Build an AppImage or .deb package:

```bash
npm run build:linux
```

The built application will be in the `dist/` directory.

### Installing the Built Package

**AppImage:**
```bash
chmod +x dist/GroupMe-*.AppImage
./dist/GroupMe-*.AppImage
```

**Debian Package:**
```bash
sudo dpkg -i dist/groupme-linux_*.deb
```

## Settings

Access settings in two ways:
1. Click the **⚙️ gear icon** in the top-right corner of the app
2. Right-click the **system tray icon** and select "Settings"

### Available Settings

- **Launch on System Start**: Automatically start GroupMe when you log in
- **Minimize to Tray**: Keep the app running in the system tray when you close the window
- **Tray Notifications**: Show notifications from the system tray

## System Tray

The app runs in the system tray with the following options:
- **Left-click**: Toggle show/hide the main window
- **Right-click**: Open context menu with:
  - Show App
  - Settings
  - Quit

## Keyboard Shortcuts

The app uses the standard GroupMe web shortcuts. Additionally:
- Close window: Minimizes to tray (if enabled in settings)

## File Structure

```
GroupMe/
├── main.js           # Main Electron process
├── preload.js        # Preload script for security
├── renderer.js       # Renderer process (UI logic)
├── package.json      # Project configuration
├── assets/           # Icons and images
│   └── icon.png      # App icon (used everywhere)
└── README.md         # This file
```

## Troubleshooting

### App doesn't start
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be v16+)

### Tray icon not showing
- Make sure your system supports system tray icons
- Some desktop environments (like GNOME) require extensions for tray support
- Ensure `icon.png` exists in the `assets/` folder

### Auto-launch not working
- The app uses Electron's `setLoginItemSettings` which should work on most Linux systems
- Check your system's startup applications settings

### Settings not saving
- Settings are stored using `electron-store` in your user config directory
- Location: `~/.config/groupme-linux/config.json`

## Development

### Technologies Used

- **Electron**: Cross-platform desktop application framework
- **electron-store**: Persistent settings storage
- **Node.js**: JavaScript runtime

### Project Structure

- `main.js`: Handles the main Electron process, window management, tray, and IPC
- `preload.js`: Secure bridge between main and renderer processes
- `renderer.js`: Injected into the GroupMe web page to add settings UI

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

## Acknowledgments

- GroupMe for their web interface
- Electron community for the excellent framework
