import * as vscode from "vscode";

import ExtensionHelper from "./helpers/extension.helper";
import LogHelper from "./helpers/log.helper";
import CommandHelper from "./helpers/command.helper";
import DictionaryHelper from "./helpers/dictionary.helper";

export class Extension {
  logHelper: LogHelper;
  extensionHelper: ExtensionHelper;
  commandHelper: CommandHelper;
  dictionaryHelper: DictionaryHelper;

  constructor() {
    this.logHelper = new LogHelper();
    this.dictionaryHelper = new DictionaryHelper();
    this.extensionHelper = new ExtensionHelper(vscode);
    this.commandHelper = new CommandHelper(vscode);
  }

  activate = (context: vscode.ExtensionContext) => {
    this.logHelper.log(this.dictionaryHelper.extensionIsActive);

    const commands = this.commandHelper.getCommands();
    commands.map(command => {
      this.commandHelper.activate(context, command);
    });
  };

  deactivate: Function = () => {};
}
