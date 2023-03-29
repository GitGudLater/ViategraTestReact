import { createAsyncThunk } from "@reduxjs/toolkit"
import { getConfigs } from "../../DAL/DAL"
import { Config } from "../../models/config/config.type";

export const fetchConfigs = createAsyncThunk(
    'config/fetchConfigs',
    async (): Promise<Config[]> => {
      const response = await getConfigs();
      return response;
    }
  )