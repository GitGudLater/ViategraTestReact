import axios from 'axios'
import { Config } from '../models/config/config.type';
import { Data } from '../models/data/data.type';

const configUrl = '../assets/config.json';
const dataUrl = '../assets/data.json';

export const getData = async (): Promise<Data[]> => {
    let materials: Data[] = [];
    await axios.get(dataUrl).then(resp => materials = resp.data);
    console.log(materials);
    return materials;
} 

export const getConfigs = async (): Promise<Config[]> => {
    let configs: Config[] = [];
    await axios.get(configUrl).then(resp => configs = resp.data);
    return configs;
}
