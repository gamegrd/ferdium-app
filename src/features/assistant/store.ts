import { observable, computed, action, makeObservable } from 'mobx';
import { Actions } from '../../actions/lib/actions';

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
