// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

const EXTENSION_ID = "extension.kandavu";
const COMMAND_ID = 'command.kandavu.addStatus';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('"kandavu" extension is now active!');

	context.subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, () => {
		const n = 50
		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
    }));
     
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = 'kandavu';
    statusBarItem.command = COMMAND_ID;
    statusBarItem.show();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand(EXTENSION_ID, () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Kandavu');
    });

    context.subscriptions.push(disposable);
}