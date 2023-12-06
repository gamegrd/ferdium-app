/**
 * Get API base URL from store
 */
import { isDevMode, API_VERSION } from '../environment-remote';
import {
  DEV_API_FRANZ_WEBSITE,
  LIVE_FRANZ_API,
  LIVE_FERDIUM_API,
  LOCAL_HOSTNAME,
  LOCAL_SERVER,
  SERVER_NOT_LOADED,
  LOCAL_DEBUG,
  LOCAL_API,
  LOCAL_AI_URL,
  LIVE_AI_URL,
} from '../config';
import { fixUrl } from '../helpers/url-helpers';

export function aiBase() {
  if (LOCAL_DEBUG && isDevMode) {
    return LOCAL_AI_URL;
  }
  return LIVE_AI_URL;
}

// Note: This cannot be used from the internal-server since we are not running within the context of a browser window
export default function apiBase(withVersion = true) {
  if (LOCAL_DEBUG && isDevMode) {
    const url = LOCAL_API;
    return fixUrl(withVersion ? `${url}/${API_VERSION}` : url);
  }
  if (!(window as any).ferdium?.stores.settings?.all?.app.server) {
    // Stores have not yet been loaded - return SERVER_NOT_LOADED to force a retry when stores are loaded
    return SERVER_NOT_LOADED;
  }

  const url =
    (window as any).ferdium.stores.settings.all.app.server === LOCAL_SERVER
      ? `http://${LOCAL_HOSTNAME}:${
          (window as any).ferdium.stores.requests.localServerPort
        }`
      : LIVE_FERDIUM_API; // (window as any).ferdium.stores.settings.all.app.server;

  return fixUrl(withVersion ? `${url}/${API_VERSION}` : url);
}

export function needsToken(): boolean {
  return (
    (window as any).ferdium.stores.settings.all.app.server === LOCAL_SERVER
  );
}

export function localServerToken(): string | undefined {
  return needsToken()
    ? (window as any).ferdium.stores.requests.localServerToken
    : undefined;
}

export function importExportURL() {
  const base = apiBase(false);
  return needsToken() ? `${base}/token/${localServerToken()}` : base;
}

export function serverBase() {
  const serverType = (window as any).ferdium.stores.settings.all.app.server;
  const noServerFerdi = 'You are using Ferdi without a server';
  const noServerFerdium = 'You are using Ferdium without a server';

  let terms;
  switch (serverType) {
    case LIVE_FRANZ_API: {
      terms = DEV_API_FRANZ_WEBSITE;
      break;
    }
    case noServerFerdi: {
      terms = LIVE_FERDIUM_API;
      break;
    }
    case noServerFerdium: {
      terms = LIVE_FERDIUM_API;
      break;
    }
    default: {
      terms = serverType;
    }
  }

  return fixUrl(terms);
}

export function resetServer() {
  // (window as any).ferdium.stores.settings.all.app.server = LIVE_FERDIUM_API;
  console.warn((window as any).ferdium.stores.settings.all.app.server);
}
export function serverName(): string {
  const serverType = (window as any).ferdium.stores.settings.all.app.server;
  const noServerFerdi = 'You are using Ferdi without a server';
  const noServerFerdium = 'You are using DFgpt without a server';

  let nameServer;
  switch (serverType) {
    case LIVE_FRANZ_API: {
      nameServer = 'Franz';
      break;
    }
    case LIVE_FERDIUM_API: {
      nameServer = 'DFgpt';
      break;
    }
    case noServerFerdi: {
      nameServer = 'No';
      break;
    }
    case noServerFerdium: {
      nameServer = 'No';
      break;
    }
    default: {
      nameServer = 'Custom';
    }
  }

  return nameServer;
}
