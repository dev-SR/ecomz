import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdminNav } from '../../Components/Shared/AdminNav';
import { UserNav } from '../../Components/Shared/UserNav';
import { PublicNav } from '../../Components/Shared/PublicNav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
   DrawerDataAdmin,
   DrawerDataUser,
   DrawerDataPublic
} from '../../Components/Abstraction/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Slide, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Layout from '../../Components/Shared/Layout';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getProduct } from './../../Redux/actions/products-action';
import { Grid, Paper } from '@material-ui/core';

import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
   paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(4)
   },
   img: {
      padding: '10px',
      objectFit: 'contain',
      maxWidth: '100%',
      height: '70vh'
   },
   formControl: {
      margin: theme.spacing(1),
      width: 100,
      minHeight: 10
   },
   select: {
      minHeight: 10
   }
}));

export default function ProductScreen() {
   const classes = useStyles();
   const user = useSelector(s => s.user);
   const { token, role } = user;
   const p = useSelector(s => s.productDetails);
   const { product } = p;
   const [item, setItem] = useState([]);
   const dispatch = useDispatch();
   const history = useHistory();
   const { id } = useParams();
   useEffect(() => {
      dispatch(getProduct(id));
   }, []);

   useEffect(() => {
      if (product) setItem(product[0]);
   }, [product]);

   const [qty, setQty] = React.useState(1);

   const handleChange = event => {
      setQty(event.target.value);
   };
   const handleSubmit = () => {
      history.push(`/cart/${id}?qty=${qty}`);
   };
   // console.log(qty);
   const [rating, setRating] = React.useState(2);
   // console.log(rating);
   return (
      <Layout
         title='Product'
         drawerData={
            role && token
               ? role === 'admin'
                  ? DrawerDataAdmin
                  : DrawerDataUser
               : DrawerDataPublic
         }
         withNav={
            role && token ? (
               role === 'admin' ? (
                  <AdminNav />
               ) : (
                  <UserNav />
               )
            ) : (
               <PublicNav />
            )
         }>
         <div className={classes.paper}>
            <Slide direction='right' in={true}>
               <Grid container justify='center' spacing={2}>
                  <Grid item xs={12} md={6}>
                     {item && (
                        <img
                           className={classes.img}
                           src={item.p_image}
                           alt={item.p_image}
                        />
                     )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Grid
                        container
                        spacing={2}
                        justify='flex-end'
                        alignItems='center'>
                        <Grid item xs={12} md={12}>
                           <TableContainer component={Paper}>
                              <Table
                                 className={classes.table}
                                 aria-label='simple table'>
                                 <TableHead>
                                    <TableRow>
                                       <TableCell>Product Details</TableCell>
                                       <TableCell></TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {item && (
                                       <>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Name
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                {item.p_name}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Price
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                $ {item.p_price && item.p_price}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Category
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'
                                                component={Link}
                                                to={`/shop/cat/${item.p_cat_id}`}>
                                                {item.p_cat && item.p_cat}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Sub Category
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'
                                                component={Link}
                                                to={`/shop/cat/${item.p_subcat_id}`}>
                                                {item.p_subcat && item.p_subcat}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Brand
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'
                                                component={Link}
                                                to={`/shop/cat/${item.p_brand_id}`}>
                                                {item.p_brand && item.p_brand}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Color
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                {item.p_color && item.p_color}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Available
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                {item.p_quantity &&
                                                   item.p_quantity}
                                             </TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                Release Date
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'>
                                                {item.p_release &&
                                                   item.p_release.slice(0, 10)}
                                             </TableCell>
                                          </TableRow>
                                       </>
                                    )}
                                 </TableBody>
                              </Table>
                           </TableContainer>
                        </Grid>

                        <Grid item xs={4} md={3}>
                           <FormControl
                              color='secondary'
                              className={classes.formControl}>
                              <InputLabel>Qty</InputLabel>
                              <Select
                                 label='How Many'
                                 name='qty'
                                 value={qty}
                                 classes={{ select: classes.select }}
                                 onChange={handleChange}>
                                 {item.p_quantity &&
                                    [...Array(item.p_quantity).keys()].map(
                                       item => (
                                          <MenuItem
                                             key={item + 1}
                                             value={item + 1}>
                                             {item + 1}
                                          </MenuItem>
                                       )
                                    )}
                              </Select>
                           </FormControl>
                        </Grid>
                        <Grid item xs={4} md={3}>
                           <Button
                              variant='contained'
                              color='secondary'
                              onClick={handleSubmit}>
                              Add To Cart
                           </Button>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                     <Grid container>
                        <Grid item xs={12} md={12}>
                           <Box
                              component='fieldset'
                              mb={3}
                              borderColor='transparent'>
                              <Typography component='legend'>
                                 Rate This Product
                              </Typography>
                              <Rating
                                 name='customized-empty'
                                 value={rating}
                                 onChange={(event, newValue) => {
                                    setRating(newValue);
                                 }}
                                 precision={0.5}
                                 emptyIcon={
                                    <StarBorderIcon fontSize='inherit' />
                                 }
                              />
                           </Box>
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </Slide>
         </div>
      </Layout>
   );
}
