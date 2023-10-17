import { ipcRenderer } from 'electron';
import { BrowserWindow } from '@electron/remote';
import { pathExistsSync, readFileSync, existsSync } from 'fs-extra';
import { safeParseInt } from '../../jsUtils';

const debug = require('../../preload-safe-debug')(
  'Ferdium:Plugin:RecipeWebview',
);

class RecipeWebview {
  badgeHandler: any;

  dialogTitleHandler: any;

  notificationsHandler: any;

  sessionHandler: any;

  translatorHanlder: any;

  constructor(
    badgeHandler,
    dialogTitleHandler,
    notificationsHandler,
    sessionHandler,
    translatorHanlder,
  ) {
    this.badgeHandler = badgeHandler;
    this.dialogTitleHandler = dialogTitleHandler;
    this.notificationsHandler = notificationsHandler;
    this.sessionHandler = sessionHandler;
    this.translatorHanlder = translatorHanlder;

    ipcRenderer.on('poll', () => {
      this.loopFunc();

      debug('Poll event');

      // This event is for checking if the service recipe is still actively
      // communicating with the client
      ipcRenderer.sendToHost('alive');
    });
  }

  loopFunc = () => null;

  darkModeHandler: ((darkMode: boolean, config: any) => void) | null = null;

  // TODO Remove this once we implement a proper wrapper.
  get ipcRenderer() {
    return ipcRenderer;
  }

  // TODO Remove this once we implement a proper wrapper.
  get BrowserWindow() {
    return BrowserWindow;
  }

  /**
   * Initialize the loop
   *
   * @param {Function}        Function that will be executed
   */
  loop(fn) {
    this.loopFunc = fn;
  }

  /**
   * Set the unread message badge
   *
   * @param {string | number | undefined | null} direct      Set the count of direct messages
   *                                                         eg. Slack direct mentions, or a
   *                                                         message to @channel
   * @param {string | number | undefined | null} indirect    Set a badge that defines there are
   *                                                         new messages but they do not involve
   *                                                         me directly to me eg. in a channel
   */
  setBadge(direct = 0, indirect = 0) {
    this.badgeHandler.setBadge(direct, indirect);
  }

  /**
   * Set the active dialog title to the app title
   *
   * @param {string | undefined | null} title                Set the active dialog title
   *                                                         to the app title
   *                                                         eg. WhatsApp contact name
   */
  setDialogTitle(title) {
    this.dialogTitleHandler.setDialogTitle(title);
  }

  /**
   * Safely parse the given text into an integer
   *
   * @param  {string | number | undefined | null} text to be parsed
   */
  safeParseInt(text) {
    return safeParseInt(text);
  }

  /**
   * Find if link contains image
   *
   * @param  {string | number | undefined | null} text to be parsed
   */
  isImage(link): boolean {
    if (link === undefined) {
      return false;
    }

    const { role } = link.dataset;

    if (role !== undefined) {
      const roles = ['img'];
      return roles.includes(role);
    }

    const url = link.getAttribute('href');

    const regex = /\.(jpg|jpeg|png|webp|avif|gif|svg)($|\?|:)/;

    return regex.test(url.split(/[#?]/)[0]);
  }

  /**
   * Injects the contents of a CSS file into the current webview
   *
   * @param {Array} files     CSS files that should be injected. This must
   *                          be an absolute path to the file
   */
  injectCSS(...files) {
    // eslint-disable-next-line unicorn/no-array-for-each
    files.forEach(file => {
      if (pathExistsSync(file)) {
        const styles = document.createElement('style');
        styles.innerHTML = readFileSync(file, 'utf8');

        const head = document.querySelector('head');

        if (head) {
          head.append(styles);
          debug('Append styles', styles);
        }
      }
    });
  }

  injectJSUnsafe(...files) {
    Promise.all(
      files.map(file => {
        if (existsSync(file)) {
          return readFileSync(file, 'utf8');
        }
        debug('Script not found', file);
        return null;
      }),
    ).then(scripts => {
      const scriptsFound = scripts.filter(script => script !== null);
      if (scriptsFound.length > 0) {
        debug('Inject scripts to main world', scriptsFound);
        ipcRenderer.sendToHost('inject-js-unsafe', ...scriptsFound);
      }
    });
  }

  /**
   * Set a custom handler for turning on and off dark mode
   *
   * @param {function} handler
   */
  handleDarkMode(handler) {
    this.darkModeHandler = handler;
  }

  onNotify(fn) {
    if (typeof fn === 'function') {
      this.notificationsHandler.onNotify = fn;
    }
  }

  initialize(fn) {
    if (typeof fn === 'function') {
      fn();
    }
  }

  clearStorageData(serviceId, targetsToClear) {
    ipcRenderer.send('clear-storage-data', {
      serviceId,
      targetsToClear,
    });
  }

  releaseServiceWorkers() {
    this.sessionHandler.releaseServiceWorkers();
  }

  setAvatarImage(avatarUrl) {
    ipcRenderer.sendToHost('avatar', avatarUrl);
  }

  openNewWindow(url) {
    ipcRenderer.sendToHost('new-window', url);
  }

  // ------xgdebug-------
  log(...msg: any[]) {
    ipcRenderer.invoke('webview:log', ...msg);
    ipcRenderer.sendToHost('log', ...msg);
  }

  sendToHost(channel: string, ...args: any[]) {
    ipcRenderer.sendToHost(channel, ...args);
  }

  async getTran(
    msg: string,
    apiBase: string,
    token: string,
    modes: string,
    tones: string,
  ) {
    ipcRenderer.sendToHost('log', msg, apiBase, token, modes, tones);
    return 'getTran working...';
  }

  async getSuggest(apiBase: string, token: string, msg: string) {
    ipcRenderer.sendToHost('log', 'getSuggest', msg);
    const res = await this.translatorHanlder.trangpt(apiBase, token, msg);
    ipcRenderer.sendToHost('log', res);
    if (res.status === 0) {
      return res.data;
    }
    ipcRenderer.sendToHost('error', res.msg);
    throw new Error('getTran err');
  }

  // 翻译为对方语言
  async trangpt(apiBase: string, token: string, obj: any) {
    ipcRenderer.sendToHost('log', 'TranGPT', obj);
    //const res = await this.translatorHanlder.trangpt(apiBase, token, obj);
    const res = await this.translatorHanlder.tranbaidu(apiBase, token, {
      msg: obj.msg,
      from: 'auto',
      to: 'en',
    });
    ipcRenderer.sendToHost('log', res);
    if (res.status === 0) {
      return res.data;
    }
    ipcRenderer.sendToHost('error', res.msg);
    throw new Error('getTran err');
  }

  // 对方翻回本地语言
  async getTran2(msg: string, apiBase: string, token: string) {
    ipcRenderer.sendToHost('log', 'getTran2', msg);
    //const res = await this.translatorHanlder.getTran2(msg, apiBase, token);
    const res = await this.translatorHanlder.tranbaidu(apiBase, token, {
      msg: msg,
      from: 'auto',
      to: 'zh',
    });
    ipcRenderer.sendToHost('log', res);
    if (res.status === 0) {
      return res.data;
    }
    ipcRenderer.sendToHost('error', res.msg);
    throw new Error('getTran2 err');
  }

  readfile(file: string) {
    if (pathExistsSync(file)) {
      const content = readFileSync(file, 'utf8');
      return content;
    }
    return null;
  }
}

export default RecipeWebview;
