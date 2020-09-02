import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { LoremIpsumService } from './Services/loremIpsumService';
import { sleep, removeLastLine } from './Helper/helper';

let hActive: boolean = false;
export async function activate(context: vscode.ExtensionContext) {

	const currentPath:string = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.toString(): '';

	let active = vscode.commands.registerCommand('desktime-hack.startDHack', async () => {
		if (!currentPath) return vscode.window.showErrorMessage("No Workspace Is Current Active");

		hActive = true;
		while(hActive) {
			const time: string = new Date().getTime().toLocaleString();
			const filePath: string = path.join(url.fileURLToPath(currentPath), `${ time }.ts`);
			await fs.writeFileSync(filePath, "");

			const document: any = vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
			vscode.window.showTextDocument(document);
			let doContinue: boolean = true;

			setTimeout(() => { doContinue = false; }, 1000 * 60 * 60);

			while(doContinue && hActive) {
				let fileData: any | string = await new LoremIpsumService().getRandomText();
				fileData = fileData.data;
				await fs.writeFileSync(filePath, fileData);
				await sleep(3000);
	
				while(fileData.length >= 1) {
					fileData = removeLastLine(fileData);
					await fs.writeFileSync(filePath, fileData);
					await sleep(3000);
				}
			}

			// Close the editor
			vscode.commands.executeCommand('workbench.action.closeActiveEditor');

			// Delete file
			vscode.workspace.fs.delete(vscode.Uri.file(filePath));
		}
	});

	let deactive = vscode.commands.registerCommand('desktime-hack.stopDHack', () => {
		if (!currentPath) return vscode.window.showErrorMessage("No Workspace Is Current Active");
		else if (!hActive) return vscode.window.showErrorMessage("Desktime hack is not active");
		else hActive = false;
	});

	// vscode.workspace.onDidCloseTextDocument(document => {
	// 	console.log(document);
	// });

	vscode.window.onDidChangeVisibleTextEditors(test => {
		if(test.length <= 0) vscode.commands.executeCommand('desktime-hack.stopDHack');
	});

	context.subscriptions.push(active, deactive);
}

// this method is called when your extension is deactivated
export function deactivate() {}
