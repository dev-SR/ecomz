import axios from 'axios';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export const USER_LOGOUT = 'USER_LOGOUT';

export const CAT_REQUEST = 'CAT_REQUEST';
export const CAT_SUCCESS = 'CAT_SUCCESS';
export const CAT_FAIL = 'CAT_FAIL';

export const CAT_UPDATE_REQUEST = 'CAT_UPDATE_REQUEST';
export const CAT_UPDATE_SUCCESS = 'CAT_UPDATE_SUCCESS';
export const CAT_UPDATE_FAIL = 'CAT_UPDATE_FAIL';
export const CAT_UPDATE_RESET = 'CAT_UPDATE_RESET';

export const CAT_DELETE_REQUEST = 'CAT_DELETE_REQUEST';
export const CAT_DELETE_SUCCESS = 'CAT_DELETE_SUCCESS';
export const CAT_DELETE_FAIL = 'CAT_DELETE_FAIL';
export const CAT_DELETE_RESET = 'CAT_DELETE_RESET';

export const login = (email, password) => async dispatch => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST
      });

      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const { data } = await axios.post(
         `/api/v1/auth/login`,
         { email: email, password: password },
         config
      );

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data //get custom error message
               ? error.response.data
               : error.message
      });
   }
};

export const logout = () => dispatch => {
   localStorage.removeItem('userInfo');
   localStorage.removeItem('allwords');
   localStorage.removeItem('shippingAddress');
   localStorage.removeItem('paymentMethod');
   dispatch({ type: USER_LOGOUT });
   document.location.href = '/signin';
};

export const register = (fname, lname, email, pass) => async dispatch => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST
      });

      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const { data } = await axios.post(
         `/api/v1/auth/register`,
         { firstname: fname, lastname: lname, email: email, password: pass },
         config
      );

      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data
      });

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
   } catch (error) {
      console.log(error.response.data);
      dispatch({
         type: USER_REGISTER_FAIL,
         payload:
            error.response && error.response.data //get custom error message
               ? error.response.data
               : error.message
      });
   }
};

export const getCategories = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: CAT_DELETE_RESET
      });
      dispatch({
         type: CAT_UPDATE_RESET
      });
      dispatch({
         type: CAT_REQUEST
      });

      const {
         user: { token }
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         }
      };

      const { data } = await axios.get(`/api/v1/category/parent`, config);

      // console.log(data);
      dispatch({
         type: CAT_SUCCESS,
         payload: data
      });

      // localStorage.setItem('categories', JSON.stringify(data));
   } catch (error) {
      const message =
         error.response && error.response.data
            ? error.response.data
            : error.message;
      if (
         message === 'Not authorized, token failed' ||
         message === 'Not authorized, you must be an admin'
      ) {
         dispatch(logout());
      }

      dispatch({
         type: CAT_FAIL,
         payload: message
      });
   }
};

export const createCategory = (name, image) => async (dispatch, getState) => {
   try {
      dispatch({
         type: CAT_REQUEST
      });

      const {
         user: { token }
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         }
      };

      const { data } = await axios.post(
         `/api/v1/category/parent`,
         { newCat: name, image },
         config
      );

      dispatch({
         type: CAT_SUCCESS,
         payload: data
      });

      // localStorage.setItem('categories', JSON.stringify(data));
   } catch (error) {
      const message =
         error.response && error.response.data
            ? error.response.data
            : error.message;
      if (
         message === 'Not authorized, token failed' ||
         message === 'Not authorized, you must be an admin'
      ) {
         dispatch(logout());
      }

      dispatch({
         type: CAT_FAIL,
         payload: message
      });
   }
};

export const updateCat = (id, editCat, editImage) => async (
   dispatch,
   getState
) => {
   try {
      //clear previous states
      dispatch({
         type: CAT_UPDATE_RESET
      });

      dispatch({
         type: CAT_UPDATE_REQUEST
      });

      const {
         user: { token }
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         }
      };

      const { data } = await axios.put(
         `/api/v1/category/parent/${id}`,
         { editCat, editImage },
         config
      );

      // console.log(data);
      dispatch({
         type: CAT_UPDATE_SUCCESS,
         payload: data
      });

      // localStorage.setItem('categories', JSON.stringify(data));
   } catch (error) {
      const message =
         error.response && error.response.data
            ? error.response.data
            : error.message;
      if (
         message === 'Not authorized, token failed' ||
         message === 'Not authorized, you must be an admin'
      ) {
         dispatch(logout());
      }
      dispatch({
         type: CAT_UPDATE_FAIL,
         payload: message
      });
   }
};

