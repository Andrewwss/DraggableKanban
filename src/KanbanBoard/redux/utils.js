export const reorder = (array, startIndex, endIndex) => {
  let arrayCopy = Array.from(array);
  const [movableItem] = arrayCopy.splice(startIndex, 1);
  arrayCopy.splice(endIndex, 0, movableItem);

  return arrayCopy
};

export const reorderItemsMap = (categories, source, destination) => {
  const copyOfCategories = Array.from(categories);
  const current = copyOfCategories.find(category => category.id === source.droppableId);
  const target = copyOfCategories.find(category => category.id === destination.droppableId);

  if (source.droppableId === destination.droppableId) {
    const categoryItemsCopy = Array.from(current.items);
    const result = reorder(categoryItemsCopy, source.index, destination.index);
    const indexOfCategory = copyOfCategories.findIndex(category => category.id === source.droppableId);
    copyOfCategories[indexOfCategory].items = result;
  } else {
    const categoryItemsSourceCopy = Array.from(current.items);
    const indexOfSourceCategory = copyOfCategories.findIndex(category => category.id === source.droppableId);
    const categoryItemsTargetCopy = Array.from(target.items);
    const indexOfTargetCategory = copyOfCategories.findIndex(category => category.id === target.id);
    const [movableItem] = categoryItemsSourceCopy.splice(source.index, 1);
    categoryItemsTargetCopy.splice(source.index, 0, movableItem);
    copyOfCategories[indexOfSourceCategory].items = categoryItemsSourceCopy;
    copyOfCategories[indexOfTargetCategory].items = categoryItemsTargetCopy;
  }

  return copyOfCategories
};

export const generateId = () => {
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const getCurrentTime = () => {
  const date = new Date();
  return date.toLocaleString();
};
