import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function AboutBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(!open);

  return (
    <div>
      <Button sx={{ color: '#fff' }} onClick={handleToggle}>About</Button>
      <Backdrop
        sx={{ color: 'rgba(255,255,255,0.6)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Paper elevation={1} sx={{ padding: 5 }}>
          <h1>Welcome!</h1>
          <div style={{ textAlign: 'start' }}>
            <div>You can drag tasks and categories.</div>
            <div>Create, update and remove items.</div>
            <div style={{ marginBottom: '10px' }}>This app is build, using React, React-beautiful-dnd, Redux, MaterialUI, Redux-persist</div>
            <div style={{ textAlign: 'end' }}>Thank you for checking this app!</div>
          </div>
        </Paper>
      </Backdrop>
    </div>
  );
}
