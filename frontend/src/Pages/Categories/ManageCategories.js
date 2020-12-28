import React, { useState } from 'react';
import { DrawerDataAdmin } from '../../Components/Abstraction/Drawer';
import { AdminNav } from '../../Components/Shared/AdminNav';
import Layout from '../../Components/Shared/Layout';
import {
   Button,
   Grid,
   IconButton,
   InputBase,
   List,
   ListItem,
   ListItemSecondaryAction,
   ListItemText,
   Paper
} from '@material-ui/core';
import Input from '../../Components/Abstraction/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useForm } from '../../Components/Reusable/useForm';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { makeStyles } from '@material-ui/core/styles';
import EditPopup, { useEditPopup } from '../../Components/Reusable/EditPopup';
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
      name: 'categories',
      id: 'this-email',
      label: 'categories',
      placeholder: 'Add new Categories...',
      value: ''
   }
];
// let s;

const dummy = [
   { name: 'Akjsfd' },
   { name: 'Bjsdnfa' },
   { name: 'Csnfa' },
   { name: 'Doiup9oij' },
   { name: 'Eknf' }
];
export default function ManageCategories() {
   const classes = useStyles();
   //   const dispatch = useDispatch();
   //   const history = useHistory();
   //   const user = useSelector(s => s.user);
   //   const { loading, success, error } = user;
   //   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   //   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();
   const [dumy, setDummy] = useState(dummy);
   const [query, setQuery] = useState('');

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
   const onChangeQuery = ({ target: { value } }) => {
      setQuery(value);
   };
   const handleDelete = (index, name) => {
      setDummy(dumy.filter((el, i) => index != i));
      console.log(name);
   };

   const { editDialogOpen, openEditPopup, closeEditPopup } = useEditPopup();
   const handleEdit = (index, name) => {
      console.log(name);
      openEditPopup();
   };
   const submitHandler = async e => {
      e.preventDefault();
      console.log(categories.value);
      closeEditPopup();
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
                  <Grid item md={12} xs={12}>
                     <InputBase
                        id='filter'
                        name='filter'
                        placeholder='Filter Categories'
                        value={query}
                        onChange={onChangeQuery}
                     />
                  </Grid>
                  {dumy
                     .filter(el => el.name.toLowerCase().includes(query))
                     .map((item, index) => (
                        <Grid item md={3} xs={12}>
                           <Paper>
                              <List>
                                 <ListItem>
                                    <ListItemText primary={item.name} />
                                    <ListItemSecondaryAction>
                                       <IconButton
                                          edge='end'
                                          aria-label='delete'
                                          onClick={e =>
                                             handleEdit(index, item.name)
                                          }>
                                          <EditIcon color='secondary' />
                                       </IconButton>
                                       <IconButton
                                          edge='end'
                                          aria-label='delete'
                                          onClick={e =>
                                             handleDelete(index, item.name)
                                          }>
                                          <DeleteIcon />
                                       </IconButton>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              </List>
                           </Paper>
                        </Grid>
                     ))}
               </Grid>
               <EditPopup
                  title='Edit Categories'
                  editDialogOpen={editDialogOpen}
                  openEditPopup={openEditPopup}
                  closeEditPopup={closeEditPopup}
                  inputs={inputs}
                  handleSubmit={submitHandler}
               />
            </Paper>
         </Layout>
      </div>
   );
}
