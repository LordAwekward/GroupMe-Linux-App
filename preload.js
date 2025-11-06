const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  showNotification: (notification) => ipcRenderer.invoke('show-notification', notification),
  onOpenSettings: (callback) => ipcRenderer.on('open-settings', callback)
});
