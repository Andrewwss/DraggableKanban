import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Item from "../item/item";
import Title from "../title/title";
import {
  Container,
  DropZone,
  ScrollContainer,
  Wrapper
} from './styles';

const InnerQuoteList = React.memo(function(props) {
  return props.items.map((item, index) => (
    <Draggable
      key={item.id}
      draggableId={`task_${item.id}`}
      index={index}
      shouldRespectForceTouch={false}
    >
      {(dragProvided, dragSnapshot) => (
        <Item
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          createdAt={item.createdAt}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  )
  );
});

function InnerList({ items, dropProvided, title }) {
  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList items={items} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function CategoryList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId,
    listType,
    style,
    items,
    title
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                items={items}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              items={items}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}

CategoryList.defaultProps = {
  listId: "LIST"
};
