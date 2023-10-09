import { observable, computed, action, makeObservable } from 'mobx';

class AssistantsStore {
  constructor() {
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
}

export default AssistantsStore;
