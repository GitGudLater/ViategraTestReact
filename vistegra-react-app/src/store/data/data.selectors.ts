import { RootState } from "../store";
import { dataAdapter } from "./data.slice";

export const dataSelectors = dataAdapter.getSelectors<RootState>(
    (state) => state.data
  );