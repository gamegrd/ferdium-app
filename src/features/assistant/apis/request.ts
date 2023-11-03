import { ipcRenderer } from 'electron';
const debug = require('../../../preload-safe-debug')(
  'Ferdium:Assistant-Request',
);

const fetch = require('node-fetch');

class TranslatorRequest {
  apiBase: string;

  token: string;

  print(...args: any[]) {
    ipcRenderer.sendToHost('print', args);
  }
  constructor(apiBase: string, token: string) {
    this.apiBase = apiBase;
    this.token = token;
  }

  async get(uri: string, options?: RequestInit) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'X-Franz-Version': '6.2.6',
        Accept: '*/*',
        'Accept-Language': '*',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': 'undici',
        'Accept-Encoding': 'gzip, deflate',
      },
      ...options,
    };
    const url = `${this.apiBase}/${uri}`;
    let ret = 'working get';

    const smsg = JSON.stringify(requestOptions);
    debug( `发送：${smsg} ${url}`);
    try {
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) {
        debug( `代码异常${response.status}`);
      }
      const data = await response.json();
      ret = data;
    } catch (error) {
      ret = `返回异常${error} ${url}`;
      debug( ret);
    }
    return ret;
  }

  async post(uri: string, data: any, options?: RequestInit) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'X-Franz-Version': '6.2.6',
        Accept: '*/*',
        'Accept-Language': '*',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': 'undici',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(data),
      ...options,
    };

    ipcRenderer.sendToHost('log', JSON.stringify(requestOptions));
    const url = `${this.apiBase}/${uri}`;
    let ret = 'working post';

    const smsg = JSON.stringify(requestOptions);
    ipcRenderer.sendToHost('log', `send post ：${smsg} ${url}`);
    try {
      const response = await fetch(url, requestOptions);
      this.print('POST REQ:', url, smsg);
      if (response.status !== 200) {
        ipcRenderer.sendToHost('log', `代码异常${response.status}`);
      }
      this.print('POST RSP:', response.status, response.text);
      const data = await response.json();
      ret = data;
    } catch (error) {
      ret = `返回异常 ${error} ${url}`;
      ipcRenderer.sendToHost('log', ret);
    }
    return ret;
  }
}

export default TranslatorRequest;
