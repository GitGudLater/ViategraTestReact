import { RootState } from "../store";
import { configAdapter } from "./configs.slice";

export const configSelectors = configAdapter.getSelectors<RootState>(
    (state) => state.configs
  );