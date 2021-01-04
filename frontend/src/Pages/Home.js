import React from 'react';
import Layout from '../Components/Shared/Layout';
import { Container, Item } from '../Components/Abstraction/Grid';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CategoryWise from '../Pages/Products/CategoryWise';
import TopSeller from '../Pages/Products/TopSeller';
import { PublicNav } from '../Components/Shared/PublicNav';
import { UserNav } from '../Components/Shared/UserNav';
import { AdminNav } from '../Components/Shared/AdminNav';

import { useSelector } from 'react-redux';

import {
   DrawerDataUser,
   DrawerDataAdmin,
   DrawerDataPublic
} from '../Components/Abstraction/Drawer';
const useStyle = makeStyles(theme => ({
   root: {
      margin: theme.spacing(2)
   },
   heading: {
      color: '#424242',
      marginBottom: '10px'
   }
}));

export default function Home() {
   const classes = useStyle();
   const user = useSelector(s => s.user);
   const { role, success } = user;
   return (
      <>
         <Layout
            title='Home'
            expandable={role === 'admin' && true}
            drawerData={
               success
                  ? role === 'user'
                     ? DrawerDataUser
                     : DrawerDataAdmin
                  : DrawerDataPublic
            }
            withNav={
               role ? (
                  role === 'user' ? (
                     <UserNav />
                  ) : (
                     <AdminNav />
                  )
               ) : (
                  <PublicNav />
               )
            }>
            <div className={classes.root}>
               <Container spacing={4}>
                  <Item xs={12} sm={7} md={8}>
                     <Paper
                        elevation={2}
                        style={{
                           backgroundColor: '#F5F5F5',
                           padding: '15px'
                        }}>
                        <Typography
                           variant='h6'
                           classes={{
                              root: classes.heading
                           }}>
                           Explore by category
                        </Typography>
                        <CategoryWise />
                     </Paper>
                  </Item>
                  <Item xs={12} sm={5} md={4}>
                     <Paper
                        elevation={2}
                        style={{
                           backgroundColor: '#F5F5F5',
                           padding: '15px'
                        }}>
                        <Typography
                           variant='h6'
                           classes={{
                              root: classes.heading
                           }}>
                           Explore by category
                        </Typography>
                        <CategoryWise />
                     </Paper>
                  </Item>
                  <Item xs={12} md={12}>
                     <Paper
                        elevation={2}
                        style={{
                           backgroundColor: '#F5F5F5',
                           padding: '15px'
                        }}>
                        <Typography
                           variant='h6'
                           classes={{
                              root: classes.heading
                           }}>
                           Top Seller
                        </Typography>
                        <TopSeller />
                     </Paper>
                  </Item>
               </Container>
            </div>
         </Layout>
      </>
   );
}
