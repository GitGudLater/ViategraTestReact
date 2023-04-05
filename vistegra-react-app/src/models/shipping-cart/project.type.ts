import { Cell } from "../data/cell-axis-length.type";
import { ProjectMaterials } from "./project-materials.type";

export interface Project {
    id: string;
    field: number;
    price: number;
    cell: Cell;
    list: ProjectMaterials;
    fix: ProjectMaterials;
    pipe: ProjectMaterials;
}