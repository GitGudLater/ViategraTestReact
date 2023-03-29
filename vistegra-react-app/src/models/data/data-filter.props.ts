import { Data } from "./data.type";

export interface DataFilterProps {
    length: number;
    width: number;
    material: string;
    frame: number;
    selectedList: Data;
    fixPerUnit: number;
    pipe: Data;
}