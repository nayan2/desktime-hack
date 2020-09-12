import axios from 'axios';
import { Helper } from '../Helper/helper';

export class LoremIpsumService {

    getRandomText = (): Promise<any> => {
        return axios.get(Helper.inspectTextGeneatorAPI().baseApi);
    };
}