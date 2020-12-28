import {
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   CAT_REQUEST,
   CAT_SUCCESS,
   CAT_FAIL
} from '../actions/user-action';

export const userReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return { loading: true };
      case USER_LOGIN_SUCCESS:
         return { loading: false, ...action.payload };
      case USER_REGISTER_SUCCESS:
         return { loading: false, ...action.payload };
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_FAIL:
         return { loading: false, ...action.payload };
      case USER_LOGIN_FAIL:
         return { loading: false, ...action.payload };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

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