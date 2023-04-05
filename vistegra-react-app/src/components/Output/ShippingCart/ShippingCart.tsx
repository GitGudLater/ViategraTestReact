import { FC } from "react";
import { useSelector } from "react-redux";
import { shippingCartEntitySelectors } from "../../../store/shipping-cart/shipping-cart.selectors";
import { shippingCartActions } from "../../../store/shipping-cart/shipping-cart.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import './ShippingCart.scss';

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
        <section className="shipping-cart__container">
            <div className="shipping-cart__table">
                {shippingCart.map((project, key) => (
                    <div key={key} className="shipping-cart__table__bill">
                        <div>
                            проект №{project.id}
                        </div>
                        <div>
                            стоимость {project.price} руб
                        </div>
                        <div>
                            <button className="delete" onClick={() => deleteProject(project.id)}>удалить проект</button>
                        </div>
                    </div>
                ))}
            </div>
            {shippingCart.length > 0 ? 
                <div className="shipping-cart__reset">
                    <button className="delete" onClick={() => deleteCart()}>Очистить корзину</button>
                </div>:
                <div className="shipping-cart__empty">
                    Корзина пуста
                </div>
            }
        </section>
    );
}