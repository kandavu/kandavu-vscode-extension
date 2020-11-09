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
        const result = await vscode.window.showInputBox({
            value: '',
            placeHolder: 'Enter your kandavu status here'
        });

        const config = vscode.workspace.getConfiguration()

        const kandavuHost = config.get("kandavu.host");
        const accessToken = config.get("kandavu.accessToken");

        if(kandavuHost && accessToken) {
            const data = await axios.post(`${kandavuHost}/statuses`, {
                description: result
            }, {
                headers: {
                    'Authorization': accessToken
                }
            })

            vscode.window.showInformationMessage(`Added: ${result} to your kandavu status`)
        } else {
            vscode.window.showErrorMessage(`Host and authorization key need to be added to settings`);
            return;
        }
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