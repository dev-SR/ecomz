import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddCartIcon from '@material-ui/icons/AddShoppingCart';
import DisabledCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { getTopProducts } from '../../Redux/actions/products-action';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';
import { usePagination } from '../../Components/Abstraction/Pagination';

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      textAlign: 'left',
      background: 'white',
      padding: '0 8px'
   },
   container: {
      minWidth: '100%',
      paddingBottom: '14px'
   },
   gridList: {
      width: '100%',
      minHeight: 200,
      padding: '16px 0 10px'
   },
   title: {
      padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
         2
      )}px`,
      color: theme.palette.openTitle,
      width: '100%'
   },
   tile: {
      textAlign: 'center'
   },
   image: {
      height: '100%'
   },
   tileBar: {
      backgroundColor: 'rgba(0, 0, 0, 0.72)',
      textAlign: 'left'
   },
   tileTitle: {
      fontSize: '1.1em',
      marginBottom: '5px',
      color: 'rgb(189, 222, 219)',
      display: 'block'
   }
}));

export default function TopSeller() {
   const classes = useStyles();
   const p = useSelector(s => s.topproducts);
   const { products } = p;
   const dispatch = useDispatch();
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up('md'));
   const { page, MuiPagination } = usePagination(2);
   useEffect(() => {
      dispatch(getTopProducts(page, 5));
   }, [page]);
   return (
      <Grid container spacing={2} justify='center' alignItems='center'>
         <Grid item xs={12} md={12}>
            <div className={classes.root}>
               <div className={classes.container}>
                  <GridList
                     cellHeight={200}
                     className={classes.gridList}
                     cols={matches ? 5 : 2}>
                     {products &&
                        products.map((product, i) => (
                           <GridListTile key={i} className={classes.tile}>
                              <Link to={'/product/' + product.p_id}>
                                 <img
                                    className={classes.image}
                                    src={product.p_image}
                                    alt={product.name}
                                 />
                              </Link>
                              <GridListTileBar
                                 className={classes.tileBar}
                                 title={product.p_name}
                                 subtitle={<span>$ {product.p_price}</span>}
                                 actionIcon={
                                    <IconButton
                                       color='secondary'
                                       dense='dense'
                                       component={Link}
                                       to='/cart/'>
                                       {product.p_quantity < 1 ? (
                                          <DisabledCartIcon />
                                       ) : (
                                          <AddCartIcon />
                                       )}
                                    </IconButton>
                                 }
                              />
                           </GridListTile>
                        ))}
                  </GridList>
               </div>
            </div>
         </Grid>
         <Grid item xs={6} md={2}>
            <MuiPagination />
         </Grid>
      </Grid>
   );
}
