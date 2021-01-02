import React, { useState, useEffect } from 'react';
import { DrawerDataAdmin } from '../../Components/Abstraction/Drawer';
import { AdminNav } from '../../Components/Shared/AdminNav';
import Layout from '../../Components/Shared/Layout';
import { Button, Grid, InputBase, Paper } from '@material-ui/core';
import Input, { useInput } from '../../Components/Abstraction/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
   paper: {
      marginTop: theme.spacing(8),
      marginLeft: '3vw',
      width: '94vw',
      padding: theme.spacing(4)
   },

   form: {
      width: '100%', // Fix IE11 issue.
      marginTop: theme.spacing(1)
   },
   submit: {
      width: '80%',
      height: '100%'
   }
}));

const initialValue = {
   Name: '',
   Description: '',
   Image: '',
   Release_date: '',
   Color: '',
   Price: 0,
   Quantity: 1,
   Discount: 0,
   Sold: 0
};
const parent = [];
export default function ManageSubCategories() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();

   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const [query, setQuery] = useState('');
   const onChangeQuery = ({ target: { value } }) => {
      setQuery(value);
   };

   const { inputState, onChangeHandler } = useInput(initialValue);

   // useEffect(() => {
   //    if (loading) setopenLoader(true);
   //    else setopenLoader(false);

   //    if (error) {
   //       setopenSnackBar(true);
   //    }
   //    if (deleted) {
   //       setopenSnackBar(true);
   //       setTimeout(() => {
   //          dispatch(getSubCategories());
   //       }, 1000);
   //    }
   // }, [loading, error, deleted]);

   const handleDelete = id => {};

   const handleEdit = (id, name) => {
      history.push({
         pathname: `/product/${id}`,
         state: { nameInputValue: name }
      });
   };

   const submitHandler = async e => {
      e.preventDefault();
      console.log(inputState);
   };

   return (
      <div>
         <Layout
            expandable={true}
            drawerData={DrawerDataAdmin}
            title='Admin'
            withNav={<AdminNav />}>
            <Paper className={classes.paper}>
               <form
                  className={classes.form}
                  noValidate
                  onSubmit={submitHandler}>
                  <Grid
                     container
                     direction='row'
                     justify='center'
                     alignItems='center'
                     spacing={2}>
                     {Object.entries(inputState).map(([name, value]) => (
                        <Grid
                           item
                           key={name}
                           md={
                              name === 'Price' ||
                              name === 'Release_date' ||
                              name === 'Quantity' ||
                              name === 'Discount' ||
                              name === 'Color' ||
                              name === 'Sold'
                                 ? 4
                                 : 12
                           }
                           xs={
                              name === 'Price' ||
                              name === 'Release_date' ||
                              name === 'Quantity' ||
                              name === 'Discount' ||
                              name === 'Color' ||
                              name === 'Sold'
                                 ? 6
                                 : 12
                           }>
                           <Input
                              label={name}
                              name={name}
                              value={value}
                              multiline={name === 'description' ? true : null}
                              type={name === 'price' ? 'number' : null}
                              placeholder={
                                 name === 'release_date' ? 'yyyy-mm-dd' : null
                              }
                              onChange={onChangeHandler}
                           />
                        </Grid>
                     ))}

                     <Grid item md={12} xs={12}>
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           onClick={submitHandler}>
                           Submit
                        </Button>
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <InputBase
                           id='filter'
                           name='filter'
                           placeholder='Filter Categories'
                           value={query}
                           onChange={onChangeQuery}
                        />
                     </Grid>
                  </Grid>
               </form>
            </Paper>
            {/* <Snackbar
               severity='error'
               open={s.error ? openSnackBar : null}
               handleClose={handleSnackBarClose}
               msg={s.error ? s.error : 'Error Connecting'}
            />
            <Snackbar
               severity='success'
               open={deleted ? openSnackBar : null}
               handleClose={handleSnackBarClose}
               msg={`Deleted`}
            /> */}
            <Loader open={openLoader} handleClose={handleLoaderClose} />
         </Layout>
      </div>
   );
}
