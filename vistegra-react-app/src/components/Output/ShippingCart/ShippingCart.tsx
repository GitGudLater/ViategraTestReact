import { produceWithPatches } from "immer";
import { FC } from "react";
import { useSelector } from "react-redux";
import { shippingCartEntitySelectors } from "../../../store/shipping-cart/shipping-cart.selectors";
import { shippingCartActions } from "../../../store/shipping-cart/shipping-cart.slice";
import { useAppDispatch } from "../../../store/store.hooks";

export const ShippingCart:FC = () => {
    const dispatch = useAppDispatch();
    const shippingCart = useSelector(shippingCartEntitySelectors.selectAll);

    const deleteProject = (id: string) => {
        dispatch(shippingCartActions.removeProject(id));
    }

    const deleteCart = () => {
        dispatch(shippingCartActions.removeShippingCart());
    }
    return (
        <section className="shippingCart__container">
            <div className="shippingCart__element table">
                {shippingCart.map((project, key) => (
                    <div key={key}>
                        <div>
                            {project.id}
                        </div>
                        <div>
                            <button onClick={() => deleteProject(project.id)}>удалить проект</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => deleteCart()}>Очистить корзину</button>
            </div>
        </section>
    );
}