const { app, BrowserWindow, ipcMain, nativeImage, clipboard } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false   
        }
    });

    mainWindow.loadFile('index.html');
});


    ipcMain.handle('export-image', async (event, imageData) => {
    try {
        // Convert base64 image data to nativeImage
        const image = nativeImage.createFromDataURL(imageData);
        // Write the image to the clipboard
        clipboard.writeImage(image);

        return { success: true, message: 'Image copied to clipboard!' };
    } catch (error) {
        return { success: false, message: 'Failed to copy image to clipboard.' };
    }
    });


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})