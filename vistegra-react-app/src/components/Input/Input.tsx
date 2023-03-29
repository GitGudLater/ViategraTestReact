import { FC, useEffect } from "react";
import { fetchConfigs } from "../../store/configs/config.thunk";
import { fetchData } from "../../store/data/data.thunk";
import { useAppDispatch } from "../../store/store.hooks";
import { Filter } from "./Filter/Filter";
import './Input.scss';

export const Input:FC = () => {    
    const dispatch = useAppDispatch()
    useEffect(() => {dispatch(fetchConfigs())}, []);
    useEffect(() => {dispatch(fetchData())}, []);

    return (
        <div>
            <Filter/>
        </div>
    );
}