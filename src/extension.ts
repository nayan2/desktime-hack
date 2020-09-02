import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
//import * as robotjs from 'robotjs';
import { LoremIpsumService } from './Services/loremIpsumService';
import { sleep, removeFirstLine } from './Helper/helper';

export async function activate(context: vscode.ExtensionContext) {

	let isProcessActive: boolean = false;
	//robotjs.setKeyboardDelay(1000);
	const currentPath:string = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.toString(): '';

	let active = vscode.commands.registerCommand('desktime-hack.startDHack', async () => {
		if (!currentPath) return vscode.window.showErrorMessage("No Workspace Is Current Active");

		isProcessActive = true;
		while(isProcessActive) {
			const time: string = new Date().getTime().toLocaleString();
			const filePath: string = path.join(url.fileURLToPath(currentPath), `${ time }.ts`);
			await fs.writeFileSync(filePath, "");

			const document: any = vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
			vscode.window.showTextDocument(document);
			let doContinue: boolean = true;

			setTimeout(() => { doContinue = false; }, 1000 * 60 * 60);

			while(doContinue && isProcessActive) {
				let fileData: any | string = await new LoremIpsumService().getRandomText();
				fileData = fileData.data;
				
				while(fileData.length >= 1) {
					// robotjs.typeString(fileData.split("\n").shift());
					await sleep(3000);
					fileData = removeFirstLine(fileData);
				}

				fs.writeFileSync(filePath, "");
			}

			// Close the editor
			vscode.commands.executeCommand('workbench.action.closeActiveEditor');

			// Delete file
			vscode.workspace.fs.delete(vscode.Uri.file(filePath));
		}
	});

	let deactive = vscode.commands.registerCommand('desktime-hack.stopDHack', () => {
		if (!currentPath) return vscode.window.showErrorMessage("No Workspace Is Current Active");
		else if (!isProcessActive) return vscode.window.showErrorMessage("Desktime hack is not active");
		else isProcessActive = false;
	});

	// vscode.workspace.onDidCloseTextDocument(document => {
	// 	console.log(document);
	// });

	// vscode.workspace.onDidChangeTextDocument(change => {
	// 	console.log(change.document);
	// });

	vscode.window.onDidChangeVisibleTextEditors(test => {
		if(test.length <= 0) vscode.commands.executeCommand('desktime-hack.stopDHack');
	});

	context.subscriptions.push(active, deactive);
}

// this method is called when your extension is deactivated
export function deactivate() {}
