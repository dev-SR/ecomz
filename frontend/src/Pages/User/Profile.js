import React from 'react';
import { AdminNav } from '../../Components/Shared/AdminNav';
import Layout from '../../Components/Shared/Layout';

export default function AdminDashBoard() {
   return (
      <div>
         <Layout title='Admin' withNav={<AdminNav />}></Layout>
      </div>
   );
}
