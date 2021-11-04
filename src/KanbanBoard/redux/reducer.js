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
import {
  reorder,
  reorderItemsMap,
  generateId,
  getCurrentTime
} from "./utils";

const INITIAL_STATE = {
  categories: [],
  categoryDialog: {
    open: false,
    data: null
  },
  itemDialog: {
    open: false,
    category: null,
    data: null
  },
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case MOVE_CATEGORIES:
      return {
        ...state,
        categories: reorder(state.categories, action.sourceIndex, action.destinationIndex)
      }
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: generateId(),
            title: action.payload,
            items: [],
          }
        ]
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category.id === action.payload.id) {
            category.title = action.payload.title;
          }
          return category
        })
      }
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      }
    case MOVE_ITEMS:
      return {
        ...state,
        categories: reorderItemsMap(state.categories, action.source, action.destination)
      }
    case CREATE_ITEM:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category.id === action.payload.category) {
            category.items = category.items.concat({
              id: generateId(),
              title: action.payload.title,
              content: action.payload.content,
              createdAt: getCurrentTime()
            })
          }

          return category
        })
      }
    case UPDATE_ITEM:
      return {
        ...state,
        categories: state.categories.map(category => {
          category.items = category.items.map(item => {
            if (item.id === action.payload.id) {
              item.title = action.payload.title;
              item.content = action.payload.content;
            }

            return item
          })
          return category
        })
      }
    case REMOVE_ITEM:
      return {
        ...state,
        categories: state.categories.map(category => {
          category.items = category.items.filter(item => item.id !== action.payload)

          return category
        })
      }
    case TOGGLE_CATEGORY_DIALOG:
      return {
        ...state,
        categoryDialog: {
          open: action.payload.open,
          data: action.payload.category,
        }
      }
    case TOGGLE_ITEM_DIALOG:
      return {
        ...state,
        itemDialog: {
          open: action.payload.open,
          category: action.payload.category,
          data: action.payload.item
        },
      }
    default:
      return state
  }
};

export default boardReducer;
