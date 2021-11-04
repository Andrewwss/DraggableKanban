import React, { useEffect, useState } from 'react';
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
  createCategory,
  removeCategory,
  toggleCategoryDialog,
  updateCategory
} from "../../redux/action";
import { selectCategoryDialog } from "../../redux/selectors";

function CategoryDialog({
  toggleCategoryDialog,
  categoryDialog: { open, data },
  createCategory,
  updateCategory,
  removeCategory,
}) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  useEffect(() => {
    if (open && data) {
      setValue(data.title);
      setEditMode(true);
    } else if (open && !data) {
      setValue('');
      setEditMode(false);
    }
  },[open]);

  const handleClose = () => toggleCategoryDialog(false);

  const handleDelete = () => {
    removeCategory(data.id);
    handleClose();
  };

  const disabled = editMode && data ? data && (data.title === value.trim() || value.trim() === '') : value.trim() === '';

  const handleSubmit = () => {
    if (editMode) {
      updateCategory({
        id: data.id,
        title: value
      });
    } else {
      createCategory(value)
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {editMode ? 'Edit' : 'Create'} Category
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {editMode ? 'To edit the title, please type here.' : 'To create a new category, please type here.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={value}
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
            type="submit"
            disabled={disabled}
            onClick={handleSubmit}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleCategoryDialog: open => dispatch(toggleCategoryDialog(open)),
  createCategory: payload => dispatch(createCategory(payload)),
  updateCategory: payload => dispatch(updateCategory(payload)),
  removeCategory: payload => dispatch(removeCategory(payload)),
})

const mapStateToProps = createStructuredSelector({
  categoryDialog: selectCategoryDialog,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDialog);
