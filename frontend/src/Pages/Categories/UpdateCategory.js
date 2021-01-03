import React, { useEffect, useState } from 'react';
import { DrawerDataAdmin } from '../../Components/Abstraction/Drawer';
import { AdminNav } from '../../Components/Shared/AdminNav';
import Layout from '../../Components/Shared/Layout';
import { useLocation, useParams, useHistory } from 'react-router-dom';

import { Button, Grid, Paper } from '@material-ui/core';
import Input, { useInput } from '../../Components/Abstraction/Input';
import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { updateCat } from '../../Redux/actions/category-action';
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
const initialValue = { name: '', image: '' };

export default function UpdateCategory() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const {
      state: { nameInputValue, imageInputValue }
   } = useLocation();
   const { id } = useParams();
   const us = useSelector(s => s.updateCat);
   const { updated, loading, updateError } = us;

   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const { inputState, setInputState, onChangeHandler } = useInput(
      initialValue
   );
   useEffect(() => {
      setInputState({
         ...inputState,
         name: nameInputValue,
         image: imageInputValue
      });
   }, []);

   useEffect(() => {
      if (loading) setopenLoader(true);
      else setopenLoader(false);

      if (updateError) {
         console.log(updateError);
         setopenSnackBar(true);
      }
      if (updated) {
         setopenSnackBar(true);
         setTimeout(() => {
            history.push(`/admin/categories`);
         }, 1000);
      }
   }, [updated, updateError, loading]);

   const submitHandler = async e => {
      e.preventDefault();
      dispatch(updateCat(id, inputState.name, inputState.image));
   };
   return (
      <div>
         <Layout
            expandable={true}
            drawerData={DrawerDataAdmin}
            title='Update Categories'
            withNav={<AdminNav />}>
            <Paper className={classes.paper}>
               <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  spacing={2}>
                  <form
                     className={classes.form}
                     noValidate
                     onSubmit={submitHandler}>
                     <Grid item md={12} xs={12}>
                        <Input
                           label='Category Name'
                           name='name'
                           value={inputState.name}
                           onChange={onChangeHandler}
                        />
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <Input
                           label='Category Image Url'
                           name='image'
                           value={inputState.image}
                           onChange={onChangeHandler}
                        />
                     </Grid>
                  </form>
                  <Grid item md={1} xs={3}>
                     <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={submitHandler}>
                        Update
                     </Button>
                  </Grid>
               </Grid>
            </Paper>
            <Snackbar
               severity='error'
               open={updateError ? openSnackBar : null}
               handleClose={handleSnackBarClose}
               msg={updateError ? updateError : 'Error Updating'}
            />
            <Snackbar
               severity='success'
               open={updated ? openSnackBar : null}
               handleClose={handleSnackBarClose}
               msg={`${nameInputValue} Updated`}
            />
            <Loader open={openLoader} handleClose={handleLoaderClose} />
         </Layout>
      </div>
   );
}
