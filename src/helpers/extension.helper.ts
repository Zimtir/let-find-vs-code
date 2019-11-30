import { checkString } from "./common.helper";
import { log } from "./log.helper";
import Dictionary from "./dictionary.helper";
import { openBrowser } from "./browser.helper";
import Source from "../interfaces/source.interface";
import { getSources } from "./source.helper";

export const findCommand = (vscode: any) => {
  vscode.commands.getCommands(true).then(
    (cmds: any) => {
      log("success");
    },
    () => {
      log("failed");
    }
  );
};

export const promptWithSearch = async (vscode: any) => {
  const alreadySelectedText = getSelectedText(vscode);

  const query = await vscode.window.showInputBox({
    ignoreFocusOut: alreadySelectedText === "",
    placeHolder: Dictionary.firstBoxPlaceholder,
    value: alreadySelectedText,
    valueSelection: [0, alreadySelectedText.length + 1]
  });

  await search(vscode, query!);
};

export const search = async (vscode: any, query: string) => {
  if (checkString(query)) {
    log(`${Dictionary.startQuery} ${query}`);

    const sources: Source[] = getSources(query);
    const subsources: Source[] = [];

    const sourcePromises = sources.map(async source => {
      try {
        if (source.find) {
          const sourceResponses = await source.find(query);
          if (sourceResponses) {
            sourceResponses.map((sourceResponse: Source) => {
              subsources.push(sourceResponse);
            });
          }
        }
      } catch (err) {
        log(err);
      }
    });

    await Promise.all(sourcePromises);

    sources.push(...subsources);

    const selectedTitle = await vscode.window.showQuickPick(
      sources.map(source => source.title),
      { canPickMany: false }
    );

    const selectedSource = sources.find(
      source => source.title === selectedTitle
    );

    if (selectedSource) {
      openBrowser(vscode, selectedSource.url);
    }
  }

  return;
};

export const getSelectedText = (vscode: any): string => {
  const editor = vscode.window.activeTextEditor;
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
