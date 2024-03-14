import { join } from 'node:path';

import { Component, ReactElement } from 'react';
import ElectronWebView from 'react-electron-web-view';
import { observer, inject } from 'mobx-react';
import { aiBase } from '../../api/apiBase';
import { RealStores } from '../../stores';

interface IProps {
  stores?: RealStores;
}

interface IState {}
@inject('stores')
@observer
class AssistantWebview extends Component<IProps, IState> {
  webview: ElectronWebView | null = null;

  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.refocusWebview = this.refocusWebview.bind(this);
    this._setWebview = this._setWebview.bind(this);
  }

  refocusWebview(): void {}

  _setWebview(webview): void {
    this.webview = webview;
  }

  _bind() {
    if (this.webview?.c) {
      this.webview.c.firstChild.addEventListener(
        'ipc-message',
        async (e: any) => {
          console.warn('ipc-message', e);
          // 处理发向本webview的消息
          return this._handleIPCMessage(e.channel, e.args);
        },
      );
    }
  }

  _handleIPCMessage(channel, args) {
    switch (channel) {
      case 'authToken': {
        //  发token到目标 webview : this.webview
        const token = window.ferdium.stores.user.authToken;
        console.warn('发token到目标 webview :', token);
        this.webview.send(channel, token);
        return;
      }
      case 'clearToken': {
        //  发token到目标 webview : this.webview
        this.webview.send(channel, '');
        return;
      }
      default: {
        console.warn('Unknown channel', channel, args);
      }
    }
  }

  render(): ReactElement {
    const preloadScript = join(
      __dirname,
      '..',
      '..',
      'features',
      'assistant',
      'preload.js',
    );
    const enabled = this.props.stores?.assistants.enable;

    return (
      <div style={{ width: enabled ? '600px' : '0px', height: '100%' }}>
        <ElectronWebView
          className="AIPanel"
          ref={(webview: any) => {
            this._setWebview(webview);
            if (webview?.view) {
              webview.view.style.height = '100%';
              webview.view.addEventListener(
                'did-stop-loading',
                this.refocusWebview,
              );
            }
          }}
          autosize
          nodeintegration
          src={aiBase()}
          preload={preloadScript}
          onDidAttach={() => {
            // Force the event handler to run in a new task.
            // This resolves a race condition when the `did-attach` is called,
            // but the webview is not attached to the DOM yet:
            // https://github.com/electron/electron/issues/31918
            // This prevents us from immediately attaching listeners such as `did-stop-load`:
            // https://github.com/ferdium/ferdium-app/issues/157
            setTimeout(() => {
              this._bind();
            }, 0);
          }}
          // onUpdateTargetUrl={this.updateTargetUrl} // TODO: [TS DEBT] need to check where its from
          disablewebsecurity
          allowpopups
          webpreferences={`spellcheck=${1}, contextIsolation=0`}
        />
      </div>
    );
  }
}

export default AssistantWebview;
