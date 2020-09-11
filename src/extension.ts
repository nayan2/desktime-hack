import * as vscode from 'vscode';
import * as path from 'path';
import * as url from 'url';
import * as nut from '@nut-tree/nut-js';
import { Helper } from './Helper/helper';
import { LoremIpsumService } from './Services/loremIpsumService';
import { AppConfiguration } from './configuration/appConfiguration';
import { appMessages } from './Constants/AppConstants';

export async function activate(context: vscode.ExtensionContext) {

	// what kind of problem you are solving
	// why you have choosen this way

	/*
		* Global variable declaration
	*/
	let isProcessActive: boolean = true;
	let workspaceFiles: string[] = Helper.getallFiles(Helper.currentWorkSpacePath, [], AppConfiguration.filterFileTypes);

	let active = vscode.commands.registerCommand('desktime-hack.startDHack', async () => {

		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);

		let actWindow = await nut.getActiveWindow();
		console.log(actWindow.title);

		// while(isProcessActive) {
			
		// 	/*
		// 		* Takeing initiative for mouse activity
		// 	*/
		// 	if(AppConfiguration.mouseActive) {
				
		// 	}

		// 	/*
		// 		* 
		// 	*/
		// 	if(AppConfiguration.switchBetweenRandomAndAllExisting) {
				
		// 		let istraverseActive: boolean = true;

		// 		setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);

		// 		const createdFilePath: string = await Helper.createAFile(path.join(url.fileURLToPath(Helper.currentWorkSpacePath), `${ Helper.currentTimeStamp() }.${ AppConfiguration.filterFileTypes[0] }`));
		// 		Helper.openInEditor(createdFilePath);

		// 		while(istraverseActive) {
		// 			let randonText: any | string = await new LoremIpsumService().getRandomText();
		// 			randonText = Helper.inspectTextGeneatorAPIResult().containObjectResult ? Helper.extractPropFromObject(randonText.data) : randonText.data;
		// 			await nut.keyboard.type(randonText);
		// 		}

		// 		// Close the editor
		// 		vscode.commands.executeCommand('workbench.action.closeActiveEditor');

		// 		// Delete file
		// 		vscode.workspace.fs.delete(vscode.Uri.file(createdFilePath));

		// 		while(istraverseActive) {
		// 			Helper.openInEditor(workspaceFiles[Math.ceil((workspaceFiles.length * Math.random()) / 1)]);
		// 			let randonText: any | string = await new LoremIpsumService().getRandomText();
		// 			randonText = Helper.inspectTextGeneatorAPIResult().containObjectResult ? Helper.extractPropFromObject(randonText.data) : randonText.data;
		// 			await nut.keyboard.type(randonText);
		// 		}

		// 		// Close the editor
		// 		vscode.commands.executeCommand('workbench.action.closeActiveEditor');
		// 	} else if(AppConfiguration.traverseOnlyRandomFiles) {

		// 		let istraverseActive: boolean = true;

		// 		setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);

		// 		const createdFilePath: string = await Helper.createAFile(path.join(url.fileURLToPath(Helper.currentWorkSpacePath), `${ Helper.currentTimeStamp() }.${ AppConfiguration.filterFileTypes[0] }`));
		// 		Helper.openInEditor(createdFilePath);

		// 		while(istraverseActive) {
		// 			let randonText: any | string = await new LoremIpsumService().getRandomText();
		// 			randonText = Helper.inspectTextGeneatorAPIResult().containObjectResult ? Helper.extractPropFromObject(randonText.data) : randonText.data;
		// 			await nut.keyboard.type(randonText);
		// 		}

		// 		// Close the editor
		// 		vscode.commands.executeCommand('workbench.action.closeActiveEditor');

		// 		// Delete file
		// 		vscode.workspace.fs.delete(vscode.Uri.file(createdFilePath));
		// 	} else if(AppConfiguration.traverseOnlyExisting) {
		// 		let istraverseActive: boolean = true;

		// 		setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);

		// 		workspaceFiles.forEach(async x => {
		// 			while(istraverseActive) {
		// 				Helper.openInEditor(x);
		// 				let randonText: any | string = await new LoremIpsumService().getRandomText();
		// 				randonText = Helper.inspectTextGeneatorAPIResult().containObjectResult ? Helper.extractPropFromObject(randonText.data) : randonText.data;
		// 				await nut.keyboard.type(randonText);
		// 			}

		// 			// Close the editor
		// 			vscode.commands.executeCommand('workbench.action.closeActiveEditor');
		// 		});
		// 	}
		// }
	});

	let deactive = vscode.commands.registerCommand('desktime-hack.stopDHack', () => {
		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);
		else if (!isProcessActive) return vscode.window.showErrorMessage(appMessages.inActiveWorkSpace);
		else isProcessActive = false;
	});

	vscode.window.onDidChangeVisibleTextEditors(editors => {
		if(editors.length <= 0) vscode.commands.executeCommand('desktime-hack.stopDHack');
	});

	context.subscriptions.push(active, deactive);
}

// this method is called when your extension is deactivated
export async function deactivate() {}
