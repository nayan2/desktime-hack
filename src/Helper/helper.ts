import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { isHiddenSync } from 'hidefile';
import { join, extname } from 'path';
import { workspace, window, Uri } from 'vscode';
import { AppConfiguration } from '../configuration/appConfiguration';

export class Helper {

	static sleep = (ms: number): Promise<any> => {
		return new Promise((resolve) => {
		  setTimeout(resolve, ms);
		});
	};

	static removeLines = (data: string, ...lines: number[]): string => {
		return data.split("\n").filter((_, index) => lines.indexOf(index) === -1).join("\n");
	};
	
	static removeLastLine = (data: string): string => {
		return data.split("\n").slice(1).join("\n");
	};
	
	static removeFirstLine = (data: string): string => {
		return data.split("\n").splice(0, 1).join("\n");
	};
	
	static currentTimeStamp = (): string => {
		return new Date().getTime().toLocaleString();
	};
	
	static createAFile = async (filePath: string): Promise<string> => {
		try {
			await fs.writeFileSync(filePath, "");
			return filePath;
		} catch(err) {
			throw(err);
		}
	};

	static openInEditor = (filePath: string) : void => {
		const document: any = workspace.openTextDocument(Uri.file(filePath));
		window.showTextDocument(document);
	};

	static getallFiles = (directoryPath: string, arrayOfFiles: string[] = [], filterFileTypes: string[] = []): string[] => {
		const rootFiles: string[] = fs.readdirSync(directoryPath);

		rootFiles.filter(x => !(AppConfiguration.excludeFolders.includes(x.indexOf(Helper.currentWorkSpacePath) === -1 ? x : x.substring(x.indexOf(Helper.currentWorkSpacePath) + 2)) || isHiddenSync(join(directoryPath, '/', x)))).forEach((file: string) => {
			if(fs.statSync(join(directoryPath, '/', file)).isDirectory()) {
				arrayOfFiles = Helper.getallFiles(join(directoryPath, '/', file), arrayOfFiles, filterFileTypes);
			} else if (extname(join(directoryPath, '/', file)) !== '.map' && (filterFileTypes.length <= 0 || (filterFileTypes.length > 0 && filterFileTypes.map(x => x.replace('.', '')).includes(extname(join(directoryPath, '/', file)).replace('.', ''), 0)))) {
				arrayOfFiles.push(join(directoryPath, '/', file));
			}
		});

		return arrayOfFiles;
	};

	static inspectTextGeneatorAPIResult = (): { containObjectResult: boolean, baseApi: string } => {
		const result: boolean = AppConfiguration.randomTextGeneratorAPI.lastIndexOf('@') !== -1;
		return {
			containObjectResult: result,
			baseApi: result ? AppConfiguration.randomTextGeneratorAPI.substr(0, AppConfiguration.randomTextGeneratorAPI.lastIndexOf('@')) : AppConfiguration.randomTextGeneratorAPI
		};
	};

	static extractPropFromObject = (data: { [key: string]: any }, dotnotation: string = '', currentSelector: string = '', currentSelectorIndex: number = 0): any | string => {
		if(!dotnotation) {
			const dotN: string = AppConfiguration.randomTextGeneratorAPI.substring(AppConfiguration.randomTextGeneratorAPI.lastIndexOf('@') + 1);
			return Helper.extractPropFromObject(data, dotN, dotN.split('.')[0]);
		} else {
			if(dotnotation.split('.').length === currentSelectorIndex + 1) return data[currentSelector];
			else return Helper.extractPropFromObject(data[currentSelector], dotnotation, dotnotation.split('.')[currentSelectorIndex++], currentSelectorIndex++);
		}
	};

	static get currentWorkSpacePath(): string {
		return workspace.workspaceFolders ? fileURLToPath(workspace.workspaceFolders[0].uri.toString()): "";
	};
}