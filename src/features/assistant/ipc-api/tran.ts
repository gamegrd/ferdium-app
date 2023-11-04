import { ipcMain } from 'electron';

export default async () => {
  ipcMain.handle('webview:log', async (_event, ...msg: any) => {
    console.warn("handle:webview:log ",...msg);
  });
};
