// Settings modal functionality
let settingsModal;
let currentSettings = {};

// Create settings modal
function createSettingsModal() {
  if (document.getElementById('groupme-settings-modal')) {
    return;
  }

  const modalHTML = `
    <div id="groupme-settings-modal" style="display: none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);">
      <div style="background-color: #fff; margin: 10% auto; padding: 30px; border-radius: 8px; width: 500px; max-width: 90%; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 24px; color: #333;">Settings</h2>
          <button id="close-settings" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: flex; align-items: center; cursor: pointer; padding: 12px; border-radius: 4px; transition: background-color 0.2s;">
            <input type="checkbox" id="launch-on-start" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
            <div>
              <div style="font-weight: 500; color: #333; margin-bottom: 4px;">Launch on System Start</div>
              <div style="font-size: 13px; color: #666;">Automatically start GroupMe when you log in</div>
            </div>
          </label>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: flex; align-items: center; cursor: pointer; padding: 12px; border-radius: 4px; transition: background-color 0.2s;">
            <input type="checkbox" id="minimize-to-tray" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
            <div>
              <div style="font-weight: 500; color: #333; margin-bottom: 4px;">Minimize to Tray</div>
              <div style="font-size: 13px; color: #666;">Keep app running in system tray when closed</div>
            </div>
          </label>
        </div>

        <div style="margin-bottom: 30px;">
          <label style="display: flex; align-items: center; cursor: pointer; padding: 12px; border-radius: 4px; transition: background-color 0.2s;">
            <input type="checkbox" id="show-notifications" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
            <div>
              <div style="font-weight: 500; color: #333; margin-bottom: 4px;">Tray Notifications</div>
              <div style="font-size: 13px; color: #666;">Show notifications from the system tray</div>
            </div>
          </label>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button id="cancel-settings" style="padding: 10px 20px; border: 1px solid #ddd; background: #fff; border-radius: 4px; cursor: pointer; font-size: 14px; color: #333;">Cancel</button>
          <button id="save-settings" style="padding: 10px 20px; border: none; background: #00AFF0; color: white; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;">Save</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  settingsModal = document.getElementById('groupme-settings-modal');

  // Event listeners
  document.getElementById('close-settings').addEventListener('click', closeSettings);
  document.getElementById('cancel-settings').addEventListener('click', closeSettings);
  document.getElementById('save-settings').addEventListener('click', saveSettings);

  // Close on outside click
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      closeSettings();
    }
  });
}

async function openSettings() {
  createSettingsModal();
  
  // Load current settings
  currentSettings = await window.electronAPI.getSettings();
  
  document.getElementById('launch-on-start').checked = currentSettings.launchOnStart;
  document.getElementById('minimize-to-tray').checked = currentSettings.minimizeToTray;
  document.getElementById('show-notifications').checked = currentSettings.showTrayNotifications;
  
  settingsModal.style.display = 'block';
}

function closeSettings() {
  if (settingsModal) {
    settingsModal.style.display = 'none';
  }
}

async function saveSettings() {
  const settings = {
    launchOnStart: document.getElementById('launch-on-start').checked,
    minimizeToTray: document.getElementById('minimize-to-tray').checked,
    showTrayNotifications: document.getElementById('show-notifications').checked
  };

  await window.electronAPI.saveSettings(settings);
  closeSettings();
}

// Add settings button to GroupMe interface
function addSettingsButton() {
  // Wait for the page to load
  const checkInterval = setInterval(() => {
    // Try to find a suitable place to add the settings button
    const header = document.querySelector('header') || document.querySelector('[role="banner"]');
    
    if (header && !document.getElementById('groupme-settings-btn')) {
      const settingsBtn = document.createElement('button');
      settingsBtn.id = 'groupme-settings-btn';
      settingsBtn.innerHTML = '⚙️';
      settingsBtn.title = 'App Settings';
      settingsBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: #00AFF0;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: transform 0.2s;
      `;
      
      settingsBtn.addEventListener('mouseenter', () => {
        settingsBtn.style.transform = 'scale(1.1)';
      });
      
      settingsBtn.addEventListener('mouseleave', () => {
        settingsBtn.style.transform = 'scale(1)';
      });
      
      settingsBtn.addEventListener('click', openSettings);
      document.body.appendChild(settingsBtn);
      
      clearInterval(checkInterval);
    }
  }, 1000);

  // Stop trying after 30 seconds
  setTimeout(() => clearInterval(checkInterval), 30000);
}

// Initialize when page loads
if (window.electronAPI) {
  // Listen for settings open request from main process
  window.electronAPI.onOpenSettings(() => {
    openSettings();
  });

  // Add settings button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSettingsButton);
  } else {
    addSettingsButton();
  }
}
