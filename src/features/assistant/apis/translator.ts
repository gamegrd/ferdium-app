import { ipcRenderer } from 'electron';

// 这里有个坑，一定要用 node 的 fetch ，默认的会跨域
const fetch = require('node-fetch');

export default class TranslatorHandler {
  constructor() {
    ipcRenderer.sendToHost('log', 'TranslatorHandler init');
  }

  // 翻译为对方语言
  async trangpt(apiBase: string, token: string, obj: any) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Franz-Version': '6.2.6',
        Accept: '*/*',
        'Accept-Language': '*',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': 'undici',
        'Accept-Encoding': 'gzip, deflate',
      },
    };
    const url = `${apiBase}/tran?msg=${obj.msg}&modes=&tones=`;
    let ret = 'working grangpt';

    const smsg = JSON.stringify(requestOptions);
    ipcRenderer.sendToHost('log', `发送：${smsg} ${url}`);
    try {
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) {
        ipcRenderer.sendToHost('log', `代码异常${response.status}`);
      }
      const data = await response.json();
      ret = data;
    } catch (error) {
      ret = `返回异常${error} ${url}`;
      ipcRenderer.sendToHost('log', ret);
    }
    return ret;
  }

  // 翻回本地语言
  async getTran2(msg: string, apiBase: string, token: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Franz-Version': '6.2.6',
        Accept: '*/*',
        'Accept-Language': '*',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': 'undici',
        'Accept-Encoding': 'gzip, deflate',
      },
    };
    const url = `${apiBase}/tran2?msg=${msg}&modes=&tones=`;
    let ret = 'working grangpt';
    try {
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) {
        ipcRenderer.sendToHost('log', `代码异常${response.status}`);
      }
      const data = await response.json();
      ret = data;
    } catch (error) {
      ret = `返回异常${error} ${url}`;
      ipcRenderer.sendToHost('log', ret);
    }
    return ret;
  }
}
