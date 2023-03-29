import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../DAL/DAL";
import { Data } from "../../models/data/data.type";

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (): Promise<Data[]> => {
      const response = await getData();
      return response;
    }
  )