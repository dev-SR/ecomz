import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Input from '../Abstraction/Input';
const useStyles = makeStyles(theme => ({
   dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
   },
   dialogTitle: {
      paddingRight: '0px'
   }
}));
export function useEditPopup() {
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const openEditPopup = () => {
      setEditDialogOpen(true);
   };
   const closeEditPopup = () => {
      setEditDialogOpen(false);
   };
   return {
      editDialogOpen,
      openEditPopup,
      closeEditPopup
   };
}
export default function EditPopup({
   editDialogOpen,
   title,
   closeEditPopup,
   onChange,
   inputs,
   handleSubmit
}) {
   const classes = useStyles();

   return (
      <>
         <Dialog open={editDialogOpen} onClose={closeEditPopup}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
               <Paper>
                  <Grid
                     container
                     direction='row'
                     justify='center'
                     alignItems='center'
                     spacing={2}>
                     <Grid item md={12} xs={12}>
                        <form
                           className={classes.form}
                           noValidate
                           onSubmit={handleSubmit}>
                           {inputs &&
                              inputs.map(input => (
                                 <Input
                                    key={input.name}
                                    label={input.label}
                                    id={input.id}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    onChange={onChange}
                                 />
                              ))}
                        </form>
                     </Grid>
                     {/* <Grid item md={12} xs={12}>
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           onClick={submitHandler}>
                           Submit
                        </Button>
                     </Grid> */}
                  </Grid>
               </Paper>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleSubmit} color='primary'>
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
