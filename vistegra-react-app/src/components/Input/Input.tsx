import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { configSelectors } from "../../store/configs/config.selectors";
import { fetchConfigs } from "../../store/configs/config.thunk";
import { dataActions } from "../../store/data/data.slice";
import { useAppDispatch } from "../../store/store.hooks";
import './Input.scss';

export const Input:FC = () => {
    const dispatch = useAppDispatch()
    const materialsConfigs = useSelector(configSelectors.selectMaterial);
    const frameConfigs = useSelector(configSelectors.selectFrame);
    const sizeConfigs = useSelector(configSelectors.selectSize);
    const fixConfigs = useSelector(configSelectors.selectFix);
    useEffect(() => {dispatch(fetchConfigs())}, []);

    const setMaterialConfig= (selectedMaterial: string) => {
        dispatch(dataActions.setMaterial(selectedMaterial));
    }

    const setFixConfig= (selectedMaterial: string) => {
        fixConfigs.forEach(fix => {
            if(fix.key === selectedMaterial) 
                dispatch(dataActions.setFix(fix.value));
        })
    };

    const SetMaterialDependencies = (selectedMaterial: string) => {
        setMaterialConfig(selectedMaterial);
        setFixConfig(selectedMaterial);
    }

    const setFrameConfig= (selectedFrame: number) => {
        dispatch(dataActions.setFrame(selectedFrame));
    }

    const setSizeConfig = (size: number, axis: string) => {
        switch(axis) {
            case 'length':
                dispatch(dataActions.setLength(size));
                break;
            case 'width':
                dispatch(dataActions.setWidth(size));
                break;
            default:
                break;
        }
    }

    return (
        <section className="input__container">
            <div className="input__element material">
                { materialsConfigs.map( (config,index) => (
                    <div key={index}>
                        <input type="radio" name='material' value={config.key} onChange={() => SetMaterialDependencies(config.key)}/>
                        {config.name}
                    </div>
                ))}
            </div>
            <div className="input__element size">
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
            <div className="input__element frame">
                { frameConfigs.map( (config, index) => (
                    <div key={index}>
                        <input type="radio" name='frame' value={config.step} onChange={() => setFrameConfig(config.step)}/>
                        {config.name}
                    </div>
                ))}
            </div>
        </section>
    );
}