import axios from 'axios';
import { logout } from './user-action';
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

export const SUB_CAT_REQUEST = 'SUB_CAT_REQUEST';
export const SUB_CAT_SUCCESS = 'SUB_CAT_SUCCESS';
export const SUB_CAT_FAIL = 'SUB_CAT_FAIL';

export const SUB_CAT_UPDATE_REQUEST = 'SUB_CAT_UPDATE_REQUEST';
export const SUB_CAT_UPDATE_SUCCESS = 'SUB_CAT_UPDATE_SUCCESS';
export const SUB_CAT_UPDATE_FAIL = 'SUB_CAT_UPDATE_FAIL';
export const SUB_CAT_UPDATE_RESET = 'SUB_CAT_UPDATE_RESET';

export const SUB_CAT_DELETE_REQUEST = 'SUB_CAT_DELETE_REQUEST';
export const SUB_CAT_DELETE_SUCCESS = 'SUB_CAT_DELETE_SUCCESS';
export const SUB_CAT_DELETE_FAIL = 'SUB_CAT_DELETE_FAIL';
export const SUB_CAT_DELETE_RESET = 'SUB_CAT_DELETE_RESET';

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

export const deleteCat = deleteId => async (dispatch, getState) => {
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
         `/api/v1/category/parent/${deleteId}`,
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

export const getSubCategories = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUB_CAT_DELETE_RESET
      });
      dispatch({
         type: SUB_CAT_UPDATE_RESET
      });
      dispatch({
         type: SUB_CAT_REQUEST
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

      const { data } = await axios.get(`/api/v1/category/sub`, config);

      // console.log(data);
      dispatch({
         type: SUB_CAT_SUCCESS,
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
         type: SUB_CAT_FAIL,
         payload: message
      });
   }
};

export const createSubCategory = (parentName, newSubCat) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: SUB_CAT_REQUEST
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
         `/api/v1/category/sub`,
         { parentName, newSubCat },
         config
      );

      dispatch({
         type: SUB_CAT_SUCCESS,
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
         type: SUB_CAT_FAIL,
         payload: message
      });
   }
};
export const deleteSubCat = deleteId => async (dispatch, getState) => {
   try {
      //clear previous states
      dispatch({
         type: SUB_CAT_DELETE_RESET
      });

      dispatch({
         type: SUB_CAT_DELETE_REQUEST
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
         `/api/v1/category/sub/${deleteId}`,
         config
      );

      // console.log(data);
      dispatch({
         type: SUB_CAT_DELETE_SUCCESS,
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
         type: SUB_CAT_DELETE_FAIL,
         payload: message
      });
   }
};
export const updateSubCat = (id, editSubCat) => async (dispatch, getState) => {
   try {
      //clear previous states
      dispatch({
         type: SUB_CAT_UPDATE_RESET
      });

      dispatch({
         type: SUB_CAT_UPDATE_REQUEST
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
         `/api/v1/category/sub/${id}`,
         { editSubCat },
         config
      );

      // console.log(data);
      dispatch({
         type: SUB_CAT_UPDATE_SUCCESS,
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
         type: SUB_CAT_UPDATE_FAIL,
         payload: message
      });
   }
};
