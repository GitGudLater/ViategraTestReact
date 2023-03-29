import { Cell } from "../models/data/cell-axis-length.type";
import { Data } from "../models/data/data.type";


const setListCount = (length:number, width: number, list: Data): number => {
    const lengthCount = Math.ceil(length/1);
    const widthCount = Math.ceil(width/ (list.width as number))
    return lengthCount * widthCount;
}

const setFrameField = (length:number, width: number): number => {
    return length * width;
}

const setFixCount = ( fixPerUnit: number, frameField: number): number => {
    return fixPerUnit * Math.floor(frameField)/* целая часть */ + Math.floor(fixPerUnit * (frameField - Math.floor(frameField))) /* дробная часть */;
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
    return xAxisPipesCount * freeXAxisWidth + yAxisPipesCount * length; // расчёт результата в метрах
};

const setCellAxisLength = (frame: number, length:number, width: number, pipe: Data): Cell => {
    const pipeWidth = (pipe.width as number) / 1000; // привдение к метрам
    const yAxisPipesCount = setAxisPipesCount(frame, width, pipeWidth); // количество осей труб располагающихся по оси у и занимающих всю длинну изделия
    const freeXAxisWidth = setFreeAxisWidth(width, pipeWidth, yAxisPipesCount); // свободная ширина
    const xAxisPipesCount = setAxisPipesCount(frame, length, pipeWidth); // количество осей труб располагающихся по оси х
    return {xAxisLength:freeXAxisWidth/yAxisPipesCount, yAxisLength: (length - pipeWidth*xAxisPipesCount)/xAxisPipesCount}; // расчёт результата в метрах
}

export const bl = {
    setListCount,
    setFrameField,
    setFixCount,
    setPipeLength,
    setCellAxisLength
}