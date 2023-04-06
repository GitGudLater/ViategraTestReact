import { FC } from "react";
import { useSelector } from "react-redux";
import { bl } from "../../../BL/BL";
import { ProjectMaterials } from "../../../models/shipping-cart/project-materials.type";
import { configSelectors } from "../../../store/configs/config.selectors";
import { dataSelectors } from "../../../store/data/data.selectors";
import { shippingCartSelectors } from "../../../store/shipping-cart/shipping-cart.selectors";
import { shippingCartActions } from "../../../store/shipping-cart/shipping-cart.slice";
import { useAppDispatch } from "../../../store/store.hooks";
import './CurrentProject.scss';

export const CurrentProject:FC = () => {
    const dispatch = useAppDispatch();
    const configs = useSelector(dataSelectors.selectFilterParams);
    const blueprintData = useSelector(dataSelectors.selectProjectBlueprintParams);
    const isProjectReady = useSelector(shippingCartSelectors.selectProjectStatus);
    const frameConfigs = useSelector(configSelectors.selectFrame);

    const paymentCost = (material: ProjectMaterials) => {
        return bl.setMaterialPrice(material)
    }

    const SetProject = () => {
        dispatch(shippingCartActions.setProject(blueprintData));
    }

    const checkProject = (): boolean => {
        const { fix, list, frame, pipe, material, width, length} = isProjectReady;
        return fix && list && frame && pipe && material && width && length ; 
    }

    const setFrameName = (frame: number):string => {
        const frameConfig = frameConfigs.find((config) => config.step === frame );
        return frameConfig ? frameConfig.name : 'неустановленный в системе каркас';
    }

    return (
        <section className="project__container">
            <div className="project__configs">
                { isProjectReady.material ? 
                <div className="project__configs__selected">
                    Материал Выбран: {configs.material}
                </div> : 
                <div className="project__configs__missed">
                    Выберите Материал
                </div>}
                { isProjectReady.frame ? 
                <div className="project__configs__selected">
                    Каркас Выбран: {setFrameName(configs.frame)}
                </div> : 
                <div className="project__configs__missed">
                    Выберите каркас
                </div>}
                { isProjectReady.length ? 
                <div className="project__configs__selected">
                    Установлена Длинна: {configs.length} м
                </div> : 
                <div className="project__configs__missed">
                    Установите Длинну
                </div>}
                { isProjectReady.width ? 
                <div className="project__configs__selected">
                    Установлена Ширина: {configs.width} м
                </div> : 
                <div className="project__configs__missed">
                    Установите Ширину
                </div>}
            </div>
            <div className="project__materials">
                {
                    isProjectReady.list ? 
                    <div className="list">
                        <div>
                            {blueprintData.list.material.name}
                        </div>
                        <div>
                            количество {blueprintData.list.materialQuantity}
                        </div>
                        <div>
                            итого {paymentCost(blueprintData.list)} руб
                        </div>
                    </div> : 
                    <div className="missed">
                        Для завершения детали нехватает листа
                    </div>
                }
                {
                    isProjectReady.pipe ? 
                    <div className="pipe">
                        <div>
                            {blueprintData.pipe.material.name}
                        </div>
                        <div>
                            количество {blueprintData.pipe.materialQuantity} {blueprintData.pipe.material.unit}
                        </div>
                        <div>
                            итого {paymentCost(blueprintData.pipe)} руб
                        </div>
                    </div> : 
                    <div className="missed">
                        Для завершения детали нехватает трубы
                    </div>
                }
                {
                    isProjectReady.fix ? 
                    <div className="fix">
                        <div>
                            {blueprintData.fix.material.name}
                        </div>
                        <div>
                            количество {blueprintData.fix.materialQuantity} {blueprintData.fix.material.unit}
                        </div>
                        <div>
                            итого {paymentCost(blueprintData.fix)} руб
                        </div>
                    </div> : 
                    <div className="missed">
                        Для завершения детали нехватает крепежа
                    </div>
                }
            </div>
            <div className="project__calculations">
                { isProjectReady.width && isProjectReady.length && isProjectReady.frame && isProjectReady.pipe ?
                    <div>
                        <div className="project__calculations-field">
                            Площадь детали {blueprintData.field} м2
                        </div>
                        <div className="project__calculations-axis">
                            Соотношение сторон изделия {blueprintData.cell.xAxisLength} x {blueprintData.cell.yAxisLength} м2
                        </div>
                    </div>: 
                    <div>
                        Установите размеры, трубу и каркас
                    </div>
                }
                {isProjectReady.list && isProjectReady.pipe && isProjectReady.fix ? 
                    <div className="project__calculations-price">
                        Общая стоимость материалов {blueprintData.price} руб.
                    </div> :
                    <div>
                        Для расчёта результата необходимо выбрать все необходимые материалы
                    </div>
                }
            </div>
            <div className="project__btn">
                { checkProject() ? 
                <button className="project__btn-ready" onClick={() => SetProject()}>Создать проект</button>:
                <div className="project__btn-error">
                    Не все настройки установлены    
                </div>}
            </div>
        </section>
    );
}