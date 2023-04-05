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
      width: 0,
      length: 0,
      frame: 0,
      material: '',
      fixPerUnit: 0,
      pipe: {name: 'undefined'} as Data,
      selectedList: {name: 'undefined'} as Data,
      fix: {name: 'undefined'} as Data
    } as DataFilterProps
  }),
  reducers: {
    setList(state, action: PayloadAction<Data>) {
      state.filter.selectedList = action.payload;
      state.filter.material = action.payload.material as string;
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
    setFixPerUnit(state, action: PayloadAction<number>) {
      state.filter.fixPerUnit = action.payload;
    },
    setFix(state, action: PayloadAction<Data>) {
      state.filter.fix = action.payload;
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