import { RootState } from "../store";
import { shippingCartAdapter } from "./shipping-cart.slice";

const shippingCartState = (state: RootState) => state.shippingCart;

export const shippingCartEntitySelectors = shippingCartAdapter.getSelectors(shippingCartState);