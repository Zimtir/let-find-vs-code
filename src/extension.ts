import * as vscode from "vscode";
import { openBrowser } from "./helpers/browser.helper";
import { findCommand } from "./helpers/extension.helper";
import { log } from "./helpers/log.helper";
import Dictionary from "./helpers/dictionary.helper";

export function activate(context: vscode.ExtensionContext) {
  log(Dictionary.extensionIsActive);

  let disposable = vscode.commands.registerCommand("extension.find", () => {
    vscode.window.showInformationMessage(Dictionary.startMessage);

    const browser = vscode.extensions.getExtension(
      Dictionary.browserExtensionName
    );

    const extensionActivated = () => {
      log(Dictionary.extensionHasActived);
      findCommand(vscode);
      runBrowser();
    };

    const extensionFailed = () => {
      log(Dictionary.extensionHasFailed);
    };

    const runBrowser = (url: string = Dictionary.defaultUrl) => {
      openBrowser(vscode, url);
    };

    if (browser) {
      if (browser.isActive == false) {
        browser.activate().then(extensionActivated, extensionFailed);
      } else {
        runBrowser();
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
