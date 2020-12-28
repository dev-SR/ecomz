import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import _ from 'lodash';
const PrivateRoute = ({ component: Component, ...rest }) => {
   const user = useSelector(s => s.user);
   // console.log(user);
   // console.log(user && user.success);
   const { success, token, role } = user;
   return (
      <Route
         {...rest}
         render={props =>
            // _.isEmpty(user)
            success && token && role === 'user' ? (
               <Component {...rest} />
            ) : (
               <Redirect
                  to={{
                     pathname: '/signin',
                     state: { from: props.location }
                  }}
               />
            )
         }
      />
   );
};
export default PrivateRoute;
