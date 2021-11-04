import {
  SET_CATEGORIES,
  MOVE_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  MOVE_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_CATEGORY_DIALOG,
  TOGGLE_ITEM_DIALOG
} from './types';

export const setCategories = payload => ({
  type: SET_CATEGORIES,
  payload
});

export const moveCategories = (sourceIndex, destinationIndex) => ({
  type: MOVE_CATEGORIES,
  sourceIndex, destinationIndex
});

export const createCategory = payload => ({
  type: CREATE_CATEGORY,
  payload
});

export const updateCategory = payload => ({
  type: UPDATE_CATEGORY,
  payload
});

export const removeCategory = payload => ({
  type: REMOVE_CATEGORY,
  payload
});

export const moveItems = (source, destination) => ({
  type: MOVE_ITEMS,
  source,
  destination
});

export const createItem = payload => ({
  type: CREATE_ITEM,
  payload
});

export const updateItem = payload => ({
  type: UPDATE_ITEM,
  payload
});

export const removeItem = payload => ({
  type: REMOVE_ITEM,
  payload
});

export const toggleCategoryDialog = payload => ({
  type: TOGGLE_CATEGORY_DIALOG,
  payload
});

export const toggleItemDialog = payload => ({
  type: TOGGLE_ITEM_DIALOG,
  payload
});
