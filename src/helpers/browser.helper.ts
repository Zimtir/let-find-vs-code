export default class BrowserHelper {
  vscode: any;

  constructor(vscode: any) {
    this.vscode = vscode;
  }

  openBrowser = (url: string) => {
    this.vscode.commands.executeCommand("browser-preview.openPreview", url);
  };
}
