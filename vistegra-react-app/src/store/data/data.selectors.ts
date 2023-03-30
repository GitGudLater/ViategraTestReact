import { createSelector } from "@reduxjs/toolkit";
import { bl } from "../../BL/BL";
import { Data } from "../../models/data/data.type";
import { FilterProps } from "../../models/data/filter.props";
import { ProjectMaterials } from "../../models/shipping-cart/project-materials.type";
import { Project } from "../../models/shipping-cart/project.type";
import { RootState } from "../store";
import { dataAdapter } from "./data.slice";

const dataState = (state: RootState) => state.data;

export const dataEntitySelectors = dataAdapter.getSelectors(dataState);

const selectFilterParams = createSelector(dataState, (state) => {
  return {material: state.filter.material} as FilterProps;
})

const selectFixes = createSelector(dataEntitySelectors.selectAll, (fixes) => {
  return fixes.filter(fix => fix.type === 'fix');
});

const selectFix = createSelector(selectFixes, (fixes) => {
  return fixes.find((fix, index) => fix.name === 'Саморез' || index === 0);
});

const selectAllSelectableMaterials = createSelector(dataEntitySelectors.selectAll, (materials) => {
  return materials.filter(material => material.type !== 'fix');
})

const selectPipes = createSelector(dataEntitySelectors.selectAll, (pipes) => {
  return pipes.filter(pipe => pipe.type === 'pipe');
}); 

const selectLists = createSelector(dataState, dataEntitySelectors.selectAll, (state, lists) => {
  const { material } = state.filter;
  return material !=='' ? lists.filter(list => list.type === 'list' && list.material === material) : lists;
}); 

const selectAllFilteredMaterials = createSelector( selectPipes, selectLists, (pipes, lists) => {
  return lists.concat(pipes);
})

const selectFrameField = createSelector(dataState, (state) => {
  const {length, width} = state.filter;
  return bl.setFrameField(length, width);
})

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

const selectProjectBlueprintParams = createSelector(
  dataState, 
  selectFrameField, 
  selectCellAxisLength, 
  selectListCount, 
  selectPipesLength, 
  selectFixCount, 
  selectFix,
  (state, field, cell, listQuantity, pipeLength, FixQuantity, fix) => {
  const materials: ProjectMaterials[] = [];
  materials.push(
    {material: state.filter.selectedList, materialQuantity:listQuantity},
    {material: state.filter.pipe, materialQuantity: pipeLength},
    {material: fix as Data, materialQuantity:FixQuantity}
  );
  const project: Project = {
    id:Date.now().toLocaleString(),
    field: field,
    cell: cell,
    materials: materials
  }
  return project;
})

export const dataSelectors = {
  selectFilterParams,
  selectProjectBlueprintParams,
  selectFixes,
  selectPipes,
  selectLists,
  selectListCount,
  selectFixCount,
  selectPipesLength,
  selectCellAxisLength,
  selectAllSelectableMaterials,
  selectAllFilteredMaterials,
}