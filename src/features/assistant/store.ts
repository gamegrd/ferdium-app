import { Webview } from 'react-electron-web-view';
import FeatureStore from '../utils/FeatureStore';
import { asstantActions } from './actions';
import { createActionBindings } from '../utils/ActionBinding';
import { observable, computed, action, makeObservable } from 'mobx';
import { Actions } from '../../actions/lib/actions';

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
    debugger; 
    const aiPanel = document.querySelector<Webview>('#AIPanel');
    if (aiPanel) {
      aiPanel.openDevTools();
    }
  };

  // ========== PUBLIC API ========= //

  @action start(stores, actions) {
    debug('Assistant::start');
    this.stores = stores;
    this.actions = actions;

    // ACTIONS

    this._registerActions(
      createActionBindings([[asstantActions.openDevTools, this._openDevTools]]),
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
