import { FC } from "react";
import { CurrentProject } from "./CurrentProject/CurrentProject";
import './Output.scss';
import { ShippingCart } from "./ShippingCart/ShippingCart";

export const Output:FC = () => {
    return (
        <section className="output__container">
            <div className="output__element table">
                <CurrentProject/>
            </div>
            <div>
                <ShippingCart/>
            </div>
        </section>
    );
}