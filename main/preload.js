// window.electron = require('electron');

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel, args) => {
    ipcRenderer.send(channel, args);
  },
  //   requestPrinter: (...args) => ipcRenderer.invoke("request-printer", ...args),
  //   requestPrint: (...args) => ipcRenderer.invoke("request-print", ...args),

  //   checkLogoForChanges: (data) => ipcRenderer.invoke("check-logo", data),
  getAppVersion: (data) => ipcRenderer.invoke("get-app-version", data),
  checkForUpdate: (data) => ipcRenderer.invoke("check-for-update", data),

  downloadUpdate: () => ipcRenderer.invoke("download-update"),
  installUpdate: () => ipcRenderer.invoke("install-update"),
  onDownloadProgress: ipcRenderer.on("on-downloading", (event, percent) => {
    console.log(`Download progress: ${percent}%`);
    const progressElement = document.getElementById("progress-bar");
    progressElement.innerText = `${Math.round(percent)}%`;
  }),
  onDownlodCompleted: ipcRenderer.on("download-completed", () => {
    const progressElement = document.getElementById("installBtn");
    progressElement.classList.remove = `hideDownload`;
  }),
});
