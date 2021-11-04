import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Footer,
  Content,
} from './styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { toggleItemDialog } from "../../redux/action";

function Item({
  id,
  title,
  content,
  createdAt,
  isDragging,
  isGroupedOver,
  provided,
  toggleItemDialog
}) {
  const handleOpenItemDialog = () => toggleItemDialog({
    open: true,
    category: null,
    item: {
      id,
      title,
      content
    }
  });

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Content>
        <div>
          <div
            style={{
              margin: 10,
              fontSize: 20,
              maxWidth: 188,
              overflow: "hidden",
              textOverflow: 'ellipsis',
            }}>{title}</div>
          <div style={{ position: 'absolute', top: 5, right: 5 }}>
            <IconButton
              size='small'
              aria-label="settings"
              id="basic-button"
              onClick={handleOpenItemDialog}
            >
              <EditIcon />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            textAlign: 'start',
            fontSize: 'larger',
            wordBreak: 'break-word'
          }}
        >{content}</div>
        <Footer
          style={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >{createdAt}</Footer>
      </Content>
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleItemDialog: payload => dispatch(toggleItemDialog(payload))
})

export default connect(null, mapDispatchToProps)(Item);
