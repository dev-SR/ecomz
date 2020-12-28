import React from 'react';
import SEO from './SEO';
import Drawer, { useDrawer } from '../Abstraction/Drawer';
import Nav from './Nav';

export default function Layout({
   title,
   withNav,
   expandable,
   drawerData = null,
   children
}) {
   const { openDrawer, handleDrawerOpen, handleDrawerClose } = useDrawer();
   return (
      <div>
         <SEO title={title} />
         <Drawer
            open={openDrawer}
            expandable={expandable}
            handleDrawerClose={handleDrawerClose}
            drawerData={drawerData}
         />
         <Nav handleDrawerOpen={handleDrawerOpen}>{withNav}</Nav>
         {children}
      </div>
   );
}
