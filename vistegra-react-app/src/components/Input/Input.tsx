import { FC } from "react";
import './Input.scss';

export const Input:FC = () => {
    return (
        <section className="input__container">
            <div className="input__element material">

            </div>
            <div className="input__element length">
                <input type="text" />
            </div>
            <div className="input__element width">
                <input type="text" />
            </div>
            <div className="input__element frame">

            </div>
        </section>
    );
}