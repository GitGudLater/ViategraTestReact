import { configureStore } from '@reduxjs/toolkit'
import configReducer from './configs/configs.slice';
import dataReducer from './data/data.slice';
import shippingCartReducer from './shipping-cart/shipping-cart.slice';

export const store = configureStore({
  reducer: {
    configs: configReducer,
    data: dataReducer,
    shippingCart: shippingCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch