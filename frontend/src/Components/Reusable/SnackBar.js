import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
   return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2)
      }
   }
}));
export function useSnackBar() {
   const [openSnackBar, setopenSnackBar] = React.useState(false);

   const handleSnackBarToggle = () => {
      setopenSnackBar(!openSnackBar);
   };

   const handleSnackBarClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setopenSnackBar(false);
   };

   return {
      openSnackBar,
      setopenSnackBar,
      handleSnackBarToggle,
      handleSnackBarClose
   };
}

export default function CustomizedSnackbars({
   severity,
   open,
   handleClose,
   msg
}) {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
               {msg}
            </Alert>

            {/* other option: success, info, warning, */}
         </Snackbar>
      </div>
   );
}
