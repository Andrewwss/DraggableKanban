import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  toggleItemDialog,
  createItem,
  updateItem,
  removeItem
} from "../../redux/action";
import { selectItemDialog } from "../../redux/selectors";

function ItemDialog({
  itemDialog,
  toggleItemDialog,
  createItem,
  updateItem,
  removeItem,
}) {
  const [editMode, setEditMode] = useState(false);
  const { open, category, data } = itemDialog;
  const initialState = { title: '', description: ''};
  const [state, setState] = useState(initialState);
  const { title, description } = state;

  useEffect(() => {
    if (open && data) {
      setState({
        title: data.title,
        description: data.content
      });
      setEditMode(true);
    } else if (open && !data) {
      setState(initialState);
      setEditMode(false);
    }
  },[open]);

  const handleClose = () => toggleItemDialog({ open: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const handleDelete = () => {
    removeItem(data.id);
    handleClose();
  };

  const handleSubmit = () => {
    if (editMode) {
      updateItem({
        id: data.id,
        title,
        content: description
      })
    } else {
      createItem({
        category: category.id,
        title,
        content: description,
      })
    }

    handleClose();
  };

  const disabled = editMode
    ?
      data && ((title.trim() === data.title && description.trim() === data.content) || (title.trim() === '' || description.trim() === ''))
    :
      title.trim() === '' || description.trim() === '';

  return (
    <div >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? 'Edit Task' : 'Create Task'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'To edit task, please type title and description here.' : 'To create new task, please enter title and description here.'}
          </DialogContentText>
          <TextField
            name='title'
            autoFocus={!editMode}
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={handleChange}
          />
          <TextField
            name='description'
            autoFocus={editMode}
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            maxRows={20}
            value={description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {editMode &&
              <Button
                onClick={handleDelete}
                variant='contained'
                color="error"
              >DELETE</Button>
            }
          </div>
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant='contained'
              disabled={disabled}
              onClick={handleSubmit}
            >
              {editMode ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleItemDialog: payload=> dispatch(toggleItemDialog(payload)),
  createItem: payload => dispatch(createItem(payload)),
  updateItem: payload => dispatch(updateItem(payload)),
  removeItem: payload => dispatch(removeItem(payload)),
})

const mapStateToProps = createStructuredSelector({
  itemDialog: selectItemDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDialog);
