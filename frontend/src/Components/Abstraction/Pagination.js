import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

export const usePagination = count => {
   /**
    *    offset = (page-1)*limit
    */
   // page ~ (offset/limit)+1
   // postsPerPage ~ limit
   const [page, setPage] = React.useState(1);
   const handleChange = (event, newpage) => {
      //   let offset = (newpage - 1) * postsPerPage;
      //   console.log(offset);
      setPage(newpage);
   };

   const MuiPagination = () => (
      <Pagination
         count={count ? count : 5}
         page={page}
         shape='rounded'
         onChange={handleChange}
         color='secondary'
      />
   );

   return {
      MuiPagination,
      page
   };
};
