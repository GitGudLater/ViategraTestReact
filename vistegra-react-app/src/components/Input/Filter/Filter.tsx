import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Data } from "../../../models/data/data.type";
import { configSelectors } from "../../../store/configs/config.selectors";
import { dataEntitySelectors, dataSelectors } from "../../../store/data/data.selectors";
import { dataActions } from "../../../store/data/data.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import { MaterialsList } from "../MaterialsList/MaterialsList";
import "./Filter.scss";

export const Filter:FC = () => {    
    const dispatch = useAppDispatch()
    const materialsConfigs = useSelector(configSelectors.selectMaterial);
    const frameConfigs = useSelector(configSelectors.selectFrame);
    const sizeConfigs = useSelector(configSelectors.selectSize);
    const fixConfigs = useSelector(configSelectors.selectFix);
    const [materialsDataList, setMaterialsDataList] = useState<Data[]>(useSelector(dataEntitySelectors.selectAll))

    const setMaterialConfig= (selectedMaterial: string) => {
        dispatch(dataActions.setMaterial(selectedMaterial));
        setMaterialsDataList(useSelector(dataSelectors.selectAllFilteredMaterials));
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
        setMaterialsDataList(useSelector(dataSelectors.selectAllFilteredMaterials));
    }

    const setFrameConfig= (selectedFrame: number) => {
        dispatch(dataActions.setFrame(selectedFrame));
        setMaterialsDataList(useSelector(dataSelectors.selectAllFilteredMaterials));
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
        <div>
            <section className="input__container filter">
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
            <div>
                <MaterialsList materials={materialsDataList}/>
            </div>
        </div>
    );
}