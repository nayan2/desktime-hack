import * as vscode from 'vscode';
import { appConstants } from '../Constants/AppConstants';

export class AppConfiguration {
    private static configuration: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(appConstants.project.details.name);

    static get randomTextGeneratorAPI(): string {
        return this.configuration.get<string>("keyboard.text.randomGeneratorAPI") || 'http://api.seazon.org/1-1-1-1-1-0/0-0-1/2-9-45-85-3-4/api.txt';
    }

    static get keyStrokeDelay(): number {
        return this.configuration.get<number>("keyboard.keyStrokeDelay") || 0;
    }

    static get mouseActive(): boolean {
        return this.configuration.get<boolean>("mouse.active") || false;
    }

    static get mouseMovementDelay(): number {
        return this.configuration.get<number>("mouse.movementDelay") || 0; 
    }

    static get mouseMovement(): number {
        return this.configuration.get<number>("mouse.movement") || 1;
    }
    
    static get switchBetweenRandomAndAllExisting(): boolean {
        return this.configuration.get<boolean>("files.switchBetweenRandomAndAllExisting") || false;
    }

    static get traverseOnlyRandomFiles(): boolean {
        return this.configuration.get<boolean>("files.onlyRandom") || true;
    }

    static get traverseOnlyExisting(): boolean {
        return this.configuration.get<boolean>("files.onlyExisting") || false;
    }

    static get traverseDelay(): number {
        return this.configuration.get<number>("files.traverseDelay") || 1;
    }

    static get filterFileTypes(): string[] {
        return this.configuration.get<Array<string>>("files.filter.fileTypes") || ["html"];
    }

    static get excludeFolders(): string[] {
        return this.configuration.get<Array<string>>("files.filter.excludeFolders") || ["node_modules"];
    }
}