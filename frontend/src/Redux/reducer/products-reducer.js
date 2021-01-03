import {
   PRODUCTS_REQUEST,
   PRODUCTS_SUCCESS,
   PRODUCTS_FAIL,
   PRODUCTS_RESET,
   PRODUCTS_UPDATE_REQUEST,
   PRODUCTS_UPDATE_SUCCESS,
   PRODUCTS_UPDATE_FAIL,
   PRODUCTS_UPDATE_RESET,
   PRODUCTS_DELETE_FAIL,
   PRODUCTS_DELETE_REQUEST,
   PRODUCTS_DELETE_RESET,
   PRODUCTS_DELETE_SUCCESS
} from '../actions/products-action';

export const productsReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCTS_REQUEST:
         return { loading: true };
      case PRODUCTS_SUCCESS:
         return { loading: false, ...action.payload };
      case PRODUCTS_FAIL:
         return { loading: false, ...action.payload };
      case PRODUCTS_RESET:
         return {};
      default:
         return state;
   }
};

export const productsUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCTS_UPDATE_REQUEST:
         return { loading: true };
      case PRODUCTS_UPDATE_SUCCESS:
         return { loading: false, ...action.payload };
      case PRODUCTS_UPDATE_FAIL:
         return { loading: false, ...action.payload };
      case PRODUCTS_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};
export const productsDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCTS_DELETE_REQUEST:
         return { loading: true };
      case PRODUCTS_DELETE_SUCCESS:
         return { loading: false, ...action.payload };
      case PRODUCTS_DELETE_FAIL:
         return { loading: false, ...action.payload };
      case PRODUCTS_DELETE_RESET:
         return {};
      default:
         return state;
   }
};
