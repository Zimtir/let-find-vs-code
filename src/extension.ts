import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "msdn-vs-code-extension" is now active!');

	let disposable = vscode.commands.registerCommand('extension.find', () => {

		vscode.window.showInformationMessage('Start find something right now!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
