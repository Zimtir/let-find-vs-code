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

  /**
   * Returns the command list.
   *
   * @returns The list of the available commands inside the extension
   *
   */
  getCommands = (): Command[] => {
    return [new FindCommand(this.vscode), new SelectCommand(this.vscode)];
  };

  /**
   * Adds the command to the command list of VS code.
   *
   * @param context - The VS code context
   * @param command - The command with the specific name and action
   *
   */
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