export const deleteCat = id => async (dispatch, getState) => {
   try {
      //clear previous states
      dispatch({
         type: CAT_DELETE_RESET
      });

      dispatch({
         type: CAT_DELETE_REQUEST
      });

      const {
         user: { token }
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         }
      };

      const { data } = await axios.delete(
         `/api/v1/category/parent`,
         { deleteId: id },
         config
      );

      // console.log(data);
      dispatch({
         type: CAT_DELETE_SUCCESS,
         payload: data
      });

      // localStorage.setItem('categories', JSON.stringify(data));
   } catch (error) {
      const message =
         error.response && error.response.data
            ? error.response.data
            : error.message;
      if (
         message === 'Not authorized, token failed' ||
         message === 'Not authorized, you must be an admin'
      ) {
         dispatch(logout());
      }
      dispatch({
         type: CAT_DELETE_FAIL,
         payload: message
      });
   }
};
// export const updateUserProfile = user => async (dispatch, getState) => {
//    try {
//       dispatch({
//          type: USER_UPDATE_PROFILE_REQUEST
//       });

//       const {
//          userLogin: { userInfo }
//       } = getState();

//       const config = {
//          headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.token}`
//          }
//       };

//       const { data } = await axios.put(`/api/users/profile`, user, config);

//       dispatch({
//          type: USER_UPDATE_PROFILE_SUCCESS,
//          payload: data
//       });
//       dispatch({
//          type: USER_LOGIN_SUCCESS,
//          payload: data
//       });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//    } catch (error) {
//       const message =
//          error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message;
//       if (message === 'Not authorized, token failed') {
//          dispatch(logout());
//       }
//       dispatch({
//          type: USER_UPDATE_PROFILE_FAIL,
//          payload: message
//       });
//    }
// };

// export const listUsers = () => async (dispatch, getState) => {
//    try {
//       dispatch({
//          type: USER_LIST_REQUEST
//       });

//       const {
//          userLogin: { userInfo }
//       } = getState();

//       const config = {
//          headers: {
//             Authorization: `Bearer ${userInfo.token}`
//          }
//       };

//       const { data } = await axios.get(`/api/users`, config);

//       dispatch({
//          type: USER_LIST_SUCCESS,
//          payload: data
//       });
//    } catch (error) {
//       const message =
//          error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message;
//       if (message === 'Not authorized, token failed') {
//          dispatch(logout());
//       }
//       dispatch({
//          type: USER_LIST_FAIL,
//          payload: message
//       });
//    }
// };

// export const deleteUser = id => async (dispatch, getState) => {
//    try {
//       dispatch({
//          type: USER_DELETE_REQUEST
//       });

//       const {
//          userLogin: { userInfo }
//       } = getState();

//       const config = {
//          headers: {
//             Authorization: `Bearer ${userInfo.token}`
//          }
//       };

//       await axios.delete(`/api/users/${id}`, config);

//       dispatch({ type: USER_DELETE_SUCCESS });
//    } catch (error) {
//       const message =
//          error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message;
//       if (message === 'Not authorized, token failed') {
//          dispatch(logout());
//       }
//       dispatch({
//          type: USER_DELETE_FAIL,
//          payload: message
//       });
//    }
// };

// export const updateUser = user => async (dispatch, getState) => {
//    try {
//       dispatch({
//          type: USER_UPDATE_REQUEST
//       });

//       const {
//          userLogin: { userInfo }
//       } = getState();

//       const config = {
//          headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.token}`
//          }
//       };

//       const { data } = await axios.put(`/api/users/${user._id}`, user, config);

//       dispatch({ type: USER_UPDATE_SUCCESS });

//       dispatch({ type: USER_DETAILS, payload: data });

//       dispatch({ type: USER_DETAILS_RESET });
//    } catch (error) {
//       const message =
//          error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message;
//       if (message === 'Not authorized, token failed') {
//          dispatch(logout());
//       }
//       dispatch({
//          type: USER_UPDATE_FAIL,
//          payload: message
//       });
//    }
// };
