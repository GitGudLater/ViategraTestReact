import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Config } from '../../models/config/config.type'
import { fetchConfigs } from './config.thunk'

export const configAdapter = createEntityAdapter<Config>({
    selectId: (config) => config.key,
})

export const configSlice = createSlice({
  name: 'config',
  initialState: configAdapter.getInitialState({
    loading: 'idle'
  }),
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfigs.fulfilled, (state, action:PayloadAction<Config[]>) => {
        configAdapter.setAll(state, action.payload);
        state.loading = 'fullfilled';
    })
},
})

export const configActions = configSlice.actions

export default configSlice.reducer