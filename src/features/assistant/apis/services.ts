//import { ipcRenderer } from 'electron';
const debug = require('../../../preload-safe-debug')(
  'Ferdium:Assistant.Translator',
);
import { ipcRenderer } from 'electron';
import TranslatorRequest from './request';

export default class ServericeAPI {
  num: number;
  base: string;
  token: string;
  constructor() {
    this.num = 0;
    this.base = 'http://127.0.0.1:30001';
    this.token = '';
    ipcRenderer.invoke('token').then(token => {
      this.token = token;
    });
    debug('TranslatorHandler constructor', this.base, this.token);
  }

  // 使用GPT翻译
  async trangpt(_apiBase: string, token: string, obj: any) {
    return this.baidu_tran(token,obj.msg,'','')
  }

  // 翻回本地语言
  async getTran2(msg: string, _apiBase: string, token: string) {
    return this.baidu_tran(token,msg, '', 'zh');
  }

  // 使用GOOGLE翻译
  async tran(msg: string, _apiBase: string, token: string) {
    return this.baidu_tran(token,msg, '', '');
  }

  // 使用GPT生成回复
  async getSuggest(_apiBase: string, token: string, obj: any) {
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

  // 使用GOOGLE翻译
  async baidu_tran(token:string,msg: string, from: string, to: string) {
    const request = new TranslatorRequest(this.base, token);
    let obj = {
      msg: msg,
      from: from,
      to: to,
    };
    const ret = await request.post('v2/translate/baidu', obj);
    return ret;
  }
}
