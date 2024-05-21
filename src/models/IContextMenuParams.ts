export default interface IContextMenuParams extends Electron.ContextMenuParams {
  formControlType: string;
  enableTranslator: boolean;
  clipboardNotifications: boolean;
  searchEngine: string;
  translatorEngine: string;
  translatorLanguage: string;
}
