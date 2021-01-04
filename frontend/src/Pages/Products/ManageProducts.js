import React, { useState, useEffect } from 'react';
import { DrawerDataAdmin } from '../../Components/Abstraction/Drawer';
import { AdminNav } from '../../Components/Shared/AdminNav';
import Layout from '../../Components/Shared/Layout';
import { Button, Grid, InputBase, Paper } from '@material-ui/core';
import Input, { useInput } from '../../Components/Abstraction/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar, { useSnackBar } from '../../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../../Components/Reusable/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import {
   getCategories,
   getSubCategories
} from '../../Redux/actions/category-action';
import AutoComplete from '../../Components/Abstraction/AutoComplete';
import {
   convertAccordingToProperty,
   getAutoCompleteOptions
} from '../../Utils/modify';
import useTable from '../../Components/Reusable/useTable';
import {
   createProducts,
   getProducts
} from '../../Redux/actions/products-action';
import { getBrands } from '../../Redux/actions/brands-action';

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
const headCells = [
   { id: 'name', label: 'name' },
   { id: 'p_price', label: 'price' },
   { id: 'p_sold', label: 'sold' },
   { id: 'p_quantity', label: 'quantity' },
   { id: 'p_brand', label: 'brand' },
   { id: 'p_cat', label: 'cat' },
   { id: 'p_subcat', label: 'subcat' },
   { id: 'p_release', label: 'release' },
   { id: 'edit', label: 'actions' }
   // { id: 'delete', label: 'delete' }
];

