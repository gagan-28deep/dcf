import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Index = ({ open, options, onClose }) => {
  const {
    message,
    severity,
    anchorOrigin,
    autoHideDuration
  } = options;

  // function TransitionLeft(props) {
  //   return <Slide {...props} direction="left" />;
  // }

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={() => onClose()}
      // TransitionComponent={TransitionLeft}
    >
      <Alert onClose={() => onClose()} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Index;