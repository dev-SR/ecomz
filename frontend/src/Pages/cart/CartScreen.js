import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdminNav } from '../../Components/Shared/AdminNav';
import { UserNav } from '../../Components/Shared/UserNav';
import { PublicNav } from '../../Components/Shared/PublicNav';
import Layout from '../../Components/Shared/Layout';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import {
   Avatar,
   Grid,
   List,
   ListItem,
   ListItemAvatar,
   ListItemSecondaryAction,
   ListItemText,
   Paper
} from '@material-ui/core';
import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slide } from '@material-ui/core';

import {
   DrawerDataAdmin,
   DrawerDataUser,
   DrawerDataPublic
} from '../../Components/Abstraction/Drawer';
import { addToCart } from '../../Redux/actions/cart-action';
const useStyles = makeStyles(theme => ({
   paper: {
      marginTop: theme.spacing(8),
      marginLeft: '3vw',
      width: '94vw',
      padding: theme.spacing(4)
   },
   checkout: {
      padding: theme.spacing(4)
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
export default function CartScreen() {
   const classes = useStyles();
   const user = useSelector(s => s.user);
   const { token, role } = user;
   const cart = useSelector(s => s.cart);
   const { cartItems } = cart;
   const { id } = useParams();
   const location = useLocation();
   const qty = location.search ? Number(location.search.split('=')[1]) : 1;
   const dispatch = useDispatch();

    
    
   useEffect(() => {
      if (id) dispatch(addToCart(id, qty));
      //   console.log(cartItems);
      //   window.localStorage.removeItem('cartItems');
   }, [dispatch, id, qty]);
   const history = useHistory();
   const checkoutHandler = () => {
      history.push('/signin?redirect=shipping');
   };
   return (
      <Layout
         title='Admin'
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
         <Slide direction='right' in={true}>
            <Paper className={classes.paper}>
               <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                     <List>
                        {cartItems &&
                           cartItems.map(item => (
                              <ListItem button>
                                 <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.image} />
                                 </ListItemAvatar>
                                 <ListItemText
                                    primary={item.name}
                                    secondary={
                                       <React.Fragment>
                                          <Grid container>
                                             <Grid item xs={6} md={6}>
                                                <Typography
                                                   variant='subtitle2'
                                                   gutterBottom>
                                                   Base Price: {item.price}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} md={6}>
                                                <Typography
                                                   variant='subtitle2'
                                                   gutterBottom>
                                                   Sub Total :
                                                   {item.qty * item.price}
                                                </Typography>
                                             </Grid>
                                          </Grid>
                                       </React.Fragment>
                                    }
                                 />
                                 <ListItemSecondaryAction>
                                    <FormControl
                                       color='secondary'
                                       className={classes.formControl}>
                                       <InputLabel>Qty</InputLabel>
                                       <Select
                                          label='How Many'
                                          name='qty'
                                          value={item.qty}
                                          onChange={e =>
                                             dispatch(
                                                addToCart(
                                                   item.product,
                                                   Number(e.target.value)
                                                )
                                             )
                                          }
                                          classes={{ select: classes.select }}>
                                          {item.countInStock &&
                                             [
                                                ...Array(
                                                   item.countInStock
                                                ).keys()
                                             ].map(q => (
                                                <MenuItem
                                                   key={q + 1}
                                                   value={q + 1}>
                                                   {q + 1}
                                                </MenuItem>
                                             ))}
                                       </Select>
                                    </FormControl>
                                 </ListItemSecondaryAction>
                              </ListItem>
                           ))}
                     </List>
                  </Grid>

                  <Grid item xs={12} md={4}>
                     <Paper className={classes.checkout}>
                        <Typography variant='h6' gutterBottom>
                           Total Item :{' '}
                           {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </Typography>
                        <Typography variant='h6' gutterBottom>
                           Total Price :{' '}
                           {cartItems.reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                           )}
                        </Typography>
                        <Button
                           variant='contained'
                           color='secondary'
                           disabled={cartItems.length === 0}
                           onClick={checkoutHandler}>
                           Proceed To Checkout
                        </Button>
                     </Paper>
                  </Grid>
               </Grid>
            </Paper>
         </Slide>
      </Layout>
   );
}
