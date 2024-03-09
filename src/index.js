// variable de entorno para saber si está en producción o desarrollo
process.env.NODE_ENV = 'development';
const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const server = require('./server/app');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1240,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    frame: false
  });

  // and load the index.html of the app.
  mainWindow.menuBarVisible = false;
  mainWindow.loadURL(server.get('url'));
  // Open the DevTools.
  // Registrar Ctrl + Alt + D si está en desarrollo para abrir las DevTools
  if (process.env.NODE_ENV === 'development') {
    globalShortcut.register('CommandOrControl+Alt+D', () => {
      mainWindow.webContents.openDevTools();
    });
    // Ctrl + R para recargar la ventana
    globalShortcut.register('CommandOrControl+R', () => {
      mainWindow.reload();
    });
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
