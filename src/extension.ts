/**
 * - Add a status bar called K or kandavu to VS Code
 * - Clicking on the status bar should check for a login authorizationCode
 * - Maybe we need personal access tokens that can be generated and saved with account (for now we can use authorizationKey)
 * 
 */
import * as vscode from 'vscode';

import axios from 'axios';

let statusBarItem: vscode.StatusBarItem;

const EXTENSION_ID = "extension.kandavu";
const COMMAND_ID = 'command.kandavu.addStatus';

export function activate(context: vscode.ExtensionContext) {
    console.log('"kandavu" extension is now active!');

	context.subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, async () => {
		const n = 50;
        // vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
        
        const result = await vscode.window.showInputBox({
            value: '',
            placeHolder: 'Enter your kandavu status here'
        });

        vscode.window.showInformationMessage(`Added: ${result} to your kandavu status`);

        const config = vscode.workspace.getConfiguration();

        console.dir(config)

        const kandavuHost = config.get("kandavu.host");
        const authorizationKey = config.get("kandavu.authorizationKey");

        vscode.window.showInformationMessage(`kandavuHost: ${kandavuHost}`);
        vscode.window.showInformationMessage(`kandavu.authorizationKey: ${authorizationKey}`);
        if(kandavuHost && authorizationKey) {
            vscode.window.showErrorMessage(`Host and authorization key need to be added to settings`);
            return;
        }
        // if !kandavuHost || !authorizationKey then error!!!
        const data = await axios.post(`${kandavuHost}/statuses`, {
            description: result
        }, {
            headers: {
                'Authorization': authorizationKey
            }
        });

        console.dir(data);
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

/**
 * No cleanup necessary
 */
export function deactivate(context: vscode.ExtensionContext) {
    return undefined
}