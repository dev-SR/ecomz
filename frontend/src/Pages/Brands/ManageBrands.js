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
   createBrands,
   deleteBrands,
   getBrands
} from '../../Redux/actions/brands-action';

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
   Brands: ''
};
export default function ManageBrands() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const b = useSelector(s => s.brands);
   const { loading, error, brands } = b;
   const [created, setCreated] = useState(false);
   const ds = useSelector(s => s.deleteBrands);
   const { deleted } = ds;

   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const [query, setQuery] = useState('');
   const onChangeQuery = ({ target: { value } }) => {
      setQuery(value);
   };

   useEffect(() => {
      dispatch(getBrands());
   }, []);
   const { inputState, onChangeHandler, setInputState } = useInput(
      initialValue
   );

   useEffect(() => {
      if (loading) setopenLoader(true);
      else setopenLoader(false);

      if (error) {
         setopenSnackBar(true);
      }
      if (deleted) {
         setopenSnackBar(true);
         const delayed = setTimeout(() => {
            dispatch(getBrands());
         }, 1000);
         return () => clearTimeout(delayed);
      }
   }, [loading, error, deleted]);

   const handleDelete = id => {
      dispatch(deleteBrands(id));
   };

   const handleEdit = (id, value) => {
      history.push({
         pathname: `/admin/brands/${id}`,
         state: { nameInputValue: value }
      });
   };

   const submitHandler = async e => {
      e.preventDefault();
      dispatch(createBrands(inputState.Brands));
      setInputState(initialValue);
   };

   return (
      <div>
         <Layout
            expandable={true}
            drawerData={DrawerDataAdmin}
            title='Manage Brands'
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
                        <Grid item key={name} md={12} xs={12}>
                           <Input
                              label={name}
                              name={name}
                              value={value}
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
                     {brands &&
                        brands
                           .filter(el =>
                              el.brand_name.toLowerCase().includes(query)
                           )
                           .map((item, index) => (
                              <Grid item md={3} xs={12}>
                                 <Paper>
                                    <List>
                                       <ListItem>
                                          <ListItemText
                                             primary={item.brand_name}
                                          />
                                          <ListItemSecondaryAction>
                                             <IconButton
                                                edge='end'
                                                aria-label='delete'
                                                onClick={e =>
                                                   handleEdit(
                                                      item.brand_id,
                                                      item.brand_name
                                                   )
                                                }>
                                                <EditIcon color='secondary' />
                                             </IconButton>
                                             <IconButton
                                                edge='end'
                                                aria-label='delete'
                                                onClick={e =>
                                                   handleDelete(item.brand_id)
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
               </form>
            </Paper>
            <Snackbar
               severity='error'
               open={error ? openSnackBar : null}
               handleClose={handleSnackBarClose}
               msg={error ? error : 'Error Connecting'}
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
