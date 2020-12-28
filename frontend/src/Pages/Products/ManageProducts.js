import React from 'react';
import { DrawerDataAdmin } from '../../Components/Abstraction/Drawer';
import { AdminNav } from '../../Components/Shared/AdminNav';
import Layout from '../../Components/Shared/Layout';
import { Button, Grid, Paper } from '@material-ui/core';
import Input from '../../Components/Abstraction/Input';
import { useForm } from '../../Components/Reusable/useForm';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { makeStyles } from '@material-ui/core/styles';
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

const initialValue = [
   {
      type: 'text',
      name: 'productname',
      id: 'productname',
      label: 'Product Name',
      placeholder: 'Add Product Name...',
      value: ''
   },
   {
      type: 'text',
      name: 'productdesc',
      id: 'productdesc',
      label: 'Product Description',
      multiline: true,
      placeholder: 'Add Product Description...',
      value: ''
   }
];
// let s;
export default function ManageCategories() {
   const classes = useStyles();
   //   const dispatch = useDispatch();
   //   const history = useHistory();
   //   const user = useSelector(s => s.user);
   //   const { loading, success, error } = user;
   //   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   //   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const { inputs, onChange } = useForm(initialValue);
   const [categories] = inputs;

   //   useEffect(() => {
   //      if (success) {
   //         history.push('/');
   //      }
   //      if (loading) setopenLoader(true);
   //      else setopenLoader(false);

   //      if (error) {
   //         setopenSnackBar(true);
   //      } else setopenSnackBar(false);
   //   }, [loading, success, error]);

   const submitHandler = async e => {
      e.preventDefault();
      console.log(categories.value);
      //  if (!errorExist) dispatch(login(email.value, pass.value));
   };
   return (
      <div>
         <Layout
            expandable={true}
            drawerData={DrawerDataAdmin}
            title='Admin'
            withNav={<AdminNav />}>
            <Paper className={classes.paper}>
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
                        onSubmit={submitHandler}>
                        {inputs.map(input => (
                           <Input
                              key={input.name}
                              label={input.label}
                              id={input.id}
                              name={input.name}
                              placeholder={input.placeholder}
                              value={input.value}
                              onChange={onChange}
                              multiline={input.multiline}
                           />
                        ))}
                     </form>
                  </Grid>
                  <Grid item md={12} xs={12}>
                     <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={submitHandler}>
                        Submit
                     </Button>
                  </Grid>
                  <Grid item md={12}>
                     <Paper>{categories.value}</Paper>
                  </Grid>
               </Grid>
            </Paper>
         </Layout>
      </div>
   );
}
