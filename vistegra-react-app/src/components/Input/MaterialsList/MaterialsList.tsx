import { FC } from "react";
import { Data } from "../../../models/data/data.type";
import { MaterialListProps } from "../../../models/data/material-list.props";
import { dataActions } from "../../../store/data/data.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import "./MaterialsList.scss";

export const MaterialsList:FC<MaterialListProps> = (props) => {
    
    const dispatch = useAppDispatch()
    const { materials } = props;

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

    return (
            <section className="material-list container">
                <div className="material-list__flex-container">
                    { materials.map( (material, index) => (
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