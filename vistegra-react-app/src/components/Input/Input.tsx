import { FC } from "react";
import './Input.scss';

export const Input:FC = () => {
    return (
        <section className="input__container">
            <div className="input__element material">
                <input type="radio" name='material'/>
                <input type="radio" name='material'/>
            </div>
            <div className="input__element length">
                <input type="number" min={1} max={10} step={0.5}/>
            </div>
            <div className="input__element width">
                <input type="number" min={1} max={10} step={0.5}/>
            </div>
            <div className="input__element frame">
                <input type="radio" name='frame'/>
                <input type="radio" name='frame'/>
                <input type="radio" name='frame'/>
            </div>
        </section>
    );
}