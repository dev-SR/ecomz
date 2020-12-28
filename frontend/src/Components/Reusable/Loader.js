import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
   }
}));

export const useLoader = () => {
   const [openLoader, setopenLoader] = React.useState(false);
   const handleLoaderClose = () => {
      setopenLoader(false);
   };
   const handleLoaderToggle = () => {
      setopenLoader(!openLoader);
   };
   return {
      openLoader,
      setopenLoader,
      handleLoaderClose,
      handleLoaderToggle
   };
};

export default function SimpleBackdrop({ open, handleClose }) {
   const classes = useStyles();

   return (
      <div>
         <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}>
            <CircularProgress color='inherit' />
         </Backdrop>
      </div>
   );
}
