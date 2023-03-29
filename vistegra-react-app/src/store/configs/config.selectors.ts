import { createSelector } from "reselect";
import { Config } from "../../models/config/config.type";
import { Fix } from "../../models/config/fix.type";
import { Frame } from "../../models/config/frame.type";
import { Material } from "../../models/config/materials.type";
import { Size } from "../../models/config/size.type";
import { RootState } from "../store";
import { configAdapter } from "./configs.slice";

const configState = (state: RootState) => state.configs;

export const configEntitySelectors = configAdapter.getSelectors(configState)


const selectSize = createSelector(configEntitySelectors.selectAll, ( configs) => {
  let filteredConfigs: Size[] = [];
  configs.forEach((config:Config) => {if(config.type === "size"){filteredConfigs.push({...config} as Size)}})
  return filteredConfigs;
});

const selectFix = createSelector(configEntitySelectors.selectAll, ( configs) => {
  let filteredFix: Fix[] = [];
  configs.forEach((config:Config) => {if(config.type === "fix"){filteredFix.push({...config} as Fix)}})
  return filteredFix;
});

const selectMaterial = createSelector(configEntitySelectors.selectAll, ( configs) => {
  let filteredMaterial: Material[] = [];
  configs.forEach((config:Config) => {if(config.type === "material"){filteredMaterial.push({...config} as Material)}})
  return filteredMaterial;
});

const selectFrame = createSelector(configEntitySelectors.selectAll, ( configs) => {
  let filteredFrame: Frame[] = [];
  configs.forEach((config:Config) => {if(config.type === "frame"){filteredFrame.push({...config} as Frame)}})
  return filteredFrame;
});

export const configSelectors = {
  selectSize,
  selectFix,
  selectFrame,
  selectMaterial,
};