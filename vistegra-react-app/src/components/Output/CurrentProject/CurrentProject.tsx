import { FC } from "react";
import { useSelector } from "react-redux";
import { dataSelectors } from "../../../store/data/data.selectors";
import { shippingCartActions } from "../../../store/shipping-cart/shipping-cart.slice";
import { useAppDispatch } from "../../../store/store.hooks";

export const CurrentProject:FC = () => {
    const dispatch = useAppDispatch();
    const blueprintData = useSelector(dataSelectors.selectProjectBlueprintParams);
    const paymentCost = (quantity: number, cost: number) => {
        return quantity * cost;
    }

    const SetProject = () => {
        dispatch(shippingCartActions.setProject(blueprintData));
    }

    return (
        <section className="project__container">
            <div className="project__element grid">
                { blueprintData.materials.map( material => (
                    <div>
                        <div>
                            {material.material.name}
                        </div>
                        <div>
                            {material.material.unit}
                        </div>
                        <div>
                            {material.materialQuantity}
                        </div>
                        <div>
                            {paymentCost(material.materialQuantity, material.material.price as number)}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => SetProject()}>Создать проект</button>
            </div>
        </section>
    );
}