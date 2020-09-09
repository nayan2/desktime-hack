import axios from 'axios';
import { AppConfiguration } from '../configuration/appConfiguration';

export class LoremIpsumService {

    getRandomText = (): Promise<any> => {
        return axios.get(AppConfiguration.randomTextGeneratorAPI);
    };
}