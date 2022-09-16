import { app, BrowserWindow, ipcMain, session, dialog } from "electron";
import { join, parse } from "path";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
}

app.whenReady().then(() => {
  installExtension(VUEJS3_DEVTOOLS);

  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    });
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("dialog:openFolder", handleFolderOpen);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message", (event, message) => {
  console.log(message);
});

async function handleFileOpen() {
  // @ts-ignore
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

async function handleFolderOpen() {
  // @ts-ignore
  const { canceled, filePaths } = await dialog.showOpenDialog(undefined, {
    properties: ["openDirectory", "multiSelections"],
  });
  if (canceled) {
    return;
  } else {
    return filePaths.map(parse);
  }
}
