//import { ipcRenderer } from 'electron';
const debug = require('../../../preload-safe-debug')(
  'Ferdium:Assistant.Translator',
);
import TranslatorRequest from './request';

export default class ServericeAPI {
  num: number;
  base: string;
  constructor() {
    debug('TranslatorHandler constructor');
    this.num = 0;
    this.base = 'http://127.0.0.1:8000';
  }

  // 使用GPT翻译
  async trangpt(apiBase: string, token: string, obj: any) {
    const request = new TranslatorRequest(this.base, token);
    const ret = await request.post('/v2/translator/baidu', obj);
    return ret;
  }

  // 使用GOOGLE翻译
  async tran(msg: string, apiBase: string, token: string) {
    const request = new TranslatorRequest(this.base, token);
    const url = `tran2?msg=${msg}&modes=&tones=`;
    const ret = await request.get(url);
    return ret;
  }

  // 使用GPT生成回复
  async suggest(apiBase: string, token: string, obj: any) {
    const request = new TranslatorRequest(this.base, token);
    const url = `suggest?`;
    const ret = await request.post(url, obj);
    console.warn(
      'webview:getSuggest',
      JSON.stringify(ret),
      this.base,
      token,
      JSON.stringify(obj),
    );
    return ret;
  }
}
