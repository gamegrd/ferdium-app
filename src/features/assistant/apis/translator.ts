//import { ipcRenderer } from 'electron';
const debug = require('../../../preload-safe-debug')(
  'Ferdium:Assistant.Translator',
);
import TranslatorRequest from './request';

export default class TranslatorHandler {
  num: number;
  constructor() {
    debug('TranslatorHandler constructor');
    this.num = 0;
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
    const url = `suggest?`;
    const ret = await request.post(url, obj);
    console.warn(
      'webview:getSuggest',
      JSON.stringify(ret),
      apiBase,
      token,
      JSON.stringify(obj),
    );
    return ret;
  }

  // 翻译为对方语言
  async tranbaidu(apiBase: string, token: string, obj: any) {
    const promise = new Promise((resolve, reject) => {
      // 异步操作
      setTimeout(async () => {
        try {
          this.num -= 1;
          const request = new TranslatorRequest(
            'http://127.0.0.1:10086',
            token,
          );
          const url = `cgi/translator/baidu`;
          const ret = await request.post(url, obj);
          resolve(ret);
        } catch (error) {
          // 失败，调用reject
          reject(error);
        }
      }, this.num * 1000);
    });
    this.num += 1;
    return promise;
  }
}
