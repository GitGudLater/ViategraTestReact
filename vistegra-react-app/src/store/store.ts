import { configureStore } from '@reduxjs/toolkit'
import configReducer from './configs/configs.slice';
import dataReducer from './data/data.slice';

export const store = configureStore({
  reducer: {
    configs: configReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch