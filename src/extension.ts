import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { LoremIpsumService } from './Services/loremIpsumService';
import { Helper } from './Helper/helper';
import { keyboard, Key, mouse, left, right, up, down, screen } from '@nut-tree/nut-js';
import { appMessages } from './Constants/MessageConstants';

export async function activate(context: vscode.ExtensionContext) {

	let isProcessActive: boolean = true;
	const currentPath:string = vscode.workspace.workspaceFolders ? 
							   vscode.workspace.workspaceFolders[0].uri.toString(): 
							   "";

	let active = vscode.commands.registerCommand('desktime-hack.startDHack', async () => {
		if (!currentPath) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);

		while(isProcessActive) {
			const time: string = Helper.createTimeStamp();
			const filePath: string = await Helper.createAFile(path.join(url.fileURLToPath(currentPath), `${ time }.ts`));

			Helper.openAFileInVSCode(filePath);
			let doContinue: boolean = true;

			setTimeout(() => { doContinue = false; }, 1000 * 60 * 60);

			while(doContinue && isProcessActive) {
				let fileData: any | string = await new LoremIpsumService().getRandomText();
				fileData = fileData.data;
				
				while(fileData.length >= 1) {
					let firstLine: string = fileData.split("\n").shift();
					//fs.writeFileSync(filePath, firstLine);
					await keyboard.type(firstLine);
					fileData = Helper.removeFirstLine(fileData);
					await Helper.sleep(2000);
					fs.writeFileSync(filePath, "");
					await Helper.sleep(3000);
				}
			}

			// Close the editor
			vscode.commands.executeCommand('workbench.action.closeActiveEditor');

			// Delete file
			vscode.workspace.fs.delete(vscode.Uri.file(filePath));
		}
	});

	let deactive = vscode.commands.registerCommand('desktime-hack.stopDHack', () => {
		if (!currentPath) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);
		else if (!isProcessActive) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);
		else isProcessActive = false;
	});

	vscode.window.onDidChangeVisibleTextEditors(test => {
		if(test.length <= 0) vscode.commands.executeCommand('desktime-hack.stopDHack');
	});

	context.subscriptions.push(active, deactive);
}

// this method is called when your extension is deactivated
export async function deactivate() {}
