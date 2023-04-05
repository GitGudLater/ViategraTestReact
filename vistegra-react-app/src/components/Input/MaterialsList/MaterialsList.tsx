import { FC } from "react";
import { useSelector } from "react-redux";
import { Data } from "../../../models/data/data.type";
import { MaterialListProps } from "../../../models/data/material-list.props";
import { dataSelectors } from "../../../store/data/data.selectors";
import { dataActions } from "../../../store/data/data.slice";
import { shippingCartSelectors } from "../../../store/shipping-cart/shipping-cart.selectors";
import { shippingCartActions } from "../../../store/shipping-cart/shipping-cart.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import "./MaterialsList.scss";

export const MaterialsList:FC<MaterialListProps> = (props) => {
    
    const dispatch = useAppDispatch()
    const { materials } = props;
    const filter = useSelector(dataSelectors.selectFilterParams);
    const {material} = useSelector(shippingCartSelectors.selectProjectStatus)

    const setMaterialStatus = (material: Data) => {
        switch (material.type) {
            case 'list':
                dispatch(shippingCartActions.setList());
                break;
            case 'pipe':
                dispatch(shippingCartActions.setPipe());
                break;
            case 'fix':
                dispatch(shippingCartActions.setFix());
                break;
            default:
                break;
        }
    }

    const setMaterial = (material: Data) => {
        switch (material.type) {
            case 'list':
                dispatch(dataActions.setList(material));
                break;
            case 'pipe':
                dispatch(dataActions.setPipe(material));
                break;
            case 'fix':
                dispatch(dataActions.setFix(material));
                break;
            default:
                alert('Данный материал не учтён в системе');
                break;
        }
    }

    const addMaterialToCart = (material: Data) => {
        setMaterial(material);
        setMaterialStatus(material);
    }

    const checkMaterialType = (filter: string, material: string, type: string): boolean => {
        return filter !== '' ? material === filter || type !== 'list' : true;
    }

    return (
            <section className="material-list-component">
                <div className="material-list-component__container">
                    { material ? materials.filter(material => checkMaterialType(filter.material, material.material as string, material.type)).map( (material, index) => (
    
                        <div key={index} onClick={() => addMaterialToCart(material)} className="material-list-component__flex-element">
                            <div className="material-list-component__flex-element__name">
                                {material.name}
                            </div>
                            <div className="material-list-component__flex-element__material">
                                {material.material}
                            </div>
                            <div className="material-list-component__flex-element__price">
                                {material.price} руб.
                            </div>
                        </div>
                    )):
                    <div className="material-list-component__select-config">
                        Установите конфигурацию материала    
                    </div>}
                </div>
            </section>
    );
}