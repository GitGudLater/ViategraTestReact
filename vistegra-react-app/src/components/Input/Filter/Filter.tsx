import { FC } from "react";
import { useSelector } from "react-redux";
import { configSelectors } from "../../../store/configs/config.selectors";
import { dataEntitySelectors, dataSelectors } from "../../../store/data/data.selectors";
import { dataActions } from "../../../store/data/data.slice";
import { shippingCartActions } from "../../../store/shipping-cart/shipping-cart.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import { MaterialsList } from "../MaterialsList/MaterialsList";
import "./Filter.scss";

export const Filter:FC = () => {    
    const dispatch = useAppDispatch()
    const materialsConfigs = useSelector(configSelectors.selectMaterial);
    const frameConfigs = useSelector(configSelectors.selectFrame);
    const sizeConfigs = useSelector(configSelectors.selectSize);
    const fixConfigs = useSelector(configSelectors.selectFix);
    const materialsDataList = useSelector(dataEntitySelectors.selectAll);

    const setMaterialStatus = () => {
        dispatch(shippingCartActions.setMaterial())
    }

    const setFrameStatus = () => {
        dispatch(shippingCartActions.setFrame())
    }

    const setLengthStatus = () => {
        dispatch(shippingCartActions.setLength())
    }

    const setWidthStatus = () => {
        dispatch(shippingCartActions.setWidth())
    }

    const setMaterialConfig= (selectedMaterial: string) => {
        dispatch(dataActions.setMaterial(selectedMaterial));
        setMaterialStatus();
    }

    const setFixConfig= (selectedMaterial: string) => {
        fixConfigs.forEach(fix => {
            if(fix.key === selectedMaterial) 
                dispatch(dataActions.setFixPerUnit(fix.value));
        })
    };

    const SetMaterialDependencies = (selectedMaterial: string) => {
        setMaterialConfig(selectedMaterial);
        setFixConfig(selectedMaterial);
        setMaterialStatus();
    }

    const setFrameConfig= (selectedFrame: number) => {
        dispatch(dataActions.setFrame(selectedFrame));
        setFrameStatus();
    }

    const setSizeConfig = (size: number, axis: string) => {
        switch(axis) {
            case 'length':
                dispatch(dataActions.setLength(size));
                setLengthStatus();
                break;
            case 'width':
                dispatch(dataActions.setWidth(size));
                setWidthStatus();
                break;
            default:
                break;
        }
    }

    return (
        <div className="filter-component">
            <section className="filter-component__selector-container">
                <div className="filter-component__material-label">
                    Материал
                </div>
                <div className="filter-component__material-configs">
                    { materialsConfigs.map( (config,index) => (
                        <div key={index}>
                            <input type="radio" name='material' value={config.key} onChange={() => SetMaterialDependencies(config.key)}/>
                            {config.name}
                        </div>
                    ))}
                </div>
                <div className="filter-component__size-label">
                    Размеры
                </div>
                <div className="filter-component__size-configs">
                    { sizeConfigs.map( (config, index) => (
                        <div key={index}>
                            <input type="number" 
                                min={config.min} 
                                max={config.max} 
                                step={config.step} 
                                onChange={(event) => setSizeConfig(Number(event.target.value), config.key)}/>
                            {config.name}
                        </div>
                    ))}
                </div>
                <div className="filter-component__frame-label">
                    Каркас
                </div>
                <div className="filter-component__frame-configs">
                    { frameConfigs.map( (config, index) => (
                        <div key={index}>
                            <input type="radio" name='frame' value={config.step} onChange={() => setFrameConfig(config.step)}/>
                            {config.name}
                        </div>
                    ))}
                </div>
            </section>
            <div className="filter-component__material-list">
                <MaterialsList materials={materialsDataList}/>
            </div>
        </div>
    );
}