import React, { useState } from 'react';
import {
   AppBar,
   Toolbar,
   IconButton,
   InputBase,
   Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WithTooltip from '../Abstraction/Tooltips';
const useStyles = makeStyles(theme => ({
   toolBarMArgin: {
      marginBottom: '5vh'
   },
   menuButton: {
      marginRight: theme.spacing(2)
   },
   title: {
      marginRight: 'auto'
   },
   inputroot: {
      background: '#e0e0e0',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#eeeeee',
      '&:hover': {
         backgroundColor: '#e0e0e0'
      },
      padding: '5px 10px 5px 10px'
   },
   muiInput: {
      padding: theme.spacing(0, 1),
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create('width'),
      width: '5rem',
      [theme.breakpoints.up('sm')]: {
         width: '10rem',
         '&:focus': {
            width: '14rem'
         }
      }
   },
   svgroot: { fill: 'gray' },
   button: {
      height: '10px',
      '& > *': {
         margin: theme.spacing(1)
      }
   },
   icons: {
      fill: '#212121',
      fontSize: 'large'
   }
}));

const TooltipComponent = ({ inputs }) => (
   <>
      <Grid container>
         <Grid item>
            <div>{inputs}</div>
         </Grid>
      </Grid>
   </>
);

const Nav = ({ handleDrawerOpen, children }) => {
   const classes = useStyles();
   const [results, setResults] = useState([]);
   const [query, setQuery] = useState('');
   const hasResults = Boolean(query) && results.length > 0;
   const onChange = ({ target: { value } }) => {
      setQuery(value);
   };

   return (
      <div>
         <AppBar position='static' color='default'>
            <Toolbar>
               <Grid container alignItems='center'>
                  <Grid item md={1} xs={1}>
                     <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        onClick={handleDrawerOpen}>
                        <MenuIcon />
                     </IconButton>
                  </Grid>
                  <Grid item md={6} xs={4}>
                     <Grid container justify='center'>
                        <Grid item>
                           <WithTooltip
                              open={hasResults}
                              component={
                                 hasResults && (
                                    <TooltipComponent inputs={query} />
                                 )
                              }>
                              <InputBase
                                 classes={{
                                    root: classes.inputroot,
                                    input: classes.muiInput
                                 }}
                                 startAdornment={
                                    <SearchIcon
                                       classes={{
                                          root: classes.svgroot
                                       }}
                                    />
                                 }
                                 placeholder='Search...'
                                 value={query}
                                 onChange={onChange}
                              />
                           </WithTooltip>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item md={5} xs={7}>
                     {children}
                  </Grid>
               </Grid>
               {/* <Button onClick={handleSignOut}> KHK</Button> */}
            </Toolbar>
         </AppBar>
         <div className={classes.toolBarMArgin} />
      </div>
   );
};

export default Nav;
