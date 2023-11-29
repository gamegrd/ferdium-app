import { ipcRenderer } from 'electron';

window['xgLoad'] = {
  sendToHost(channel: string, ...args: any[]) {
    return ipcRenderer.sendToHost(channel, args);
  },
  invoke(channel: string, ...args: any[]) {
    return ipcRenderer.invoke(channel, args);
  },
};

ipcRenderer.on("authToken", (event, message) => {
  localStorage.setItem('authToken', message);
  console.warn('Received host message', event, message);
});

console.warn(' webview-preload.js: ok ');
