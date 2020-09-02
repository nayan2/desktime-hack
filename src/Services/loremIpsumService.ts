import axios from 'axios';

export class LoremIpsumService {

    getRandomText = (): Promise<any> => {
        return axios.get('http://api.seazon.org/1-1-1-1-1-0/0-0-1/2-9-45-85-3-4/api.txt');
    };
}