const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const { autoUpdater } = require("electron-updater");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.handle("check-for-update", async () => {
  const results = await autoUpdater.checkForUpdates();
  return results.updateInfo;
});



const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });



  

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
      win.maximize();
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.maximize();
    // win.webContents.openDevTools();

    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }

  ipcMain.handle("download-update", async () => {
    autoUpdater.downloadUpdate();
  });
  autoUpdater.on("download-progress", (info) => {
    win.webContents.send("on-downloading", info.percent);
  });

  autoUpdater.on("update-downloaded", (event) => {
    win.webContents.send("download-completed");
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "mithushan-desktop-app",
      message:
        process.platform === "win32" ? event.releaseNotes : event.releaseName,
      detail:
        "A new version has been downloaded. Restart the application to apply the updates.",
    };
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });
  // ipcMain.handle("install-update", () => {
  //   autoUpdater.on("update-downloaded", () => {
  //     autoUpdater.quitAndInstall();
  //   });
  // });
};

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});

app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath("exe"),
});

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
