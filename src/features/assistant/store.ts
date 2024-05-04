import { action, computed, makeObservable, observable } from 'mobx';
import type { Webview } from 'react-electron-web-view';
import type { Actions } from '../../actions/lib/actions';
import { createActionBindings } from '../utils/ActionBinding';
import FeatureStore from '../utils/FeatureStore';
import { assistantActions } from './actions';

const debug = require('../../preload-safe-debug')(
  'Ferdium:feature:assistant:store',
);

export default class AssistantStore extends FeatureStore {
  @observable stores: any = null;

  @observable isFeatureActive = false;

  actions: Actions | undefined;

  constructor() {
    super();
    makeObservable(this);
  }

  @observable
  count = 0;

  @observable
  enable = false;

  @observable
  translateSend = false;

  @computed
  get fullName() {
    return `${this.translateSend}:${this.count}`;
  }

  @action _launchIsSend({ enable }) {
    this.translateSend = enable;
    console.warn(enable);
  }

  _openDevTools = () => {
    debug('_openDevTools');
    // debugger;
    const aiPanel = document.querySelector<Webview>('.AIPanel');
    if (aiPanel) {
      if (aiPanel.isDevToolsOpened()) aiPanel.closeDevTools();
      else aiPanel.openDevTools();
    }
  };

  _toggleAssistant = () => {
    this.enable = !this.enable;
  };

  _xgDebug = () => {
    console.warn('Event begin');
    // const aiPanel = document.querySelector<Webview>('.AIPanel');
    // // 直接向元素发送消息，对方使用 .on处理
    // aiPanel.send('authToken', '');
    this.enable = !this.enable;
    console.warn('Event end');
  };

  _reload = () => {
    const aiPanel = document.querySelector<Webview>('.AIPanel');
    aiPanel.reload();
  };
  // ========== PUBLIC API ========= //

  @action start(stores, actions) {
    debug('Assistant::start');
    this.stores = stores;
    this.actions = actions;

    // ACTIONS

    this._registerActions(
      createActionBindings([
        [assistantActions.openDevTools, this._openDevTools],
        [assistantActions.xgDebug, this._xgDebug],
        [assistantActions.reload, this._reload],
        [assistantActions.toggleAssistant, this._toggleAssistant],
      ]),
    );

    this.isFeatureActive = true;
  }

  @action stop() {
    super.stop();
    debug('TodoStore::stop');
    // this.reset(); // TODO: [TECH DEBT][PROP NOT IN CLASS] check it later
    this.isFeatureActive = false;
  }
}
