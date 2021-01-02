import React from 'react';
import { useSelector } from 'react-redux';
import { AdminNav } from '../../Components/Shared/AdminNav';
import { UserNav } from '../../Components/Shared/UserNav';
import { PublicNav } from '../../Components/Shared/PublicNav';
import {
   DrawerDataAdmin,
   DrawerDataUser,
   DrawerDataPublic
} from '../../Components/Abstraction/Drawer';

import Layout from '../../Components/Shared/Layout';
export default function ManageShop() {
   const user = useSelector(s => s.user);
   const { success, token, role } = user;

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
         }></Layout>
   );
}
