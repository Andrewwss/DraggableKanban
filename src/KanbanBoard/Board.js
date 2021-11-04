import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialCategories from "./initialCategories";
import Category from "./components/category/category";
import AddNewCategory from "./components/CategoryDialog/CategoryDialogWrapper";
import ItemDialog from "./components/ItemDialog/ItemDialog";
import CategoryDialog from "./components/CategoryDialog/CategoryDialog";
import { ParentContainer, Container } from './styles';
import {
  setCategories,
  moveCategories,
  moveItems
} from "./redux/action";
import {
  selectCategories
} from "./redux/selectors";
import AboutBackdrop from "./components/aboutBackdrop";

const isCombineEnabled = false;

function Board(props) {
  const {
    setCategories,
    categories,
    moveCategories,
    moveItems,
    withScrollableColumns
  } = props;

  useEffect(() => {
    const persistKanban = localStorage.getItem('persist:kanban');
    if (!persistKanban) {
      setCategories(initialCategories.categories);
    }
  },[]);

  const onDragEnd = result => {
    // dropped nowhere
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (result.type === "CATEGORY") {
      moveCategories(source.index, destination.index)
      return;
    }

    moveItems(source, destination);
  };

  const { containerHeight } = props;

  const board = (
    <Droppable
      droppableId="board"
      type="CATEGORY"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
      isCombineEnabled={isCombineEnabled}
    >
      {provided => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {categories.map((category, index) => (
            <Category
              key={`category_${category.id}`}
              index={index}
              id={category.id}
              title={category.title}
              items={category.items}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
            />
          ))}
          <AddNewCategory
            key={`category_add_${categories.length}`}
            index={categories.length}
            isScrollable={withScrollableColumns}
            isCombineEnabled={isCombineEnabled}
          />
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );

  return (
    <React.Fragment>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Draggable Tasks</h2>
      <AboutBackdrop />
      <DragDropContext onDragEnd={onDragEnd}>
        {containerHeight ? <ParentContainer height={containerHeight}>{board}</ParentContainer> : board}
      </DragDropContext>
      <CategoryDialog />
      <ItemDialog />
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  setCategories: (payload) => dispatch(setCategories(payload)),
  moveCategories: (sourceIndex, destinationIndex) => dispatch(moveCategories(sourceIndex, destinationIndex)),
  moveItems: (source, destination) => dispatch(moveItems(source, destination)),
})

const mapStateToProps = createStructuredSelector({
  categories: selectCategories
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
