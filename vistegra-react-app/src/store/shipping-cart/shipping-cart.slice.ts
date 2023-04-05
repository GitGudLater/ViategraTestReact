import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../models/shipping-cart/project.type";
import { SelectedCheckProps } from "../../models/shipping-cart/selected-check.propst";

export const shippingCartAdapter = createEntityAdapter<Project>({
    selectId: (project) => project.id,
})

export const shippingCartSlice = createSlice({
  name: 'shippingCart',
  initialState: shippingCartAdapter.getInitialState({
    settingsState: {
      list: false,
      frame: false,
      pipe: false,
      material: false,
      width: false,
      length: false,
      fix: false,
    } as SelectedCheckProps
  }),
  reducers: {
    setList(state) {
      state.settingsState.list = true;
    },
    setFrame(state) {
      state.settingsState.frame = true;
    },
    setPipe(state) {
      state.settingsState.pipe = true;
    },
    setMaterial(state) {
      state.settingsState.material = true;
    },
    setFix(state) {
      state.settingsState.fix = true;
    },
    setWidth(state) {
      state.settingsState.width = true;
    },
    setLength(state) {
      state.settingsState.length = true;
    },
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