import Command from "../interfaces/command.interface";

import ExtensionHelper from "../helpers/extension.helper";
import LogHelper from "../helpers/log.helper";

import DictionaryHelper from "../helpers/dictionary.helper";

export default class FindCommand implements Command {
  name: string;
  action: Function;
  extensionHelper: ExtensionHelper;
  dictionaryHelper: DictionaryHelper;
  logHelper: LogHelper;
  vscode: any;

  constructor(vscode: any) {
    this.vscode = vscode;
    this.extensionHelper = new ExtensionHelper(this.vscode);
    this.dictionaryHelper = new DictionaryHelper();
    this.logHelper = new LogHelper();

    this.name = "extension.find";
    this.action = async () => {
      this.vscode.window.showInformationMessage(
        this.dictionaryHelper.startMessage
      );

      const browser = this.vscode.extensions.getExtension(
        this.dictionaryHelper.browserExtensionName
      );

      if (browser && !browser.isActive) {
        browser
          .activate()
          .then(() => {
            this.logHelper.log(this.dictionaryHelper.extensionHasActived);
            this.extensionHelper.findCommand();
          })
          .catch((err: any) => {
            this.logHelper.log(this.dictionaryHelper.extensionHasFailed);
            this.logHelper.log(err);
          });
      }

      await this.extensionHelper.promptWithSearch();
    };
  }
}
