import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../models/data/data.type";
import { fetchData } from "./data.thunk";

export const dataAdapter = createEntityAdapter<Data>({
    selectId: (data) => data.name,
})

export const dataSlice = createSlice({
  name: 'data',
  initialState: dataAdapter.getInitialState({
    loading: 'idle'
  }),
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action:PayloadAction<Data[]>) => {
        dataAdapter.setAll(state, action.payload);
        state.loading = 'fulfilled';
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = 'rejected';
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loading = 'pending';
    })
},
})

export const dataActions = dataSlice.actions

export default dataSlice.reducer