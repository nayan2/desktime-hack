import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { LoremIpsumService } from './Services/loremIpsumService';
import { Helper } from './Helper/helper';
import { AppConfiguration } from './configuration/appConfiguration';
import { keyboard, Key, mouse, left, right, up, down, screen } from '@nut-tree/nut-js';
import { appMessages } from './Constants/MessageConstants';

export async function activate(context: vscode.ExtensionContext) {

	/*
		* Global variable declaration
	*/
	let isProcessActive: boolean = true;

	let active = vscode.commands.registerCommand('desktime-hack.startDHack', async () => {

		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);

		while(isProcessActive) {
			const filePath: string = await Helper.createAFile(path.join(url.fileURLToPath(Helper.currentWorkSpacePath), `${ Helper.currentTimeStamp() }.ts`));

			Helper.openInEditor(filePath);

			while(isProcessActive) {
				// let fileData: any | string = await new LoremIpsumService().getRandomText();
				// fileData = fileData.data;
				
				// while(fileData.length >= 1) {
				// 	let firstLine: string = fileData.split("\n").shift();
				// 	//fs.writeFileSync(filePath, firstLine);
				// 	await keyboard.type(firstLine);
				// 	fileData = Helper.removeFirstLine(fileData);
				// 	await Helper.sleep(2000);
				// 	fs.writeFileSync(filePath, "");
				// 	await Helper.sleep(3000);
				// }
			}

			// Close the editor
			vscode.commands.executeCommand('workbench.action.closeActiveEditor');

			// Delete file
			vscode.workspace.fs.delete(vscode.Uri.file(filePath));
		}
	});

	let deactive = vscode.commands.registerCommand('desktime-hack.stopDHack', () => {
		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);
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
