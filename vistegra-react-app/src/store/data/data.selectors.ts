import { createSelector } from "@reduxjs/toolkit";
import { bl } from "../../BL/BL";
import { RootState } from "../store";
import { dataAdapter } from "./data.slice";

const dataState = (state: RootState) => state.data;

export const dataEntitySelectors = dataAdapter.getSelectors(dataState);

const selectFixes = createSelector(dataEntitySelectors.selectAll, (fixes) => {
  return fixes.filter(fix => fix.type === 'fix');
});

const selectPipes = createSelector(dataEntitySelectors.selectAll, (pipes) => {
  return pipes.filter(pipe => pipe.type === 'pipe');
}); 

const selectLists = createSelector(dataState, dataEntitySelectors.selectAll, (state, lists) => {
  const { material } = state.filter;
  return lists.filter(list => list.type === 'list' && list.material === material);
}); 

const selectListCount = createSelector(dataState, (state) => {
  const { length, width, selectedList} = state.filter;
  return bl.setListCount(length, width, selectedList)
})

const selectFixCount = createSelector(dataState, (state) => {
  const { length, width, fixPerUnit} = state.filter;
  return bl.setFixCount(fixPerUnit,bl.setFrameField(length, width));
})

const selectPipesLength = createSelector(dataState, (store) => {
  const {frame, length, width, pipe} = store.filter;
  return bl.setPipeLength(frame, length, width, pipe);
})

const selectCellAxisLength = createSelector(dataState, (store) => {
  const {frame, length, width, pipe} = store.filter;
  return bl.setCellAxisLength(frame, length, width, pipe);
})

export const dataSelectors = {
  selectFixes,
  selectPipes,
  selectLists,
  selectListCount,
  selectFixCount,
  selectPipesLength,
  selectCellAxisLength,
}