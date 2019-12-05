import Command from "../interfaces/command.interface";
import ExtensionHelper from "../helpers/extension.helper";

export default class SelectCommand implements Command {
  name: string;
  action: Function;
  extensionHelper: ExtensionHelper;
  vscode: any;

  constructor(vscode: any) {
    this.vscode = vscode;
    this.extensionHelper = new ExtensionHelper(this.vscode);

    this.name = "extension.findBySelection";
    this.action = async () => {
      const query = this.extensionHelper.getSelectedText();
      await this.extensionHelper.search(query);
    };
  }
}
