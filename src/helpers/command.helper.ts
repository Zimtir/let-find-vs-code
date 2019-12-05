import * as vscode from "vscode";

import Command from "../interfaces/command.interface";

import FindCommand from "../commands/find.command";
import SelectCommand from "../commands/select.command";
import LogHelper from "./log.helper";

export default class CommandHelper {
  vscode: any;
  logHelper: LogHelper;

  constructor(vscode: any) {
    this.vscode = vscode;
    this.logHelper = new LogHelper();
  }

  getCommands = (): Command[] => {
    return [new FindCommand(this.vscode), new SelectCommand(this.vscode)];
  };

  activate = (context: vscode.ExtensionContext, command: Command) => {
    try {
      let subscription = this.vscode.commands.registerCommand(
        command.name,
        command.action
      );
      context.subscriptions.push(subscription);
    } catch (err) {
      this.logHelper.log(err);
    }
  };
}
