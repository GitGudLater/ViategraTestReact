import { FC } from "react";
import { useSelector } from "react-redux";
import { Data } from "../../../models/data/data.type";
import { MaterialListProps } from "../../../models/data/material-list.props";
import { dataSelectors } from "../../../store/data/data.selectors";
import { dataActions } from "../../../store/data/data.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import "./MaterialsList.scss";

export const MaterialsList:FC<MaterialListProps> = (props) => {
    
    const dispatch = useAppDispatch()
    const { materials } = props;
    const filter = useSelector(dataSelectors.selectFilterParams);

    const setMaterial = (material: Data) => {
        switch (material.type) {
            case 'list':
                dispatch(dataActions.setList(material));
                break;
            case 'pipe':
                dispatch(dataActions.setPipe(material));
                break;
            default:
                alert('Данный материал не учтён в системе');
                break;
        }
    }

    const checkMaterialType = (filter: string, material: string, type: string): boolean => {
        return filter !== '' ? material === filter || type !== 'list' : true;
    }

    return (
            <section className="material-list container">
                <div className="material-list__flex-container">
                    { materials.filter(material => checkMaterialType(filter.material, material.material as string, material.type)).map( (material, index) => (
    
                        <div key={index} onClick={() => setMaterial(material)} className="material-list__flex-element">
                            <div>
                                {material.name}
                            </div>
                            <div>
                                {material.material}
                            </div>
                            <div>
                                {material.price} руб.
                            </div>
                        </div>

                    ))}
                </div>
            </section>
    );
}