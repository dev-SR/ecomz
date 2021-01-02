import axios from 'axios';
import { logout } from './user-action';
export const BRANDS_REQUEST = 'BRANDS_REQUEST';
export const BRANDS_SUCCESS = 'BRANDS_SUCCESS';
export const BRANDS_FAIL = 'BRANDS_FAIL';
export const BRANDS_RESET = 'BRANDS_RESET';

export const BRANDS_UPDATE_REQUEST = 'BRANDS_UPDATE_REQUEST';
export const BRANDS_UPDATE_SUCCESS = 'BRANDS_UPDATE_SUCCESS';
export const BRANDS_UPDATE_FAIL = 'BRANDS_UPDATE_FAIL';
export const BRANDS_UPDATE_RESET = 'BRANDS_UPDATE_RESET';

export const BRANDS_DELETE_REQUEST = 'BRANDS_DELETE_REQUEST';
export const BRANDS_DELETE_SUCCESS = 'BRANDS_DELETE_SUCCESS';
export const BRANDS_DELETE_FAIL = 'BRANDS_DELETE_FAIL';
export const BRANDS_DELETE_RESET = 'BRANDS_DELETE_RESET';

export const getBrands = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: BRANDS_DELETE_RESET
      });
      dispatch({
         type: BRANDS_UPDATE_RESET
      });
      dispatch({
         type: BRANDS_REQUEST
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

      const { data } = await axios.get(`/api/v1/brands`, config);

      // console.log(data);
      dispatch({
         type: BRANDS_SUCCESS,
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
         type: BRANDS_FAIL,
         payload: message
      });
   }
};

export const createBrands = newBrands => async (dispatch, getState) => {
   try {
      dispatch({
         type: BRANDS_REQUEST
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
         type: BRANDS_SUCCESS,
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
         type: BRANDS_FAIL,
         payload: message
      });
   }
};

export const updateBrands = (id, editBrands) => async (dispatch, getState) => {
   try {
      //clear previous states
      dispatch({
         type: BRANDS_UPDATE_RESET
      });

      dispatch({
         type: BRANDS_UPDATE_REQUEST
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
         type: BRANDS_UPDATE_SUCCESS,
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
         type: BRANDS_UPDATE_FAIL,
         payload: message
      });
   }
};

export const deleteBrands = deleteId => async (dispatch, getState) => {
   try {
      //clear previous states
      dispatch({
         type: BRANDS_DELETE_RESET
      });

      dispatch({
         type: BRANDS_DELETE_REQUEST
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
         type: BRANDS_DELETE_SUCCESS,
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
         type: BRANDS_DELETE_FAIL,
         payload: message
      });
   }
};
