import * as vscode from 'vscode'

import ExtensionHelper from './helpers/extension.helper'
import LogHelper from './helpers/log.helper'
import CommandHelper from './helpers/command.helper'
import DictionaryHelper from './helpers/dictionary.helper'
import BrowserHelper from './helpers/browser.helper'

export class Extension {
  logHelper: LogHelper
  extensionHelper: ExtensionHelper
  commandHelper: CommandHelper
  browserHelper: BrowserHelper
  dictionaryHelper: DictionaryHelper

  constructor() {
    this.logHelper = new LogHelper()
    this.dictionaryHelper = new DictionaryHelper()
    this.extensionHelper = new ExtensionHelper(vscode)
    this.commandHelper = new CommandHelper(vscode)
    this.browserHelper = new BrowserHelper(vscode)
  }

  /**
   * Activates the extension.
   */
  activate = (context: vscode.ExtensionContext) => {
    this.logHelper.log(this.dictionaryHelper.extensionIsActive)
    let browserExitst = this.browserHelper.checkBrowser()
    if (browserExitst) {
      const commands = this.commandHelper.getCommands()
      commands.map(command => {
        this.commandHelper.activate(context, command)
      })
    }
  }

  /**
   * Deactivates the extension.
   */
  deactivate: Function = () => {}
}
