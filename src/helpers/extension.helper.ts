import Source from "../interfaces/source.interface";

import CommonHelper from "./common.helper";
import LogHelper from "./log.helper";
import BrowserHelper from "./browser.helper";
import SourceHelper from "./source.helper";
import DictionaryHelper from "./dictionary.helper";

export default class ExtensionHelper {
  commonHelper: CommonHelper;
  browserHelper: BrowserHelper;
  sourceHelper: SourceHelper;
  logHelper: LogHelper;
  dictionaryHelper: DictionaryHelper;

  vscode: any;

  constructor(vscode: any) {
    this.vscode = vscode;
    this.logHelper = new LogHelper();
    this.commonHelper = new CommonHelper();
    this.sourceHelper = new SourceHelper();
    this.dictionaryHelper = new DictionaryHelper();
    this.browserHelper = new BrowserHelper(this.vscode);
  }

  /**
   * Opens the pallete and search the query in the available sources.
   *
   */
  promptWithSearch = async () => {
    const alreadySelectedText = this.getSelectedText();

    const query = await this.vscode.window.showInputBox({
      ignoreFocusOut: alreadySelectedText === "",
      placeHolder: this.dictionaryHelper.firstBoxPlaceholder,
      value: alreadySelectedText,
      valueSelection: [0, alreadySelectedText.length + 1]
    });

    await this.search(query!);
  };

  /**
   * Looking for the query of user.
   *
   * @param query - The query like string
   *
   */
  search = async (query: string) => {
    if (this.commonHelper.checkString(query)) {
      this.logHelper.log(`${this.dictionaryHelper.startQuery} ${query}`);

      const sources: Source[] = this.sourceHelper.getSources(query);
      const subsources: Source[] = [];

      const sourcePromises = sources.map(async source => {
        try {
          if (source.find) {
            const sourceResponses = await source.find(query);
            if (sourceResponses) {
              sourceResponses.map((sourceResponse: Source) => {
                if (this.commonHelper.checkString(sourceResponse.title)) {
                  subsources.push(sourceResponse);
                }
              });
            }
          }
        } catch (err) {
          this.logHelper.log(err);
        }
      });

      await Promise.all(sourcePromises);

      sources.push(...subsources);

      const selectedTitle = await this.vscode.window.showQuickPick(
        sources.map(source => source.title),
        { canPickMany: false }
      );

      const selectedSource = sources.find(
        source => source.title === selectedTitle
      );

      if (selectedSource) {
        this.browserHelper.openBrowser(selectedSource.url);
      }
    }
  };

  /**
   * Returns the selected text inside editor.
   *
   * @returns The string from the selection
   *
   */
  getSelectedText = (): string => {
    const editor = this.vscode.window.activeTextEditor;
    if (!editor) {
      return "";
    }

    const document = editor.document;
    const eol = document.eol === 1 ? "\n" : "\r\n";

    let result: string = "";

    const selectedTextLines = editor.selections.map((selection: any) => {
      if (
        selection.start.line === selection.end.line &&
        selection.start.character === selection.end.character
      ) {
        const range = document.lineAt(selection.start).range;
        const text = editor.document.getText(range);
        return `${text}${eol}`;
      }

      return editor.document.getText(selection);
    });

    if (selectedTextLines.length > 0) {
      result = selectedTextLines[0];
    }

    result = result.trim();
    return result;
  };
}
