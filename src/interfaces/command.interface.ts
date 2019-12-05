import ExtensionHelper from "../helpers/extension.helper";

export default interface Command {
  name: string;
  action: Function;
  extensionHelper: ExtensionHelper;
}
