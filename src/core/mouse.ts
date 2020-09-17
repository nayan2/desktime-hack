import * as nut from '@nut-tree/libnut';
import * as robot from 'robotjs';

export default class Mouse {
    static playWithMouse = (pixelGap: number): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => { 
                const screenSize = nut.getWindowRect(nut.getActiveWindow());
                const height = (screenSize.height / 2) + pixelGap;
                const width = (screenSize.width / 2) + pixelGap;
                robot.moveMouse(height, width);
                resolve(true);  
            }, 3000);
        });
    };
}