import {
   CAT_REQUEST,
   CAT_SUCCESS,
   CAT_FAIL,
   CAT_UPDATE_REQUEST,
   CAT_UPDATE_SUCCESS,
   CAT_UPDATE_FAIL,
   CAT_UPDATE_RESET,
   CAT_DELETE_FAIL,
   CAT_DELETE_REQUEST,
   CAT_DELETE_RESET,
   CAT_DELETE_SUCCESS,
   SUB_CAT_REQUEST,
   SUB_CAT_SUCCESS,
   SUB_CAT_FAIL,
   SUB_CAT_UPDATE_REQUEST,
   SUB_CAT_UPDATE_SUCCESS,
   SUB_CAT_UPDATE_FAIL,
   SUB_CAT_UPDATE_RESET,
   SUB_CAT_DELETE_FAIL,
   SUB_CAT_DELETE_REQUEST,
   SUB_CAT_DELETE_RESET,
   SUB_CAT_DELETE_SUCCESS
} from '../actions/category-action';

export const categoryReducer = (state = {}, action) => {
   switch (action.type) {
      case CAT_REQUEST:
         return { loading: true };
      case CAT_SUCCESS:
         return { loading: false, ...action.payload };
      case CAT_FAIL:
         return { loading: false, ...action.payload };
      default:
         return state;
   }
};

export const categoryUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case CAT_UPDATE_REQUEST:
         return { loading: true };
      case CAT_UPDATE_SUCCESS:
         return { loading: false, ...action.payload };
      case CAT_UPDATE_FAIL:
         return { loading: false, ...action.payload };
      case CAT_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};
export const categoryDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case CAT_DELETE_REQUEST:
         return { loading: true };
      case CAT_DELETE_SUCCESS:
         return { loading: false, ...action.payload };
      case CAT_DELETE_FAIL:
         return { loading: false, ...action.payload };
      case CAT_DELETE_RESET:
         return {};
      default:
         return state;
   }
};
export const subcategoryReducer = (state = {}, action) => {
   switch (action.type) {
      case SUB_CAT_REQUEST:
         return { loading: true };
      case SUB_CAT_SUCCESS:
         return { loading: false, ...action.payload };
      case SUB_CAT_FAIL:
         return { loading: false, ...action.payload };
      default:
         return state;
   }
};

export const subcategoryUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case SUB_CAT_UPDATE_REQUEST:
         return { loading: true };
      case SUB_CAT_UPDATE_SUCCESS:
         return { loading: false, ...action.payload };
      case SUB_CAT_UPDATE_FAIL:
         return { loading: false, ...action.payload };
      case SUB_CAT_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};
export const subcategoryDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case SUB_CAT_DELETE_REQUEST:
         return { loading: true };
      case SUB_CAT_DELETE_SUCCESS:
         return { loading: false, ...action.payload };
      case SUB_CAT_DELETE_FAIL:
         return { loading: false, ...action.payload };
      case SUB_CAT_DELETE_RESET:
         return {};
      default:
         return state;
   }
};
