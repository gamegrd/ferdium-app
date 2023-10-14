import { ipcRenderer } from 'electron';

import TranslatorRequest from './request';

export default class TranslatorHandler {
  constructor() {
    ipcRenderer.sendToHost('log', 'TranslatorHandler init');
  }

  // 翻译为对方语言
  async trangpt(apiBase: string, token: string, obj: any) {
    const request = new TranslatorRequest(apiBase, token);
    const url = `tran?msg=${obj.msg}&modes=&tones=`;
    const ret = await request.get(url);
    return ret;
  }

  // 翻回本地语言
  async getTran2(msg: string, apiBase: string, token: string) {
    const request = new TranslatorRequest(apiBase, token);
    const url = `tran2?msg=${msg}&modes=&tones=`;
    const ret = await request.get(url);
    return ret;
  }

  // 猜测回复
  async getSuggest(apiBase: string, token: string, obj: any) {
    const request = new TranslatorRequest(apiBase, token);
    const url = `suggest?msg=${obj}`;
    const ret = await request.post(url, obj);
    return ret;
  }
}
