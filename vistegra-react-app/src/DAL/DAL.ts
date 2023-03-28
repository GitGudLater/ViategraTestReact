import axios from 'axios'
import { Fix } from '../models/config/fix.type';
import { Frame } from '../models/config/frame.type';
import { Material } from '../models/config/materials.type';
import { Size } from '../models/config/size.type';

const configUrl = '../assets/config.json';
const dataUrl = '../assets/data.json';

export const getMaterials = async (): Promise<Material[]> => {
    let configs: Material[] = [];
    await axios.get(configUrl).then(resp => resp.data.forEach((config:any) => {if(config.type === "material"){configs.push(config as Material)}}));
    return configs;
}

export const getFix = async (): Promise<Fix[]> => {
    let configs: Fix[] = [];
    await axios.get(configUrl).then(resp => resp.data.forEach((config:any) => {if(config.type === "fix"){configs.push(config as Fix)}}));
    return configs;
}

export const getFrame = async (): Promise<Frame[]> => {
    let configs: Frame[] = [];
    await axios.get(configUrl).then(resp => resp.data.forEach((config:any) => {if(config.type === "frame"){configs.push(config as Frame)}}));
    return configs;
}

export const getSize = async (): Promise<Size[]> => {
    let configs: Size[] = [];
    await axios.get(configUrl).then(resp => resp.data.forEach((config:any) => {if(config.type === "size"){configs.push(config as Size)}}));
    return configs;
}
