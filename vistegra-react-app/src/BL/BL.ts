import { Cell } from "../models/data/cell-axis-length.type";
import { Data } from "../models/data/data.type";
import { ProjectMaterials } from "../models/shipping-cart/project-materials.type";


const setListCount = (length:number, width: number, list: Data): number => {
    const lengthCount = Math.ceil(length/1);
    const widthCount = Math.ceil(width/ (list.width as number))
    return lengthCount * widthCount;
}

const setMaterialPrice = (material: ProjectMaterials): number =>  {
    return Math.trunc(material.materialQuantity * (material.material.price as number) * 100)/100;
}

const setFrameField = (length:number, width: number): number => {
    return Math.trunc(length * width * 100)/100;
}

const setFixCount = ( fixPerUnit: number, frameField: number): number => {
    return Math.trunc((fixPerUnit * Math.floor(frameField)/* целая часть */ + Math.floor(fixPerUnit * (frameField - Math.floor(frameField))))*10)/10;
}

const setAxisPipesCount = (frame: number, size: number, pipeWidth: number): number => {
    return Math.ceil((size - Math.floor(size/frame) * pipeWidth) / frame);
}

const setFreeAxisWidth = (xAxisSize: number, pipeWidth: number, yAxisPipesCount: number): number => {
    return xAxisSize - pipeWidth * yAxisPipesCount;
}

const setPipeLength = (frame: number, length:number, width: number, pipe: Data): number => {
    const pipeWidth = (pipe.width as number) / 1000; // привдение к метрам
    const yAxisPipesCount = setAxisPipesCount(frame, width, pipeWidth); // количество осей труб располагающихся по оси у и занимающих всю длинну изделия
    const freeXAxisWidth = setFreeAxisWidth(width, pipeWidth, yAxisPipesCount); // свободная ширина
    const xAxisPipesCount = setAxisPipesCount(frame, length, pipeWidth); // количество осей труб располагающихся по оси х
    return Math.trunc((xAxisPipesCount * freeXAxisWidth + yAxisPipesCount * length)*10)/10; // расчёт результата в метрах
};

const setCellAxisLength = (frame: number, length:number, width: number, pipe: Data): Cell => {
    const pipeWidth = (pipe.width as number) / 1000; // привдение к метрам
    const yAxisPipesCount = setAxisPipesCount(frame, width, pipeWidth); // количество осей труб располагающихся по оси у и занимающих всю длинну изделия
    const freeXAxisWidth = setFreeAxisWidth(width, pipeWidth, yAxisPipesCount); // свободная ширина
    const xAxisPipesCount = setAxisPipesCount(frame, length, pipeWidth); // количество осей труб располагающихся по оси х
    const xAxisLength = Math.trunc(freeXAxisWidth*100/yAxisPipesCount)/100;
    const yAxisLength = Math.trunc((length - pipeWidth*xAxisPipesCount)*100/xAxisPipesCount)/100;
    return {xAxisLength, yAxisLength}; // расчёт результата в метрах
}

export const bl = {
    setListCount,
    setFrameField,
    setFixCount,
    setPipeLength,
    setCellAxisLength,
    setMaterialPrice
}