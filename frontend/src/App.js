import React from 'react';
import './App.scss';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import useToggleTheme from './Mui-theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotFound from './NotFound';
import Home from './Pages/Home';
import UserRoute from './Components/Reusable/UserRoute';
import AdminRoute from './Components/Reusable/AdminRoute';
import UserProfile from './Pages/User/Profile';
import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import ManageProducts from './Pages/Products/ManageProducts';
import ManageCategories from './Pages/Categories/ManageCategories';
import ManageSubCategories from './Pages/Categories/ManageSubCategories';
import UpdateCategory from './Pages/Categories/UpdateCategory';
import UpdateSubCategory from './Pages/Categories/UpdateSubCat';
import ManageBrands from './Pages/Brands/ManageBrands';
import UpdateBrands from './Pages/Brands/UpdateBrands';
import ManageShop from './Pages/Shops/ManageShop';
import ProductScreen from './Pages/Products/ProductScreen';

function App() {
   const [theme] = useToggleTheme();
   const themeConfig = createMuiTheme(theme);

   return (
      <MuiThemeProvider theme={themeConfig}>
         <CssBaseline />
         <Router>
            <Switch>
               <Route exact path='/' component={Home} />
               <Route exact path='/signin' component={Login} />
               <Route exact path='/register' component={Register} />
               <Route exact path='/shop/all' component={ManageShop} />
               <Route path='/product/:id' component={ProductScreen} />
               <UserRoute exact path='/profile' component={UserProfile} />
               <AdminRoute exact path='/admin' component={AdminDashBoard} />
               <AdminRoute
                  exact
                  path='/admin/products'
                  component={ManageProducts}
               />
               <AdminRoute
                  exact
                  path='/admin/categories'
                  component={ManageCategories}
               />
               <AdminRoute
                  exact
                  path='/admin/categories/:id'
                  component={UpdateCategory}
               />
               <AdminRoute
                  exact
                  path='/admin/subcategories'
                  component={ManageSubCategories}
               />
               <AdminRoute
                  exact
                  path='/admin/subcategories/:id'
                  component={UpdateSubCategory}
               />
               <AdminRoute
                  exact
                  path='/admin/brands'
                  component={ManageBrands}
               />
               <AdminRoute
                  exact
                  path='/admin/brands/:id'
                  component={UpdateBrands}
               />
               <Route component={NotFound} />
            </Switch>
         </Router>
      </MuiThemeProvider>
   );
}

export default App;
