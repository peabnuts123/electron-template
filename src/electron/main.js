// @TODO switch by environment

require('electron-reloader')(module);
const { app, BrowserWindow } = require('electron');

console.log("I am electron");

void (async () => {
  async function createWindow() {
    const window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    await window.loadFile('build/index.html');
  }


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });

  await app.whenReady();
  await createWindow();
})();
