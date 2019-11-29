export const findCommand = (vscode: any) => {
  vscode.commands.getCommands(true).then(
    (cmds: any) => {
      console.log("success");
    },
    () => {
      console.log("failed");
    }
  );
};