export default function ManageSubCategories() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();

   const c = useSelector(s => s.category);
   const { cat } = c;
   const [catOptions, setCatOptions] = useState([]);
   const [catSelected, setCatSelected] = useState([0]);
   const [catSelectionChange, setCatSelectionChange] = React.useState('');
   const sc = useSelector(s => s.subcategory);
   const { subcat } = sc;
   const [subcatOptions, setSubCatOptions] = useState([]);
   const [subcatSelected, setSubCatSelected] = useState([0]);
   const [subcatSelectionChange, setSubCatSelectionChange] = React.useState('');
   const b = useSelector(s => s.brands);
   const { brands } = b;
   const [brandsOptions, setbrandsOptions] = useState([]);
   const [brandsSelected, setbrandsSelected] = useState([0]);
   const [brandsSelectionChange, setbrandsSelectionChange] = React.useState('');

   const p = useSelector(s => s.productsList);
   const { loading, error, total, products } = p;

   useEffect(() => {
      if (!cat) dispatch(getCategories());
      if (!subcat) dispatch(getSubCategories());
      if (!brands) dispatch(getBrands());
   }, []);

   const { inputState, onChangeHandler, setInputState } = useInput(
      initialValue
   );
   useEffect(() => {
      if (cat) {
         const newObj_With_Property_AS_CATNAME = convertAccordingToProperty(
            cat,
            'cat_name'
         );
         const catSelectionArray = getAutoCompleteOptions(
            newObj_With_Property_AS_CATNAME
         );
         setCatOptions(catSelectionArray);
         setCatSelected(catSelectionArray[0]);
      }
      if (subcat) {
         const newObj_With_Property_AS_SUBCATNAME = convertAccordingToProperty(
            subcat,
            'sub_cat_name'
         );
         const subcatSelectionArray = getAutoCompleteOptions(
            newObj_With_Property_AS_SUBCATNAME
         );
         setSubCatOptions(subcatSelectionArray);
         setSubCatSelected(subcatSelectionArray[0]);
      }
      if (brands) {
         const newObj_With_Property_AS_BRANDSNAME = convertAccordingToProperty(
            brands,
            'brand_name'
         );
         const brandsSelectionArray = getAutoCompleteOptions(
            newObj_With_Property_AS_BRANDSNAME
         );
         setbrandsOptions(brandsSelectionArray);
         setbrandsSelected(brandsSelectionArray[0]);
      }
   }, [cat, subcat, brands]);

   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const [query, setQuery] = useState('');
   const onChangeQuery = ({ target: { value } }) => {
      setQuery(value);
   };
   const [filterFn, setFilterFn] = useState({
      fn: items => {
         return items;
      }
   });

   const [ProductFetch, setProductFetch] = useState([]);

   const { TblContainer, TblHead, TblPagination, page, rowsPerPage } = useTable(
      ProductFetch,
      headCells,
      products ? total : null,
      filterFn
   );
   useEffect(() => {
      dispatch(getProducts(Number(page + 1), rowsPerPage));
   }, [page, rowsPerPage]);

   useEffect(() => {
      setProductFetch(products);
      console.log(ProductFetch);
      console.log(page);
   }, [page, dispatch, products, ProductFetch]);
   useEffect(() => {
      if (loading) setopenLoader(true);
      else setopenLoader(false);

      if (error) {
         setopenSnackBar(true);
      }
   }, [loading, error]);

   const handleDelete = id => {};

   const handleEdit = (id, name) => {
      history.push({
         pathname: `/admin/product/${id}`,
         state: { nameInputValue: name }
      });
   };
   const handleClick = (id, name) => {
      history.push({
         pathname: `/admin/product/${id}`,
         state: { nameInputValue: name }
      });
   };
   const submitHandler = async e => {
      e.preventDefault();
      const CatFound = cat.find(item => item.cat_name === catSelected);
      const { cat_id } = CatFound;
      // console.log(cat_id);
      const SubCatFound = subcat.find(
         item => item.sub_cat_name === subcatSelected
      );
      const { sub_cat_id } = SubCatFound;
      // console.log(sub_cat_id);
      const BrandsFound = brands.find(
         item => item.brand_name === brandsSelected
      );
      const { brand_id } = BrandsFound;
      // console.log(brand_id);
      const {
         Name,
         Description,
         Image,
         Release_date,
         Color,
         Price,
         Quantity,
         Discount,
         Sold
      } = inputState;
      const p = Number(Price);
      const q = Number(Quantity);
      const d = Number(Discount);
      const s = Number(Sold);

      const product = {
         p_name: Name,
         p_description: Description,
         p_image: Image,
         p_price: p,
         p_sold: s,
         p_quantity: q,
         p_release: Release_date,
         p_discount: d,
         p_color: Color,
         p_brand: brand_id,
         p_cat: cat_id,
         p_subcat: sub_cat_id
      };
      dispatch(createProducts(Number(page + 1), rowsPerPage, product));
      setInputState(initialValue);
   };

   return (
      <div>
         <Layout
            expandable={true}
            drawerData={DrawerDataAdmin}
            title='Manage Products'
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
                              multiline={name === 'Description' ? true : null}
                              type={
                                 name === 'Price' ||
                                 name === 'Quantity' ||
                                 name === 'Discount' ||
                                 name === 'Sold'
                                    ? 'number'
                                    : null
                              }
                              placeholder={
                                 name === 'Release_date' ? 'yyyy-mm-dd' : null
                              }
                              onChange={onChangeHandler}
                           />
                        </Grid>
                     ))}
                     <Grid item md={3} xs={12}>
                        <AutoComplete
                           id='catp1'
                           label='Choose a Parent Category'
                           options={catOptions}
                           value={catSelected}
                           setValue={setCatSelected}
                           inputValue={catSelectionChange}
                           setInputValue={setCatSelectionChange}
                        />
                     </Grid>
                     <Grid item md={3} xs={12}>
                        <AutoComplete
                           id='catp2'
                           label='Choose a Sub Category'
                           options={subcatOptions}
                           value={subcatSelected}
                           setValue={setSubCatSelected}
                           inputValue={subcatSelectionChange}
                           setInputValue={setSubCatSelectionChange}
                        />
                     </Grid>
                     <Grid item md={3} xs={12}>
                        <AutoComplete
                           id='catp2'
                           label='Choose a Brand'
                           options={brandsOptions}
                           value={brandsSelected}
                           setValue={setbrandsSelected}
                           inputValue={brandsSelectionChange}
                           setInputValue={setbrandsSelectionChange}
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
            <Paper className={classes.paper}>
               <TblContainer>
                  <TblHead />
                  <TableBody>
                     {ProductFetch &&
                        ProductFetch.map((item, index) => (
                           <TableRow
                              key={index}
                              onClick={() => handleClick(item.p_id)}>
                              <TableCell>{`${item.p_name.slice(
                                 0,
                                 25
                              )}..`}</TableCell>
                              <TableCell>{item.p_price}</TableCell>
                              <TableCell>{item.p_sold}</TableCell>
                              <TableCell>{item.p_quantity}</TableCell>
                              <TableCell>{item.p_brand}</TableCell>{' '}
                              <TableCell>{item.p_cat}</TableCell>{' '}
                              <TableCell>{item.p_subcat}</TableCell>{' '}
                              <TableCell>{item.p_release}</TableCell>
                              <TableCell>
                                 <Button
                                    color='primary'
                                    onClick={() => handleEdit(item.p_id)}>
                                    <EditOutlinedIcon fontSize='small' />
                                 </Button>
                                 <Button
                                    color='secondary'
                                    onClick={() =>
                                       handleDelete(item.sub_cat_id)
                                    }>
                                    <CloseIcon fontSize='small' />
                                 </Button>
                              </TableCell>
                           </TableRow>
                        ))}
                  </TableBody>
               </TblContainer>
               <TblPagination />
            </Paper>
            <Snackbar
               severity='error'
               open={error ? openSnackBar : null}
               handleClose={handleSnackBarClose}
               msg={error ? error : 'Error Connecting'}
            />

            <Loader open={openLoader} handleClose={handleLoaderClose} />
         </Layout>
      </div>
   );
}
