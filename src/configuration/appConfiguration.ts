import * as vscode from 'vscode';
import { projectDeatails } from '../Constants/MessageConstants';

export class AppConfiguration {
    private static configuration: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(projectDeatails.name);

    static get randomTextGeneratorAPI(): string {
        return this.configuration.randomTextGeneratorAPI;
    }

    static get switchBetweenRandomFileGenerationAndTraverseAllFiles(): boolean {
        return this.configuration.switchBetweenRandomFileGenerationAndTraverseAllFiles;
    }

    static get maxTimeToBeInAFile(): number {
        return this.configuration.maxTimeToBeInAFile;
    }

    static get filterFileTypes(): string | null {
        return this.configuration.filterFileTypes;
    }

    static get moveMouse(): boolean {
        return this.configuration.moveMouse;
    }

    static get mouseMovementPixel(): number {
        return this.configuration.mouseMovementPixel;
    }
}