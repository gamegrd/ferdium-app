import localStorage from 'mobx-localstorage';
import { when } from 'mobx';
import { createHash } from 'node:crypto';
import { localServerToken, needsToken } from '../apiBase';
import { ferdiumLocale, ferdiumVersion } from '../../environment-remote';

export const prepareAuthRequest = (
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  options = { method: 'GET' },
  auth = true,
) => {
  const timeStamp = Date.now();
  const md5 = createHash('md5');
  md5.update(`xgDebug-${timeStamp}`);
  const md5Timestamp = md5.digest('hex');
  const request = Object.assign(options, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Franz-Source': 'desktop',
      'X-Franz-Version': ferdiumVersion,
      'X-Franz-platform': process.platform,
      'X-xgDebug-timestamp': `${timeStamp}`,
      'X-xgDebug-sign': md5Timestamp,
      'X-Franz-Timezone-Offset': new Date().getTimezoneOffset(),
      'X-Franz-System-Locale': ferdiumLocale,
      // @ts-expect-error Property 'headers' does not exist on type '{ method: string; }'.
      ...options.headers,
    },
  });

  if (auth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
};

export const prepareLocalToken = async (requestData: {
  method: string;
  headers?: any;
  body?: any;
}) => {
  await when(() => !needsToken() || !!localServerToken(), { timeout: 2000 });
  const token = localServerToken();
  if (token) {
    requestData.headers['X-Ferdium-Local-Token'] = token;
  }
};

export const sendAuthRequest = async (
  url: RequestInfo,
  options?: { method: string; headers?: any; body?: any },
  auth?: boolean,
) => {
  const request = prepareAuthRequest(options, auth);
  await prepareLocalToken(request);
  // @ts-expect-error Argument of type '{ method: string; } & { mode: string; headers: any; }' is not assignable to parameter of type 'RequestInit | undefined'.
  return window.fetch(url, request);
};
