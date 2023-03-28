import { FC, useEffect, useState } from "react";
import { getFrame, getMaterials, getSize } from "../../DAL/DAL";
import { Frame } from "../../models/config/frame.type";
import { Material } from "../../models/config/materials.type";
import { Size } from "../../models/config/size.type";
import './Input.scss';

export const Input:FC = () => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [frame, setFrames] = useState<Frame[]>([]);
    const [size, setSize] = useState<Size[]>([]);

    useEffect(() => {getMaterials().then(materials => setMaterials(materials))},[setMaterials])
    useEffect(() => {getFrame().then(frames => setFrames(frames))},[setFrames])
    useEffect(() => {getSize().then(sizes => setSize(sizes))}, [setSize])

    return (
        <section className="input__container">
            <div className="input__element material">
                { materials.map( (config,index) => (
                    <div key={index}>
                        <input type="radio" name='material' value={config.key}/>
                        {config.name}
                    </div>
                ))}
            </div>
            <div className="input__element size">
                { size.map( (config, index) => (
                    <div key={index}>
                        <input type="number" min={config.min} max={config.max} step={config.step}/>
                        {config.name}
                    </div>
                ))}
            </div>
            <div className="input__element frame">
                { frame.map( (config, index) => (
                    <div key={index}>
                        <input type="radio" name='frame' value={config.key}/>
                        {config.name}
                    </div>
                ))}
            </div>
        </section>
    );
}