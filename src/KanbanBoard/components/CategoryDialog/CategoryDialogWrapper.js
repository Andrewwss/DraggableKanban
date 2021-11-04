import * as React from 'react';
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "./styles";
import Button from '@mui/material/Button';
import { ADD_NEW_CATEGORY } from './const';
import { toggleCategoryDialog } from "../../redux/action";

function CategoryDialogWrapper({ index, toggleCategoryDialog }) {
  const handleClickOpen = () => toggleCategoryDialog({ open: true});

  return (
    <Draggable
      key={ADD_NEW_CATEGORY}
      draggableId={ADD_NEW_CATEGORY}
      index={index}
      isDragDisabled={true}
    >
      {provided => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Button variant="contained" onClick={handleClickOpen}>
            ADD NEW CATEGORY
          </Button>
        </Container>
      )}
    </Draggable>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleCategoryDialog: payload => dispatch(toggleCategoryDialog(payload))
})

export default connect(null, mapDispatchToProps)(CategoryDialogWrapper);
