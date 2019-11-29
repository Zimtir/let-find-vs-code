export const openBrowser = (vscode: any, url: string) => {
  vscode.commands.executeCommand("browser-preview.openPreview", url);
};
