import { join } from 'node:path';
import { Component, ReactElement } from 'react';
import ElectronWebView from 'react-electron-web-view';

interface IProps {}

class AssistantWebview extends Component<IProps> {
  webview: ElectronWebView | null = null;

  constructor(props: IProps) {
    super(props);

    this.refocusWebview = this.refocusWebview.bind(this);
    this._setWebview = this._setWebview.bind(this);
  }

  refocusWebview(): void {}

  _setWebview(webview): void {
    this.webview = webview;
  }

  _bind() {
    if (this.webview && this.webview.c) {
      this.webview.c.firstChild.addEventListener(
        'ipc-message',
        async (e: any) => {
          console.warn('ipc-message', e, '-----------------------');
          return this._handleIPCMessage(e.channel, e.args);
        },
      );
    }
  }

  _handleIPCMessage(channel, args) {
    switch (channel) {
      case 'authToken': {
        this.webview.send(channel, window.ferdium.stores.user.authToken);
        return;
      }
      default:
        console.warn('Unknown channel', channel, args);
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

    return (
      <ElectronWebView
        className="AIPanel"
        ref={webview => {
          this._setWebview(webview);
          if (webview?.view) {
            webview.view.addEventListener(
              'did-stop-loading',
              this.refocusWebview,
            );
          }
        }}
        autosize
        nodeintegration
        src="https://chat.dfgpt.cc/?id=a51555"
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
        disablewebsecurity={true}
        allowpopups
        webpreferences={`spellcheck=${1}, contextIsolation=0`}
      />
    );
  }
}

export default AssistantWebview;
