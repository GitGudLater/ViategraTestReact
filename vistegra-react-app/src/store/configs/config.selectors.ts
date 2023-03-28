import { RootState } from "../store";
import { configAdapter } from "./configs.slice";

const configSelectors = configAdapter.getSelectors<RootState>(
    (state) => state.configs
  );