import {
   PRODUCTS_REQUEST,
   PRODUCTS_SUCCESS,
   PRODUCTS_FAIL,
   PRODUCT_REQUEST,
   PRODUCT_SUCCESS,
   PRODUCT_FAIL,
   PRODUCTS_RESET,
   TOP_PRODUCTS_FAIL,
   TOP_PRODUCTS_REQUEST,
   TOP_PRODUCTS_SUCCESS,
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

export const topproductsReducer = (state = {}, action) => {
   switch (action.type) {
      case TOP_PRODUCTS_REQUEST:
         return { loading: true };
      case TOP_PRODUCTS_SUCCESS:
         return { loading: false, ...action.payload };
      case TOP_PRODUCTS_FAIL:
         return { loading: false, ...action.payload };
      default:
         return state;
   }
};
export const productReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCT_REQUEST:
         return { loading: true };
      case PRODUCT_SUCCESS:
         return { loading: false, ...action.payload };
      case PRODUCT_FAIL:
         return { loading: false, ...action.payload };
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
