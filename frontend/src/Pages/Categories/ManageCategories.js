import React, { useState, useEffect } from 'react';
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
import Input, { useInput } from '../../Components/Abstraction/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import {
   deleteCat,
   getCategories,
   createCategory
} from '../../Redux/actions/category-action';
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

export default function ManageCategories() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const s = useSelector(s => s.category);
   const { loading, error, cat } = s;
   const ds = useSelector(s => s.deleteCat);
   const { deleted } = ds;

   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const [query, setQuery] = useState('');
   const onChangeQuery = ({ target: { value } }) => {
      setQuery(value);
   };

   const { inputState, onChangeHandler } = useInput(initialValue);

   useEffect(() => {
      dispatch(getCategories());
   }, []);

   useEffect(() => {
      if (loading) setopenLoader(true);
      else setopenLoader(false);

      if (error) {
         setopenSnackBar(true);
      }
      if (deleted) {
         setopenSnackBar(true);
         const delayed = setTimeout(() => {
            dispatch(getCategories());
         }, 1000);
         return () => clearTimeout(delayed);
      }
   }, [loading, error, deleted]);

   const handleDelete = id => {
      dispatch(deleteCat(id));
   };

   const handleEdit = (id, name, image) => {
      history.push({
         pathname: `/admin/categories/${id}`,
         state: { nameInputValue: name, imageInputValue: image }
      });
   };

   const submitHandler = async e => {
      e.preventDefault();
      dispatch(createCategory(inputState.name, inputState.image));
   };

   return (
      <div>
         <Layout
            expandable={true}
            drawerData={DrawerDataAdmin}
            title='Manage Categories'
            withNav={<AdminNav />}>
            <Paper className={classes.paper}>
               <Grid
                  container
                  direction='row'
                  justify='center'
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
                  {cat &&
                     cat
                        .filter(el => el.cat_name.toLowerCase().includes(query))
                        .map((item, index) => (
                           <Grid item md={3} xs={12}>
                              <Paper>
                                 <List>
                                    <ListItem>
                                       <ListItemText primary={item.cat_name} />
                                       <ListItemSecondaryAction>
                                          <IconButton
                                             edge='end'
                                             aria-label='delete'
                                             onClick={e =>
                                                handleEdit(
                                                   item.cat_id,
                                                   item.cat_name,
                                                   item.image
                                                )
                                             }>
                                             <EditIcon color='secondary' />
                                          </IconButton>
                                          <IconButton
                                             edge='end'
                                             aria-label='delete'
                                             onClick={e =>
                                                handleDelete(item.cat_id)
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
            </Paper>
            <Snackbar
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
            />
            <Loader open={openLoader} handleClose={handleLoaderClose} />
         </Layout>
      </div>
   );
}
