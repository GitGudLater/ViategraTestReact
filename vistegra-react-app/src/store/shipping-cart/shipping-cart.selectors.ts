import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { shippingCartAdapter } from "./shipping-cart.slice";

const shippingCartState = (state: RootState) => state.shippingCart;

export const shippingCartEntitySelectors = shippingCartAdapter.getSelectors(shippingCartState);

const selectProjectStatus = createSelector(shippingCartState, (state) => {
    return state.settingsState;
});

export const shippingCartSelectors = {
    selectProjectStatus,
}