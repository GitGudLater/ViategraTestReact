import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataFilterProps } from "../../models/data/data-filter.props";
import { Data } from "../../models/data/data.type";
import { fetchData } from "./data.thunk";

export const dataAdapter = createEntityAdapter<Data>({
    selectId: (data) => data.name,
})

export const dataSlice = createSlice({
  name: 'data',
  initialState: dataAdapter.getInitialState({
    loading: 'idle',
    filter: {
      width: 1,
      length: 1,
      frame: 1,
      material: '',
      fixPerUnit: 5,
      pipe: {} as Data,
      selectedList: {} as Data,
    } as DataFilterProps
  }),
  reducers: {
    setList(state, action: PayloadAction<Data>) {
      state.filter.selectedList = action.payload;
    },
    setPipe(state, action: PayloadAction<Data>) {
      state.filter.pipe = action.payload;
    },
    setWidth(state, action: PayloadAction<number>) {
      state.filter.width = action.payload;
    },
    setLength(state, action: PayloadAction<number>) {
      state.filter.length = action.payload;
    },
    setFrame(state, action: PayloadAction<number>) {
      state.filter.frame = action.payload;
    },
    setMaterial(state, action: PayloadAction<string>) {
      state.filter.material = action.payload;
    },
    setFix(state, action: PayloadAction<number>) {
      state.filter.fixPerUnit = action.payload;
    }
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