import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { configSelectors } from "../../store/configs/config.selectors";
import { fetchConfigs } from "../../store/configs/config.thunk";
import { useAppDispatch } from "../../store/store.hooks";
import './Input.scss';

export const Input:FC = () => {
    const dispatch = useAppDispatch()
    const materials = useSelector(configSelectors.selectMaterial);
    const frame = useSelector(configSelectors.selectFrame);
    const size = useSelector(configSelectors.selectSize);
    useEffect(() => {dispatch(fetchConfigs())}, []);


    return (
        <section className="input__container">
            <div className="input__element material">
                { materials.map( (config,index) => (
                    <div key={index}>
                        <input type="radio" name='material' value={config.key}/>
                        {config.name}
                    </div>
                ))}
            </div>
            <div className="input__element size">
                { size.map( (config, index) => (
                    <div key={index}>
                        <input type="number" min={config.min} max={config.max} step={config.step}/>
                        {config.name}
                    </div>
                ))}
            </div>
            <div className="input__element frame">
                { frame.map( (config, index) => (
                    <div key={index}>
                        <input type="radio" name='frame' value={config.key}/>
                        {config.name}
                    </div>
                ))}
            </div>
        </section>
    );
}