import { ipcRenderer } from 'electron';
//const debug = require('../../../preload-safe-debug')(
//  'Ferdium:Assistant-Request',
//);

const debug = (...args: any[]) => {
  ipcRenderer.sendToHost('debug', args);
};

const fetch = require('node-fetch');

class TranslatorRequest {
  apiBase: string;

  token: string;

  constructor(apiBase: string, token: string) {
    this.apiBase = apiBase;
    this.token = token;
  }

  async get(uri: string, options?: RequestInit) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
        'Accept-Language': '*',
        'Accept-Encoding': 'gzip, deflate',
      },
      ...options,
    };
    const url = `${this.apiBase}/${uri}`;
    let ret = 'working get';

    try {
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) {
        debug(`${response.status}`);
      }
      const data = await response.json();
      debug('fetch get=> ', url, requestOptions, '<=', data);
      ret = data;
    } catch (error) {
      ret = `get fail ${error} ${url}`;
      debug(ret);
    }
    return ret;
  }

  async post(uri: string, data: any, options?: RequestInit) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
        'Accept-Language': '*',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(data),
      ...options,
    };

    debug(JSON.stringify(requestOptions));
    const url = `${this.apiBase}/${uri}`;
    let ret = 'working post';

    try {
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) {
      }
      const data = await response.json();
      debug('fetch post => ', url, requestOptions, '<=', data);
      ret = data;
    } catch (error) {
      ret = `post fail ${error} ${url}`;
      debug(ret);
    }
    return ret;
  }
}

export default TranslatorRequest;
