import * as vscode from 'vscode';
import * as path from 'path';
import * as robot from 'robotjs';
import * as nut from '@nut-tree/libnut';
import { Helper } from './Helper/helper';
import { LoremIpsumService } from './Services/loremIpsumService';
import { AppConfiguration } from './configuration/appConfiguration';
import { appConstants } from './Constants/AppConstants';

export async function activate(context: vscode.ExtensionContext) {

	// what kind of problem you are solving
	// why you have choosen this way

	/*
		* Global variable declaration
	*/
	let isProcessActive: boolean = true;
	let workspaceFiles: string[] = Helper.getAllFiles(Helper.currentWorkSpacePath, [], AppConfiguration.filterFileTypes);

	/*
		* Global Configuration setup
	*/
	await robot.setKeyboardDelay(AppConfiguration.keyStrokeDelay * 6000);
	await robot.setMouseDelay(AppConfiguration.mouseMovementDelay * 6000);

	let active = vscode.commands.registerCommand('desktime-hack.startDHack', async () => {

		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appConstants.message.inActiveWorkSpace);

		while(isProcessActive) {
			
			/*
				* Takeing initiative for mouse activity
			*/
			if(AppConfiguration.mouseActive && isProcessActive) {
				const twoPI = Math.PI * 2.0;
				const screenSize = await nut.getWindowRect(nut.getActiveWindow());
				const height = (screenSize.height / 2) - 10;
				const width = screenSize.width;

				for (let x = 0; x < width; x++) {
					robot.moveMouse(x, height * Math.sin((twoPI * x) / width) + height);
				}
			}

			/*
				* 
			*/
			// if(AppConfiguration.switchBetweenRandomAndAllExisting) {
				
			// 	let istraverseActive: boolean = true;

			// 	setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);

			// 	const createdFilePath: string = await Helper.createAFile(path.join(Helper.currentWorkSpacePath, `${ Helper.currentTimeStamp() }.${ AppConfiguration.filterFileTypes[0] }`));
			// 	Helper.openInEditor(createdFilePath);

			// 	while(istraverseActive) {
			// 		let randonText: any | string = await new LoremIpsumService().getRandomText();
			// 		randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
			// 		await robot.typeString(randonText);
			// 	}

			// 	// Close the editor
			// 	vscode.commands.executeCommand('workbench.action.closeActiveEditor');

			// 	// Delete file
			// 	vscode.workspace.fs.delete(vscode.Uri.file(createdFilePath));

			// 	while(istraverseActive) {
			// 		Helper.openInEditor(workspaceFiles[Math.ceil((workspaceFiles.length * Math.random()) / 1)]);
			// 		let randonText: any | string = await new LoremIpsumService().getRandomText();
			// 		randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
			// 		await robot.typeString(randonText);
			// 	}

			// 	// Close the editor
			// 	vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			// } else if(AppConfiguration.traverseOnlyRandomFiles) {

			// 	let istraverseActive: boolean = true;

			// 	setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);

			// 	const createdFilePath: string = await Helper.createAFile(path.join(Helper.currentWorkSpacePath, `${ Helper.currentTimeStamp() }.${ AppConfiguration.filterFileTypes[0] }`));
			// 	Helper.openInEditor(createdFilePath);

			// 	while(istraverseActive) {
			// 		let randonText: any | string = await new LoremIpsumService().getRandomText();
			// 		randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
			// 		await robot.typeString(randonText);
			// 	}

			// 	// Close the editor
			// 	vscode.commands.executeCommand('workbench.action.closeActiveEditor');

			// 	// Delete file
			// 	vscode.workspace.fs.delete(vscode.Uri.file(createdFilePath));
			// } else if(AppConfiguration.traverseOnlyExisting) {
			// 	let istraverseActive: boolean = true;

			// 	setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);

			// 	workspaceFiles.forEach(async x => {
			// 		while(istraverseActive) {
			// 			Helper.openInEditor(x);
			// 			let randonText: any | string = await new LoremIpsumService().getRandomText();
			// 			randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
			// 			await robot.typeString(randonText);
			// 		}

			// 		// Close the editor
			// 		vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			// 	});
			// }
		}
	});

	let deactive = vscode.commands.registerCommand('desktime-hack.stopDHack', () => {
		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appConstants.message.inActiveWorkSpace);
		else if (!isProcessActive) return vscode.window.showErrorMessage(appConstants.message.inActiveWorkSpace);
		else isProcessActive = false;
	});

	vscode.window.onDidChangeVisibleTextEditors(editors => {
		if(editors.length <= 0) vscode.commands.executeCommand('desktime-hack.stopDHack');
	});

	context.subscriptions.push(active, deactive);
}

// this method is called when your extension is deactivated
export async function deactivate() {}
