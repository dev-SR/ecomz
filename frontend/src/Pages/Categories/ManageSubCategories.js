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
import { useForm } from '../../Components/Reusable/useForm';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import {
   createSubCategory,
   deleteCat,
   deleteSubCat,
   getSubCategories
} from '../../Redux/actions/user-action';
import {
   createCategory,
   getCategories
} from './../../Redux/actions/user-action';
import AutoCompleteModule from '../../Components/Abstraction/AutoComplete';
import { useAutoComplete } from './../../Components/Abstraction/AutoComplete';
import {
   convertAccordingToProperty,
   getAutoCompleteOptions
} from './../../Utils/modify';

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

const initialValue = { name: '' };
const parent = [];
export default function ManageSubCategories() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const c = useSelector(s => s.category);
   const { cat } = c;
   const [parentcat, setParentcat] = useState([]);
   const { autoComVal, setAutoComVal } = useAutoComplete();

   const s = useSelector(s => s.subcategory);
   const { loading, error, subcat } = s;
   const ds = useSelector(s => s.deleteSubCat);
   const { deleted } = ds;

   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const [query, setQuery] = useState('');
   const onChangeQuery = ({ target: { value } }) => {
      setQuery(value);
   };

   const { inputState, onChangeHandler } = useInput(initialValue);

   useEffect(() => {
      dispatch(getSubCategories());
      if (!cat) dispatch(getCategories());
   }, []);

   useEffect(() => {
      if (cat) {
         const newObj_With_Property_AS_CATNAME = convertAccordingToProperty(
            cat,
            'cat_name'
         );
         const autoCompleteOptions = getAutoCompleteOptions(
            newObj_With_Property_AS_CATNAME
         );
         setParentcat(autoCompleteOptions);
         setAutoComVal(autoCompleteOptions[0]);
      }
   }, [cat]);

   useEffect(() => {
      if (loading) setopenLoader(true);
      else setopenLoader(false);

      if (error) {
         setopenSnackBar(true);
      }
      if (deleted) {
         setopenSnackBar(true);
         setTimeout(() => {
            dispatch(getSubCategories());
         }, 1000);
      }
   }, [loading, error, deleted]);

   const handleDelete = id => {
      dispatch(deleteSubCat(id));
   };

   const handleEdit = (id, name) => {
      history.push({
         pathname: `/admin/subcategories/${id}`,
         state: { nameInputValue: name }
      });
   };

   const submitHandler = async e => {
      e.preventDefault();

      //
      //* const found = cat.find(item => item.cat_name === autoComVal);
      //! const { cat_id } = found;
      // console.log(cat_id);
      dispatch(createSubCategory(autoComVal, inputState.name));
      // console.log(autoComVal);
      // console.log(inputState.name);
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
                     <AutoCompleteModule
                        label='Choose a Parent Category'
                        options={parentcat}
                        value={autoComVal}
                        setValue={setAutoComVal}
                     />
                  </Grid>
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
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           onClick={submitHandler}>
                           Submit
                        </Button>
                     </Grid>
                  </form>
                  <Grid item md={12} xs={12}>
                     <InputBase
                        id='filter'
                        name='filter'
                        placeholder='Filter Categories'
                        value={query}
                        onChange={onChangeQuery}
                     />
                  </Grid>
                  {subcat &&
                     subcat
                        .filter(el =>
                           el.sub_cat_name.toLowerCase().includes(query)
                        )
                        .map((item, index) => (
                           <Grid item md={3} xs={12}>
                              <Paper>
                                 <List>
                                    <ListItem>
                                       <ListItemText
                                          primary={item.sub_cat_name}
                                       />
                                       <ListItemSecondaryAction>
                                          <IconButton
                                             edge='end'
                                             aria-label='delete'
                                             onClick={e =>
                                                handleEdit(
                                                   item.sub_cat_id,
                                                   item.sub_cat_name
                                                )
                                             }>
                                             <EditIcon color='secondary' />
                                          </IconButton>
                                          <IconButton
                                             edge='end'
                                             aria-label='delete'
                                             onClick={e =>
                                                handleDelete(item.sub_cat_id)
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
