// import { ipcRenderer } from 'electron';

const debug = require('../../../preload-safe-debug')(
  'Ferdium:Assistant.Translator',
);

export default class TranslatorHandler {
  num: number;

  constructor() {
    debug('TranslatorHandler constructor');
    this.num = 0;
  }
}
