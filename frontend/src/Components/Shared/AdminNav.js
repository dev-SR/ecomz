import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/actions/user-action';
import { Menu } from '../Abstraction/Menu';

const useStyles = makeStyles(theme => ({
   button: {
      // fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '',
      color: '#212121'
   }
}));

const adminItems = [
   { name: 'ADMIN', to: '/admin' },
   { name: 'DASHBOARD', to: '/admin' },
   { name: 'ORDERS', to: '/admin/orders' }
];

export const AdminNav = () => {
   const { pathname } = useLocation();
   const dispatch = useDispatch();
   const handleSignOut = () => {
      dispatch(logout());
   };
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState(0);

   const onOpen = e => {
      setAnchorEl(e.currentTarget);
   };
   const onClose = () => {
      setAnchorEl(null);
   };

   const handleMenuItemClick = (e, i) => {
      setSelectedIndex(i);
   };
   const classes = useStyles();
   return (
      <Grid container justify='flex-end' alignItems='center' spacing={2}>
         <Grid item xs={2} md={2}>
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
         <Grid item xs={4} md={3}>
            <Button
               onClick={onOpen}
               classes={{ root: classes.button }}
               color={pathname === '/admin' ? 'primary' : ''}>
               Admin
               <ArrowDropDownIcon />
            </Button>
         </Grid>
         <Menu
            items={adminItems}
            onClose={onClose}
            anchorEl={anchorEl}
            handleMenuItemClick={handleMenuItemClick}
            selectedIndex={selectedIndex}
         />
         <Grid item xs={4} md={3}>
            <Button onClick={handleSignOut} classes={{ root: classes.button }}>
               LOGOUT
            </Button>
         </Grid>
      </Grid>
   );
};
