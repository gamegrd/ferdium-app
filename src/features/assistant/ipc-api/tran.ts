import { ipcRenderer } from 'electron';

export default async () => {
  // ipcMain.handle('assistant:log', async (_event, ...msg: any) => {
  //   console.warn('handle:assistant:log', ...msg);
  //   return 'Call Ok';
  // });

  // ipcMain.handle('assistant:token', async (_event, ...msg: any) => {
  //   console.warn('assistant:token', ...msg);
  //   debugger;
  //   return 'token is abfc';
  // });

  ipcRenderer.on('assistant:log', (_e, arg) => {
    console.warn('assistant:log', _e, ...arg);
  });
};
