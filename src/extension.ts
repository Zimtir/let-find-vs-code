import * as vscode from "vscode";
import { openBrowser } from "./helpers/browser.helper";
import {
  findCommand,
  search,
  getSelectedText,
  promptWithSearch
} from "./helpers/extension.helper";
import { log } from "./helpers/log.helper";
import Dictionary from "./helpers/dictionary.helper";

export const activate = (context: vscode.ExtensionContext) => {
  log(Dictionary.extensionIsActive);

  const extensionFind = vscode.commands.registerCommand(
    "extension.find",
    async () => {
      vscode.window.showInformationMessage(Dictionary.startMessage);

      const browser = vscode.extensions.getExtension(
        Dictionary.browserExtensionName
      );

      const extensionActivated = () => {
        log(Dictionary.extensionHasActived);
        findCommand(vscode);
      };

      const extensionFailed = () => {
        log(Dictionary.extensionHasFailed);
      };

      if (browser) {
        if (browser.isActive == false) {
          browser.activate().then(extensionActivated, extensionFailed);
        } else {
        }

        await promptWithSearch(vscode);
      }
    }
  );

  const extensionSearchBySelection = vscode.commands.registerCommand(
    "extension.searchBySelection",
    async () => {
      const query = getSelectedText(vscode);
      await search(vscode, query);
    }
  );

  context.subscriptions.push(extensionFind);
  context.subscriptions.push(extensionSearchBySelection);
};

export function deactivate() {}
