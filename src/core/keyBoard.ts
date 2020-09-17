import * as robot from 'robotjs';

export class KeyBoard {
    static typeString = (string: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                robot.typeString(string);
                resolve(true);  
            }, 3000);
        });
    };
}