import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../models/shipping-cart/project.type";

export const shippingCartAdapter = createEntityAdapter<Project>({
    selectId: (project) => project.id,
})

export const shippingCartSlice = createSlice({
  name: 'shippingCart',
  initialState: shippingCartAdapter.getInitialState(),
  reducers: {
    setProject(state, action: PayloadAction<Project>) {
        shippingCartAdapter.addOne(state, action.payload)
      },
    removeProject(state, action: PayloadAction<string>) {
        shippingCartAdapter.removeOne(state, action.payload);
    },
    removeShippingCart(state) {
        shippingCartAdapter.removeAll(state);
    }
  },
})

export const shippingCartActions = shippingCartSlice.actions

export default shippingCartSlice.reducer