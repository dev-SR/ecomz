import axios from 'axios';
import { logout } from './user-action';
export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAIL = 'PRODUCTS_FAIL';
export const PRODUCTS_RESET = 'PRODUCTS_RESET';

export const TOP_PRODUCTS_REQUEST = 'TOP_PRODUCTS_REQUEST';
export const TOP_PRODUCTS_SUCCESS = 'TOP_PRODUCTS_SUCCESS';
export const TOP_PRODUCTS_FAIL = 'TOP_PRODUCTS_FAIL';

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_FAIL = 'PRODUCT_FAIL';

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

export const getTopProducts = (page, limit) => async (dispatch, getState) => {
   try {
      dispatch({
         type: TOP_PRODUCTS_REQUEST
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
         `/api/v1/products/top?page=${page}&limit=${limit}`,
         config
      );

      // console.log(data);
      dispatch({
         type: TOP_PRODUCTS_SUCCESS,
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
         type: TOP_PRODUCTS_FAIL,
         payload: message
      });
   }
};

export const getProduct = id => async (dispatch, getState) => {
   try {
      dispatch({
         type: PRODUCT_REQUEST
      });
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const { data } = await axios.get(`/api/v1/products/single/${id}`, config);

      // console.log(data);
      dispatch({
         type: PRODUCT_SUCCESS,
         payload: data
      });
   } catch (error) {
      const message =
         error.response && error.response.data
            ? error.response.data
            : error.message;
      dispatch({
         type: PRODUCT_FAIL,
         payload: message
      });
   }
};

export const createProducts = (page, limit, newProdutcs) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: PRODUCTS_REQUEST
      });

      const {
         user: { token, uid }
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         }
      };
      const p = {
         uid,
         ...newProdutcs
      };
      const { data } = await axios.post(
         `/api/v1/products?page=${page}&limit=${limit}`,
         p,
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
         `/api/v1/products/${id}`,
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

      const { data } = await axios.delete(
         `/api/v1/products/${deleteId}`,
         config
      );

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
