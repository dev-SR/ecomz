import React from 'react';
import { Badge, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { Link, useLocation } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
   activebutton: {
      // fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '',
      color: '#482880'
   },
   deactivebutton: {
      // fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '',

      color: '#212121'
   }
}));
export const PublicNav = () => {
   const { pathname } = useLocation();
   const classes = useStyles();
   return (
      <Grid container justify='flex-end' alignItems='center' spacing={2}>
         <Grid item>
            {pathname === '/' ? (
               <Link to='/'>
                  <HomeIcon fontSize='medium' style={{ fill: '#212121' }} />
               </Link>
            ) : (
               <Link to='/'>
                  <HomeOutlinedIcon
                     fontSize='medium'
                     style={{ fill: '#212121' }}
                  />
               </Link>
            )}
         </Grid>
         <Grid item>
            {pathname === '/cart' ? (
               <Link to='/cart'>
                  <Badge badgeContent={4} color='primary'>
                     <ShoppingCartIcon style={{ fill: '#212121' }} />
                  </Badge>
               </Link>
            ) : (
               <Link to='/cart'>
                  <Badge badgeContent={4} color='primary'>
                     <ShoppingCartOutlinedIcon style={{ fill: '#212121' }} />
                  </Badge>
               </Link>
            )}
         </Grid>
         <Grid item>
            {pathname === '/signin' || pathname === '/register' ? (
               <Button
                  component={Link}
                  to='/signin'
                  color='primary'
                  classes={{ root: classes.activebutton }}>
                  SignIn
               </Button>
            ) : (
               <Button
                  component={Link}
                  to='/signin'
                  classes={{ root: classes.deactivebutton }}>
                  SignIn
               </Button>
            )}
         </Grid>
      </Grid>
   );
};
