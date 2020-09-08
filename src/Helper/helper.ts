import * as fs from 'fs';
import * as vscode from 'vscode';

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
	
	static createTimeStamp = (): string => {
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

	static openAFileInVSCode = (filePath: string) : void => {
		const document: any = vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
		vscode.window.showTextDocument(document);
	};
}