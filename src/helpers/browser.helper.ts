import DictionaryHelper from './dictionary.helper'
import LogHelper from './log.helper'

export default class BrowserHelper {
  vscode: any
  dictionaryHelper: DictionaryHelper
  logHelper: LogHelper

  constructor(vscode: any) {
    this.vscode = vscode
    this.dictionaryHelper = new DictionaryHelper()
    this.logHelper = new LogHelper()
  }

  /**
   * Returns the status of the browser availability.
   *
   *  @returns the flag for the browser availability
   *
   */
  checkBrowser = (): boolean => {
    let result = false

    const browser = this.vscode.extensions.getExtension(
      this.dictionaryHelper.browserExtensionName
    )

    if (browser && !browser.isActive) {
      result = browser
        .activate()
        .then(() => {
          this.logHelper.log(this.dictionaryHelper.extensionHasActived)
          return true
        })
        .catch((err: any) => {
          this.logHelper.log(this.dictionaryHelper.extensionHasFailed)
          this.logHelper.log(err)
          return false
        })
    }

    return result
  }

  /**
   * Opens browser on the specific URL.
   *
   * @param url - The string
   *
   */
  openBrowser = (url: string) => {
    this.vscode.commands.executeCommand('browser-preview.openPreview', url)
  }
}
