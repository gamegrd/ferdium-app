import { ipcRenderer } from 'electron';

const ASSISTANT_HOST_CHANNEL = 'ASSISTANT_HOST_CHANNEL';
const ASSISTANT_CLIENT_CHANNEL = 'ASSISTANT_CLIENT_CHANNEL';

window['xgLoad'] = {
  sendToHost(channel: string, ...args: any[]) {
    return ipcRenderer.sendToHost(channel, args);
  },
  invoke(channel: string, ...args: any[]) {
    return ipcRenderer.invoke(channel, args);
  },
};

window.addEventListener(
  'message',
  event => {
    ipcRenderer.sendToHost(ASSISTANT_HOST_CHANNEL, event.data);
    console.warn('sendToHost:', ipcRenderer, event.data); // { key: 'value' }
    console.warn(window['xgLoad'].sendToHost('990950'));
  },
  false,
);

console.warn(' webview-preload.js: ok ');
