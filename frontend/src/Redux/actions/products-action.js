import axios from 'axios';
import { logout } from './user-action';
export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAIL = 'PRODUCTS_FAIL';
export const PRODUCTS_RESET = 'PRODUCTS_RESET';

export const PRODUCTS_UPDATE_REQUEST = 'PRODUCTS_UPDATE_REQUEST';
export const PRODUCTS_UPDATE_SUCCESS = 'PRODUCTS_UPDATE_SUCCESS';
export const PRODUCTS_UPDATE_FAIL = 'PRODUCTS_UPDATE_FAIL';
export const PRODUCTS_UPDATE_RESET = 'PRODUCTS_UPDATE_RESET';

export const PRODUCTS_DELETE_REQUEST = 'PRODUCTS_DELETE_REQUEST';
export const PRODUCTS_DELETE_SUCCESS = 'PRODUCTS_DELETE_SUCCESS';
export const PRODUCTS_DELETE_FAIL = 'PRODUCTS_DELETE_FAIL';
export const PRODUCTS_DELETE_RESET = 'PRODUCTS_DELETE_RESET';

export const getProducts = (page, limit) => async (dispatch, getState) => {
   try {
      dispatch({
         type: PRODUCTS_DELETE_RESET
      });
      dispatch({
         type: PRODUCTS_UPDATE_RESET
      });
      dispatch({
         type: PRODUCTS_REQUEST
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

      const { data } = await axios.get(
         `/api/v1/products?page=${page}&limit=${limit}`,
         config
      );

      // console.log(data);
      dispatch({
         type: PRODUCTS_SUCCESS,
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
         type: PRODUCTS_FAIL,
         payload: message
      });
   }
};

export const createProducts = newBrands => async (dispatch, getState) => {
   try {
      dispatch({
         type: PRODUCTS_REQUEST
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
         `/api/v1/brands`,
         { newBrands },
         config
      );

      dispatch({
         type: PRODUCTS_SUCCESS,
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
         type: PRODUCTS_FAIL,
         payload: message
      });
   }
};

export const updateProducts = (id, editBrands) => async (
   dispatch,
   getState
) => {
   try {
      //clear previous states
      dispatch({
         type: PRODUCTS_UPDATE_RESET
      });

      dispatch({
         type: PRODUCTS_UPDATE_REQUEST
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
         `/api/v1/brands/${id}`,
         { editBrands },
         config
      );

      // console.log(data);
      dispatch({
         type: PRODUCTS_UPDATE_SUCCESS,
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
         type: PRODUCTS_UPDATE_FAIL,
         payload: message
      });
   }
};

export const deleteProducts = deleteId => async (dispatch, getState) => {
   try {
      //clear previous states
      dispatch({
         type: PRODUCTS_DELETE_RESET
      });

      dispatch({
         type: PRODUCTS_DELETE_REQUEST
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

      const { data } = await axios.delete(`/api/v1/brands/${deleteId}`, config);

      // console.log(data);
      dispatch({
         type: PRODUCTS_DELETE_SUCCESS,
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
         type: PRODUCTS_DELETE_FAIL,
         payload: message
      });
   }
};
