import * as vscode from 'vscode';
import * as path from 'path';
import * as robot from 'robotjs';
import { Mouse } from './core/mouse';
import { Helper } from './Helper/helper';
import { KeyBoard } from './core/keyBoard';
import { appConstants } from './Constants/AppConstants';
import { LoremIpsumService } from './Services/loremIpsumService';
import { AppConfiguration } from './configuration/appConfiguration';

export async function activate(context: vscode.ExtensionContext) {

	// what kind of problem you are solving
	// why you have choosen this way

	/*
		* Global variable declaration
		* variable declared to detect the state between strat and end of the activity
	*/
	let isProcessActive: boolean = false;

	let active = vscode.commands.registerCommand('robot-activity.start', async () => {
		/*
			* First line of defance
		*/
		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appConstants.message.inActiveWorkSpace);

		/*
			* Local scope variable
			* @param workspaceFiles -> is used to collected all valid files, all user provided filters applied
			* @param isProcessActive -> make active command activate the whole process
		*/
		isProcessActive = true;
		let workspaceFiles: string[] = Helper.getAllFiles(Helper.currentWorkSpacePath, [], AppConfiguration.filterFileTypes);
		await vscode.workspace.getConfiguration().update("explorer.confirmDelete", false, vscode.ConfigurationTarget.Global);
		await vscode.workspace.getConfiguration().update("files.hotExit", "off", vscode.ConfigurationTarget.Global);

		/*
			* Configuration setup
			* Make user provided mouse and keyboard delay activate
		*/
		robot.setKeyboardDelay(AppConfiguration.keyStrokeDelay * 6000);
		robot.setMouseDelay(AppConfiguration.mouseMovementDelay * 6000);

		/*
			* Check for all three available combinations
			* i) Traverse all available files in current workspace including random files
			* ii) Traverse all avaialble files in current work space
			* iii) create and traverse only random files
			* Mouse activity also added in three conditions as we cant perform mouse activity separtaely continuously
		*/
		if(AppConfiguration.switchBetweenRandomAndAllExisting) {
			while(isProcessActive) {
				let istraverseActive: boolean = true;

				setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);
	
				const createdFilePath: string = await Helper.createAFile(path.join(Helper.currentWorkSpacePath, `${ Helper.currentTimeStamp() }.${ AppConfiguration.filterFileTypes[0] }`));
				Helper.openInEditor(createdFilePath);
	
				while(istraverseActive && isProcessActive) {
					let randonText: any | string = await new LoremIpsumService().getRandomText();
					randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
					let arrarOfRandomText: string[] = (<string>randonText).split('');
					let addOrRemovePosition: number = AppConfiguration.mouseMovement;
					for(let x = 0; x <= arrarOfRandomText.length; x++) {
						if(!(istraverseActive && isProcessActive)) break;
						await KeyBoard.typeString(arrarOfRandomText[x]);
						if(AppConfiguration.mouseActive) {
							await Mouse.playWithMouse(addOrRemovePosition);
							addOrRemovePosition *= -1;
						}
					}
				}
	
				// Close the editor
				vscode.commands.executeCommand('workbench.action.closeActiveEditor');
	
				// Delete file
				vscode.workspace.fs.delete(vscode.Uri.file(createdFilePath));
	
				while(istraverseActive && isProcessActive) {
					Helper.openInEditor(workspaceFiles[Math.ceil((workspaceFiles.length * Math.random()) / 1)]);
					let randonText: any | string = await new LoremIpsumService().getRandomText();
					randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
					let arrarOfRandomText: string[] = (<string>randonText).split('');
					let addOrRemovePosition:number = AppConfiguration.mouseMovement;
					for(let x = 0; x <= arrarOfRandomText.length; x++) {
						if(!(istraverseActive && isProcessActive)) break;
						await KeyBoard.typeString(arrarOfRandomText[x]);
						if(AppConfiguration.mouseActive) {
							await Mouse.playWithMouse(addOrRemovePosition);
							addOrRemovePosition *= -1;
						}
					}
				}
	
				// Close the editor
				vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			}
		} else if(!AppConfiguration.traverseOnlyExisting && AppConfiguration.traverseOnlyRandomFiles) {

			while(isProcessActive) {
				let istraverseActive: boolean = true;

				setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);
	
				const createdFilePath: string = await Helper.createAFile(path.join(Helper.currentWorkSpacePath, `${ Helper.currentTimeStamp() }.${ AppConfiguration.filterFileTypes[0] }`));
				Helper.openInEditor(createdFilePath);
	
				while(istraverseActive && isProcessActive) {
					let randonText: any | string = await new LoremIpsumService().getRandomText();
					randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
					let arrarOfRandomText: string[] = (<string>randonText).split('');
					let addOrRemovePosition:number = AppConfiguration.mouseMovement;
					for(let x = 0; x <= arrarOfRandomText.length; x++) {
						if(!(istraverseActive && isProcessActive)) break;
						await KeyBoard.typeString(arrarOfRandomText[x]);
						if(AppConfiguration.mouseActive) {
							await Mouse.playWithMouse(addOrRemovePosition);
							addOrRemovePosition *= -1;
						}
					}
				}
	
				// Close the editor
				vscode.commands.executeCommand('workbench.action.closeActiveEditor');
	
				// Delete file
				vscode.workspace.fs.delete(vscode.Uri.file(createdFilePath));
			}
		} else if(!AppConfiguration.traverseOnlyRandomFiles && AppConfiguration.traverseOnlyExisting) {

			while(isProcessActive) {
				let istraverseActive: boolean = true;

				setTimeout(() => { istraverseActive = false; }, AppConfiguration.traverseDelay * 60000);
	
				// foreach is not going to work // We have to use breakable loop
				for(let x = 0; x <= workspaceFiles.length; x++) {
					while(istraverseActive && isProcessActive) {
						Helper.openInEditor(workspaceFiles[x]);
						let randonText: any | string = await new LoremIpsumService().getRandomText();
						randonText = Helper.inspectTextGeneatorAPI().containObjectResult ? Helper.getPropertyFromObject(randonText.data) : randonText.data;
						let arrarOfRandomText: string[] = (<string>randonText).split('');
						let addOrRemovePosition:number = AppConfiguration.mouseMovement;
						for(let x = 0; x <= arrarOfRandomText.length; x++) {
							if(!(istraverseActive && isProcessActive)) break;
							await KeyBoard.typeString(arrarOfRandomText[x]);
							if(AppConfiguration.mouseActive) {
								await Mouse.playWithMouse(addOrRemovePosition);
								addOrRemovePosition *= -1;
							}
						}
					}
	
					// Close the editor
					vscode.commands.executeCommand('workbench.action.closeActiveEditor');
				}
			}
		}
	});

	let deactive = vscode.commands.registerCommand('robot-activity.stop', async () => {
		if (!Helper.currentWorkSpacePath) return vscode.window.showErrorMessage(appConstants.message.inActiveWorkSpace);
		else  if (!isProcessActive) return vscode.window.showErrorMessage(appConstants.message.inActiveExtension);
		else {
			await vscode.workspace.getConfiguration().update("explorer.confirmDelete", true, vscode.ConfigurationTarget.Global);
			await vscode.workspace.getConfiguration().update("files.hotExit", "onExit", vscode.ConfigurationTarget.Global);
			isProcessActive = false;
		}
	});

	vscode.window.onDidChangeVisibleTextEditors(editors => {
		if(editors.length <= 0) vscode.commands.executeCommand('robot-activity.stop');
	});

	context.subscriptions.push(active, deactive);
}

// this method is called when your extension is deactivated
export async function deactivate() {}
