import React, { useState } from 'react';
import {
   Avatar,
   Collapse,
   Divider,
   Drawer as MuiDrawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import CallSplitRoundedIcon from '@material-ui/icons/CallSplitRounded';
import CategoryIcon from '@material-ui/icons/Category';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
   drawer: {
      width: 280,
      marginTop: '10px'
   },
   subItem: { paddingLeft: theme.spacing(12) }
}));

export const useDrawer = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const handleDrawerOpen = () => {
      setOpenDrawer(true);
   };
   const handleDrawerClose = () => {
      setOpenDrawer(false);
   };
   return {
      openDrawer,
      handleDrawerClose,
      handleDrawerOpen
   };
};

export const DrawerDataAdmin = [
   {
      name: 'Manage Products',
      Icon: ViewListRoundedIcon,
      children: [{ name: 'Products', to: '/admin/products' }]
   },
   {
      name: 'Manage Categories',
      Icon: CategoryIcon,
      expanded: false,
      children: [
         { name: 'Categories', to: '/admin/categories' },
         { name: 'Sub Categories', to: '/admin/subcategories' },
         { name: 'Brands', to: '/admin/brands' }
      ]
   },
   {
      name: 'Manage Orders',
      Icon: CallSplitRoundedIcon,

      children: [{ name: 'Orders', to: '/admin/orders' }]
   },
   {
      name: 'Manage Users',
      Icon: SupervisorAccountIcon,
      children: [
         { name: 'User', to: '/admin/user' },
         { name: 'Admin', to: '/admin/ad' }
      ]
   }
];
export const DrawerDataUser = [
   {
      name: 'Check Orders',
      Icon: CallSplitRoundedIcon,
      to: '/user/orders'
   }
];

export const DrawerDataPublic = [
   {
      name: 'SIGN IN',
      Icon: PersonIcon,
      to: '/signin'
   },
   {
      name: 'SIGN UP',
      Icon: PersonIcon,
      to: '/register'
   }
];
const ExpandIcon = ({ expanded }) =>
   expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

const Drawer = ({
   open,
   handleDrawerClose,
   expandable = false,
   drawerData = null
}) => {
   const classes = useStyles();
   const [items, setItems] = useState(drawerData);
   const onClick = index => () => {
      const newItems = [...items];
      const item = items[index];
      newItems[index] = { ...item, expanded: !item.expanded };
      setItems(newItems);
   };

   if (expandable)
      return (
         <MuiDrawer open={open} onClose={handleDrawerClose}>
            <List disablePadding className={classes.drawer}>
               {items ? (
                  <List>
                     {items.map(({ Icon, ...item }, index) => (
                        <div key={index}>
                           <ListItem button onClick={onClick(index)}>
                              <ListItemIcon>
                                 <Icon />
                              </ListItemIcon>
                              <ListItemText primary={item.name} />
                              <ExpandIcon expanded={item.expanded} />
                           </ListItem>
                           <Collapse in={item.expanded}>
                              {item.children &&
                                 item.children.map(child => (
                                    <ListItem
                                       className={classes.subItem}
                                       key={child.name}
                                       component={Link}
                                       to={child.to}
                                       button
                                       dense>
                                       {/* <ListItemIcon>
                                    <child.Icon />
                                 </ListItemIcon> */}
                                       <ListItemText primary={child.name} />
                                    </ListItem>
                                 ))}
                           </Collapse>
                        </div>
                     ))}
                  </List>
               ) : (
                  ''
               )}
            </List>
         </MuiDrawer>
      );
   else {
      return (
         <MuiDrawer open={open} onClose={handleDrawerClose}>
            <List
               disablePadding
               className={classes.drawer}
               onClick={handleDrawerClose}>
               {drawerData ? (
                  <List>
                     {drawerData.map(({ Icon, ...item }, index) => (
                        <>
                           <ListItem button component={Link} to={item.to}>
                              <ListItemIcon>
                                 <Avatar>
                                    <Icon />
                                 </Avatar>
                              </ListItemIcon>
                              <ListItemText primary={item.name} />
                           </ListItem>
                           <Divider />
                        </>
                     ))}
                  </List>
               ) : (
                  ''
               )}
            </List>
         </MuiDrawer>
      );
   }
};

export default Drawer;
