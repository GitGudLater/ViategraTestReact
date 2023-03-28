import { configureStore } from '@reduxjs/toolkit'
import configReducer from './configs/configs.slice';

export const store = configureStore({
  reducer: {
    configs: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch