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
               <Route component={NotFound} />
            </Switch>
         </Router>
      </MuiThemeProvider>
   );
}

export default App;
