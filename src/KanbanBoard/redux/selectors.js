import { createSelector } from 'reselect';

const selectBoard = state => state.board;

export const selectCategories = createSelector(
  [selectBoard],
  board => board.categories
);

export const selectCategoryDialog = createSelector(
  [selectBoard],
  board => board.categoryDialog
);

export const selectItemDialog = createSelector(
  [selectBoard],
  board => board.itemDialog
);
