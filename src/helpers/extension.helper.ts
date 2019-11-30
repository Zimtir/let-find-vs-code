import { checkString } from "./common.helper";
import { log } from "./log.helper";
import Dictionary from "./dictionary.helper";
import * as request from "request-promise-native";
import { openBrowser } from "./browser.helper";
import Source from "../interfaces/source.interface";
import { getSources } from "./source.helper";
import axios from "axios";

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

const mockAddStat = () => {
  function randomDate(start: any, end: any) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  function addStat(name: string, value: any) {
    try {
      axios
        .post("http://localhost:8081/addStatistics", {
          time: formatDate(randomDate(new Date(2012, 0, 1), new Date())),
          name: name,
          value: value
        })
        .then(response => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (let i = 0; i < 100; i++) {
    addStat(`name ${getRandomInt(0, 10)}`, getRandomInt(0, 1000));
  }
};

const addStatistics = (query: string) => {
  try {
    axios
      .post("http://localhost:8081/addStatistics", {
        time: formatDate(new Date()),
        name: query,
        value: 1
      })
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const formatDate = (date: any) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, 1, 1].join("-");
};

export const search = async (vscode: any, query: string) => {
  if (checkString(query)) {
    log(`${Dictionary.startQuery} ${query}`);

    // IF NEED MOCK DATA
    mockAddStat();

    // IF NEED TRUE DATA
    //    addStatistics(query);

    const sources: Source[] = getSources(query);
    const subsources: Source[] = [];

    // TODO (Parser): Add the call of the request
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
