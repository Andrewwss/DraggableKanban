import React from "react";
import { connect } from 'react-redux';
import { Draggable } from "react-beautiful-dnd";
import CategoryList from "../category-list/category-list";
import { Container } from "./styles";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  toggleCategoryDialog,
  toggleItemDialog
} from "../../redux/action";

function Category(props) {
  const {
    id,
    title,
    items,
    index,
    isScrollable,
    isCombineEnabled,
    toggleCategoryDialog,
    toggleItemDialog,
  } = props;

  const handleOpenCategoryDialog= (event) => {
    toggleCategoryDialog({
      open: true,
      category: {
        id,
        title,
      }
    });
  };

  const handleOpenItemDialog = () => {
    toggleItemDialog({
      open: true,
      category: { id },
      item: null
    })
  };

  return (
    <Draggable
      draggableId={`category_${id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Card
            sx={{
              maxWidth: 345,
              backgroundColor: snapshot.isDragging ? "#bec5ff" : "#ffffff",
            }}
          >
            <CardHeader
              sx={{ color: snapshot.isDragging ? "#ffffff" : '#304e60' }}
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              action={
                <IconButton
                  aria-label="settings"
                  onClick={handleOpenCategoryDialog}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={title}
            />
            <CardContent style={{ padding: 5 }}>
              <CategoryList
                listId={id}
                listType="QUOTE"
                style={{ backgroundColor: snapshot.isDragging ? '#395e93' : '#8BA6CD' }}
                items={items}
                internalScroll={isScrollable}
                isCombineEnabled={Boolean(isCombineEnabled)}
              />
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant="contained"
                fullWidth
                onClick={handleOpenItemDialog}
              >
                Create Task
              </Button>
            </CardActions>
          </Card>
        </Container>
      )}
    </Draggable>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleCategoryDialog: payload => dispatch(toggleCategoryDialog(payload)),
  toggleItemDialog: payload => dispatch(toggleItemDialog(payload))
})

export default connect(null, mapDispatchToProps)(Category);
