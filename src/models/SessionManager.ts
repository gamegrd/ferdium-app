import { join } from 'node:path';
import ElectronWebView from 'react-electron-web-view';
import { ipcRenderer } from 'electron';
import { IRecipe } from './Recipe';
import Session = Electron.Session;
import { isDevMode } from '../environment-remote';

const Extensions = {
  line: [
    {
      id: 'ophjlpahpchlmihnnnihgmmeilfjmjjc',
      version: '3.1',
      home: '/index.html',
      replaceHome: true,
      addSpecialExtension: true,
    },
  ],
  // whatsapp: [
  //   {
  //     id: 'jmjcgjmipjiklbnfbdclkdikplgajhgc',
  //     version: '1.3.2_0',
  //     home: '/index.html',
  //   },
  //   {
  //     id: 'lpbkofhnclhhlaibcklkgaonbbmhjeco',
  //     version: '0.46_0',
  //     home: '/index.html',
  //   },
  // ],
};
export default class SessionManager {
  recipe: IRecipe;

  rootPath: string = '';

  webview: ElectronWebView | null;

  serviceId: string = '';

  extensionsRoot: string = '';

  outExts = [];

  extensions = [];

  config = {};

  constructor(data: {
    recipe: IRecipe;
    rootPath: string;
    serviceId: string;
    extensions: [];
    webview: ElectronWebView;
    session: Session;
    recipeSession: Session;
  }) {
    this.recipe = data.recipe;
    this.serviceId = data.serviceId;
    this.extensionsRoot = 'extensions/';
    this.outExts = [];
    this.config = data;
    this.extensions = Extensions[data.recipe.id];
    if (data.recipe.id === 'whatsapp') {
      this.extensions = this.extensions.filter(v =>
        data.extensions.includes(v['id']),
      );
    }
    this.ReadyExtensionsFor();
  }

  ReadyExtensionsFor() {
    this.LoadExtensions();
  }

  addSpecialExtension(extensionPath) {
    ipcRenderer.send('add-special-extension', {
      serviceId: this.serviceId,
      url: extensionPath,
    });
  }

  LoadExtensions() {
    if (!this.extensions) {
      return;
    }
    for (const item of this.extensions) {
      const extensionPath = join(
        isDevMode ? process.cwd() : this.config['rootPath'],
        'extensions',
        item['id'],
        item['version'],
      );
      if (item['addSpecialExtension']) {
        this.addSpecialExtension(extensionPath);
      }

      const s = this.config['recipeSession'];
      s.loadExtension(extensionPath).then(() => {
        console.log('extension loaded !!!!!!!!!!! ');

        if (item['replaceHome']) {
          setTimeout(() => {
            this.config['webview'].loadURL(
              `chrome-extension://${item['id']}${item['home']}`,
            );
            // this.config['webview'][
            //   'src'
            // ] = `chrome-extension://${item['id']}${item['home']}`;
          }, 2000);
        }
      });
    }
  }
}
