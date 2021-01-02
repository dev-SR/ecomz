import {
   BRANDS_REQUEST,
   BRANDS_SUCCESS,
   BRANDS_FAIL,
   BRANDS_RESET,
   BRANDS_UPDATE_REQUEST,
   BRANDS_UPDATE_SUCCESS,
   BRANDS_UPDATE_FAIL,
   BRANDS_UPDATE_RESET,
   BRANDS_DELETE_FAIL,
   BRANDS_DELETE_REQUEST,
   BRANDS_DELETE_RESET,
   BRANDS_DELETE_SUCCESS
} from '../actions/brands-action';

export const brandsReducer = (state = {}, action) => {
   switch (action.type) {
      case BRANDS_REQUEST:
         return { loading: true };
      case BRANDS_SUCCESS:
         return { loading: false, ...action.payload };
      case BRANDS_FAIL:
         return { loading: false, ...action.payload };
      case BRANDS_RESET:
         return {};
      default:
         return state;
   }
};

export const brandsUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case BRANDS_UPDATE_REQUEST:
         return { loading: true };
      case BRANDS_UPDATE_SUCCESS:
         return { loading: false, ...action.payload };
      case BRANDS_UPDATE_FAIL:
         return { loading: false, ...action.payload };
      case BRANDS_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};
export const brandsDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case BRANDS_DELETE_REQUEST:
         return { loading: true };
      case BRANDS_DELETE_SUCCESS:
         return { loading: false, ...action.payload };
      case BRANDS_DELETE_FAIL:
         return { loading: false, ...action.payload };
      case BRANDS_DELETE_RESET:
         return {};
      default:
         return state;
   }
};
