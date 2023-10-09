import { ipcMain } from 'electron';

const debug = require('../../../preload-safe-debug')('Ferdium:ipcApi:tran');

export default async () => {
  ipcMain.handle('webview:log', async (_event,...msg:any) => {
    console.warn(...msg);
  });
};
