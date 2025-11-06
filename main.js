const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, session } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');

const store = new Store();

let mainWindow;
let tray;
let isQuitting = false;

// Default settings
const defaultSettings = {
  launchOnStart: false,
  minimizeToTray: true,
  showTrayNotifications: true
};

// Initialize settings
function getSettings() {
  return {
    launchOnStart: store.get('launchOnStart', defaultSettings.launchOnStart),
    minimizeToTray: store.get('minimizeToTray', defaultSettings.minimizeToTray),
    showTrayNotifications: store.get('showTrayNotifications', defaultSettings.showTrayNotifications)
  };
}

function createWindow() {
  // Load icon using nativeImage for better compatibility
  const iconPath = path.join(__dirname, 'assets', 'icon.png');
  let appIcon = nativeImage.createFromPath(iconPath);
  
  // If icon is empty, try to create a fallback
  if (appIcon.isEmpty()) {
    console.warn('Icon not found at:', iconPath);
    appIcon = createDefaultIcon();
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      partition: 'persist:groupme'
    }
  });

  // Set a proper User-Agent to ensure GroupMe recognizes the browser
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  mainWindow.webContents.setUserAgent(userAgent);

  // Enable persistent storage
  const ses = session.fromPartition('persist:groupme');
  ses.setUserAgent(userAgent);

  // Set icon explicitly (helps with some desktop environments)
  mainWindow.setIcon(appIcon);

  mainWindow.loadURL('https://web.groupme.com');

  // Inject renderer script after page loads
  mainWindow.webContents.on('did-finish-load', () => {
    const rendererScript = fs.readFileSync(path.join(__dirname, 'renderer.js'), 'utf8');
    mainWindow.webContents.executeJavaScript(rendererScript);
  });

  const settings = getSettings();

  // Handle window close
  mainWindow.on('close', async (event) => {
    if (!isQuitting && settings.minimizeToTray) {
      event.preventDefault();
      
      // Flush storage before hiding
      const ses = mainWindow.webContents.session;
      await ses.flushStorageData();
      
      mainWindow.hide();
      
      if (settings.showTrayNotifications) {
        tray.displayBalloon({
          title: 'GroupMe',
          content: 'App minimized to tray'
        });
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  // Use the same icon as the main window for consistency
  const iconPath = path.join(__dirname, 'assets', 'icon.png');
  
  let trayIcon;
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    // Resize for tray if needed (tray icons are typically 16x16 or 22x22)
    if (!trayIcon.isEmpty()) {
      trayIcon = trayIcon.resize({ width: 22, height: 22 });
    } else {
      trayIcon = createDefaultIcon();
    }
  } catch (e) {
    trayIcon = createDefaultIcon();
  }

  tray = new Tray(trayIcon);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Settings',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('open-settings');
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('GroupMe');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

function createDefaultIcon() {
  // Create a simple 16x16 icon
  const size = 16;
  const canvas = require('electron').nativeImage.createEmpty();
  return canvas;
}

// Auto-launch functionality
function setAutoLaunch(enable) {
  app.setLoginItemSettings({
    openAtLogin: enable,
    path: app.getPath('exe')
  });
}

// IPC handlers
ipcMain.handle('get-settings', () => {
  return getSettings();
});

ipcMain.handle('save-settings', (event, settings) => {
  store.set('launchOnStart', settings.launchOnStart);
  store.set('minimizeToTray', settings.minimizeToTray);
  store.set('showTrayNotifications', settings.showTrayNotifications);
  
  // Update auto-launch
  setAutoLaunch(settings.launchOnStart);
  
  return { success: true };
});

ipcMain.handle('show-notification', (event, { title, body }) => {
  const settings = getSettings();
  if (settings.showTrayNotifications && tray) {
    tray.displayBalloon({
      title: title,
      content: body
    });
  }
});

// App lifecycle
app.whenReady().then(() => {
  createWindow();
  createTray();
  
  // Set auto-launch based on saved settings
  const settings = getSettings();
  setAutoLaunch(settings.launchOnStart);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', async () => {
  isQuitting = true;
  // Flush cookies and storage to disk before quitting
  if (mainWindow && mainWindow.webContents) {
    const ses = mainWindow.webContents.session;
    await ses.flushStorageData();
  }
});
